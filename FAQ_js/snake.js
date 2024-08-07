document.addEventListener('DOMContentLoaded', showResults);

async function showResults() {
  const dropdown = document.getElementById('snake-dropdown');
  const cardsContainer = document.getElementById('answer-container');

    const questions = await fetchQuestions();
    // Filter questions to only include IDs 11, 12, and 13
    const filteredQuestions = questions.filter(q => [42, 43, 44, 45,].includes(q.id));
    populateDropdown(dropdown, filteredQuestions);

    dropdown.addEventListener('change', () => {
      const selectedQuestionId = dropdown.value;
      const selectedQuestion = filteredQuestions.find(q => q.id == selectedQuestionId);
      
      if (selectedQuestion) {
        displayAnswers(cardsContainer, selectedQuestion);
      } else {
        cardsContainer.innerHTML = '';
      }
    });
}

async function fetchQuestions() {
  const response = await fetch('https://perenual.com/api/article-faq-list?key=sk-z8oU66b23c8bedcc56445');
  const data = await response.json();
  return data.data; // Return the array of questions
}

function populateDropdown(dropdown, questions) {
  dropdown.innerHTML = ''; // Clear any existing options

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a question...';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  dropdown.appendChild(defaultOption);

  
  questions.forEach((question) => {
    const option = document.createElement('option');
    option.value = question.id;
    option.textContent = question.question;
    dropdown.appendChild(option);
  });
}

function displayAnswers(container, question) {
  container.innerHTML = `
    <h2>${question.question}</h2>
    <p>${question.answer}</p>
    <img src="${question.default_image.medium_url}" alt="${question.question}">
  `;
}
