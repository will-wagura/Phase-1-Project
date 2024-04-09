// Function to fetch restaurant reviews using Google Places API
async function fetchRestaurantReviews() {
    const apiKey = process.env.API_KEY;
    const location = 'Nairobi, Kenya'; // You can specify a specific location or coordinates
    const radius = 10000; // Radius in meters (adjust as needed)
    const keyword = 'restaurant'; // Keyword to search for restaurants

    // Construct the API endpoint
    const apiUrl = `http://localhost:8080/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;

    try {
        // Fetch restaurant data
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Check if the request was successful
        if (data.status === 'OK') {
            const restaurants = data.results;
            
            // Clear previous reviews
            const carousel = document.querySelector('.carousel');
            carousel.innerHTML = '';

            // Iterate over each restaurant
            restaurants.forEach(restaurant => {
                const name = restaurant.name;
                const rating = restaurant.rating;
                const reviews = restaurant.reviews || []; // Check if reviews are available

                // Create a review item
                const reviewItem = document.createElement('div');
                reviewItem.classList.add('review');
                reviewItem.innerHTML = `
                    <h3>${name}</h3>
                    <p>Rating: ${rating}</p>
                    <ul>
                        ${reviews.map(review => `<li>${review.text}</li>`).join('')}
                    </ul>
                `;

                // Append the review item to the carousel
                carousel.appendChild(reviewItem);
            });
        } else {
            console.error('Error fetching restaurant data:', data.status);
        }
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
    }
}

// Call the function to fetch and display restaurant reviews
fetchRestaurantReviews();
