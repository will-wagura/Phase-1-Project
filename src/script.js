// Function to fetch restaurant reviews using Google Places API
async function fetchRestaurantReviews() {
  const apiKey = process.env.API_KEY;
  const location = "Nairobi, Kenya";
  const radius = 10000;
  const keyword = "restaurant";

  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching restaurant data: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Error fetching restaurant data: ${data.status}`);
    }

    const restaurants = data.results;

    // Clear previous reviews
    const carousel = document.querySelector(".carousel");
    carousel.innerHTML = "";

    // Iterate over each restaurant
    restaurants.forEach((restaurant) => {
      const name = restaurant.name;
      const rating = restaurant.rating;
      const reviews = restaurant.reviews || []; // Check if reviews are available

      // Create a review item
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review");
      reviewItem.innerHTML = `
                    <h3>${name}</h3>
                    <p>Rating: ${rating}</p>
                    <ul>
                        ${reviews
                          .map((review) => `<li>${review.text}</li>`)
                          .join("")}
                    </ul>
                `;

      // Append the review item to the carousel
      carousel.appendChild(reviewItem);
    });
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
  }
}

// Call the function to fetch and display restaurant reviews
fetchRestaurantReviews();
