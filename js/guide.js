document.addEventListener('DOMContentLoaded', showResults);

async function showResults() {
  const dropdown = document.getElementById('faq-dropdown');
  const cardsContainer = document.getElementById('image-container');

  const questions = await fetchQuestions();
  const filteredQuestions = questions.filter(q => [11, 12, 13, 14, 15, 18, 41, 43, 44, 46, 48, 49].includes(q.id));
  populateDropdown(dropdown, filteredQuestions);

  dropdown.addEventListener('change', () => {
    const selectedQuestionId = dropdown.value;
    const selectedQuestion = filteredQuestions.find(q => q.id == selectedQuestionId);
    
    cardsContainer.innerHTML = '';
    
    if (selectedQuestion) {
      const card = displayAnswers(cardsContainer, selectedQuestion);
      cardsContainer.appendChild(card);
    }
  });
}

async function fetchQuestions() {
  const response = await fetch('https://perenual.com/api/article-faq-list?key=__GUIDE__API_KEY__');
  const data = await response.json();
  return data.data; 
}

function populateDropdown(dropdown, questions) {
  dropdown.innerHTML = ''; 

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
  const card = document.createElement('div');
  card.className = 'cardNew';

  const img = document.createElement('img');
  img.src = question.default_image.medium_url;
  img.alt = 'question pictures';

  const name = document.createElement('h2');
  name.textContent = question.question;

  const answer = document.createElement('p'); 
  answer.textContent = question.answer;

  card.appendChild(name);
  card.appendChild(img);
  card.appendChild(answer);

  return card;
}