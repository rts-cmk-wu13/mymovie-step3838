// API Configuration
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDY2OGM0ZGJkM2NmOTUxZmE5ZWEzMDhlNzA0MTJjYyIsIm5iZiI6MTc0MDk5MDM1MC4xMjIsInN1YiI6IjY3YzU2NzhlNmNhOTAzNWE2YTdhNzAzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gYWWaf3nQ4bSqOwtUVUEATUZIDWqXHGtaSsCk7PugNs";
const TRENDING_API_URL = "https://api.themoviedb.org/3/trending/movie/week";
const POPULAR_API_URL = "https://api.themoviedb.org/3/movie/popular";

/**
 * Fetches trending movies and calls displayMovies()
 */
async function fetchMovies() {
  try {
    const response = await fetch(TRENDING_API_URL, {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    displayMovies(data.results, "Now Showing");

    // Fetch and display popular movies
    fetchPopularMovies();
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
}

/**
 * Fetches popular movies and calls displayMovies()
 */
async function fetchPopularMovies() {
  try {
    const response = await fetch(POPULAR_API_URL, {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    displayMovies(data.results, "Popular");
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

/**
 * Displays movies on the page with a dynamic heading
 * @param {Array} movies - List of movies from API
 * @param {string} sectionTitle - Title for the movie section
 */
function displayMovies(movies, sectionTitle) {
  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movieContainer");

  // Create a heading for the section
  const heading = document.createElement("h2");
  heading.textContent = sectionTitle;

  // Create a wrapper for movie items
  const moviesWrapper = document.createElement("div");
  moviesWrapper.classList.add("moviesWrapper");

  // Special styling for 'Popular' section
  if (sectionTitle === "Popular") {
    moviesWrapper.style.display = "flex";
    moviesWrapper.style.flexDirection = "column"; // Stack movies vertically
    moviesWrapper.style.flexWrap = "wrap"; // Allow wrapping
    moviesWrapper.style.alignContent = "flex-start"; // Align to the left
    moviesWrapper.style.gap = "20px"; // Add spacing between movies
  }

  movieContainer.append(heading, moviesWrapper);

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    // Apply special class for Popular movies
    if (sectionTitle === "Popular") {
      movieElement.classList.add("popular-movie");
    }

    const adjustedRating = movie.vote_average.toFixed(1);
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <h2 class="movie-title">${movie.title}</h2>
        <h2 class="movie-rating"><span><i class="fa-solid fa-star"></i>${adjustedRating} / 10 IMDb</span></h2>
      </div>
    `;

    movieElement.addEventListener("click", () => {
      window.location.href = `details.html?id=${movie.id}`;
    });

    moviesWrapper.appendChild(movieElement);
  });

  document.body.appendChild(movieContainer);
}

/**
 * Creates a header with a title, burger menu, and dark mode toggle
 */
function createHeader() {
  const header = document.createElement("header");
  header.classList.add("movie_header");

  header.innerHTML = `
    <button class="burger"><i class="fa-solid fa-bars-staggered"></i></button>
    <h1>MyMovies</h1>
    <label class="switch">
      <input type="checkbox" id="darkModeToggle">
      <span class="slider round"></span>
    </label>
  `;

  document.body.prepend(header);

  document.getElementById("darkModeToggle").addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });
}

// Initialize functions
createHeader();
fetchMovies();
