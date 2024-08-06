
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '8obA_AxSt1vPF3zO-YMt3WTkQ1htzmP08Ks2y5We9OM';  
    const occasionSelect = document.getElementById('occasion-select');
    const imageContainer = document.getElementById('image-container');

    const fallbackQueries = {
        'birthday' : 'bouquet of colorful flowers',
        'anniversary': 'flowershop bouquet',
        'ceramic': 'vase of flowers'
    };

    occasionSelect.addEventListener('change', async (event) => {
        const occasion = event.target.value;
        let query = `${occasion} bouquet`;

        if (fallbackQueries[occasion]) {
            query = fallbackQueries[occasion];
        }

        if (occasion) {
            try {
                const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${apiKey}`);
                const data = await response.json();
                displayImages(data.results);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        } else {
            imageContainer.innerHTML = '';
        }
    });

    function displayImages(images) {
        imageContainer.innerHTML = ''; 
        if (images.length === 0) {
            imageContainer.innerHTML = '<p>No images found.</p>';
            return;
        }
        images.forEach(image => {
            const card = document.createElement('div');
            card.className = 'card';

            const imgElement = document.createElement('img');
            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description || 'Flower bouquet image';
          
            imageContainer.appendChild(card);
            card.appendChild(imgElement);
        });
    }
    
});




  