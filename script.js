// API Configuration
const API_URL = "https://api.themoviedb.org/3/trending/movie/week";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDY2OGM0ZGJkM2NmOTUxZmE5ZWEzMDhlNzA0MTJjYyIsIm5iZiI6MTc0MDk5MDM1MC4xMjIsInN1YiI6IjY3YzU2NzhlNmNhOTAzNWE2YTdhNzAzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gYWWaf3nQ4bSqOwtUVUEATUZIDWqXHGtaSsCk7PugNs";

/**
 * Fetches trending movies from the TMDb API and calls displayMovies()
 */
async function fetchMovies() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    displayMovies(data.results); // Call function to display movies
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

/**
 * Displays movies on the page
 * @param {Array} movies - List of movies from API
 */
function displayMovies(movies) {
  // Create the main container for movies
  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movieContainer");

  // Create a heading
  const heading = document.createElement("h2");
  heading.textContent = "Now Showing";

  // Create a "See more" button
  const button = document.createElement("button");
  button.textContent = "See more";
  button.classList.add("seeMoreBtn");

  // Create a modal pop-up for additional content
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>See more content.</p>
    </div>
  `;
  document.body.appendChild(modal);

  // Show modal when clicking "See more"
  button.addEventListener("click", () => (modal.style.display = "block"));

  // Close modal when clicking the close button
  modal.querySelector(".close").addEventListener("click", () => (modal.style.display = "none"));

  // Close modal when clicking outside of it
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Create a wrapper for movie items
  const moviesWrapper = document.createElement("div");
  moviesWrapper.classList.add("moviesWrapper");

  // Append heading, button, and wrapper to the main container
  movieContainer.append(heading, button, moviesWrapper);

  // Loop through the movies and create elements for each
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    // Convert vote_average to one decimal place
    const adjustedRating = movie.vote_average.toFixed(1);

    // Movie card structure
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h2 class="movie-title">${movie.title}</h2>
      <h2 class="movie-rating"><span><i class="fa-solid fa-star"></i>${adjustedRating} / 10 IMDb</span></h2>
    `;

    // Navigate to details page when clicking a movie
    movieElement.addEventListener("click", () => {
      window.location.href = `details.html?id=${movie.id}`;
    });

    // Add the movie element to the wrapper
    moviesWrapper.appendChild(movieElement);
  });

  // Add the movie container to the page
  document.body.appendChild(movieContainer);
}

/**
 * Creates a header with a title, burger menu, and dark mode toggle
 */
function createHeader() {
  const header = document.createElement("header");
  header.classList.add("movie_header");

  // Header structure
  header.innerHTML = `
    <button class="burger"><i class="fa-solid fa-bars-staggered"></i></button>
    <h1>MyMovies</h1>
    <label class="switch">
      <input type="checkbox" id="darkModeToggle">
      <span class="slider round"></span>
    </label>
  `;

  // Add header to the top of the page
  document.body.prepend(header);

  // Dark mode toggle functionality
  document.getElementById("darkModeToggle").addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });
}

// Initialize functions
createHeader(); // Create the page header
fetchMovies(); // Fetch and display movies
