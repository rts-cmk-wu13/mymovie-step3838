// Fetch now-playing movies from the TMDb API
fetch("https://api.themoviedb.org/3/trending/movie/week", {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDY2OGM0ZGJkM2NmOTUxZmE5ZWEzMDhlNzA0MTJjYyIsIm5iZiI6MTc0MDk5MDM1MC4xMjIsInN1YiI6IjY3YzU2NzhlNmNhOTAzNWE2YTdhNzAzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gYWWaf3nQ4bSqOwtUVUEATUZIDWqXHGtaSsCk7PugNs'
  }
})
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    // Create a container for the movies
    let movieContainer = document.createElement("div");
    movieContainer.classList.add("movieContainer");

    // Create and add a heading
    let heading = document.createElement("h2");
    heading.textContent = "Now Showing";

    // Create and add a "See more" button
    let button = document.createElement("button");
    button.textContent = "See more";
    button.classList.add("seeMoreBtn");

    // Create a modal pop-up for extra content
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>See more content.</p>
    </div>
    `;
    document.body.appendChild(modal);

    // Show the modal when clicking "See more"
    button.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // Close the modal when clicking the close button
    modal.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close the modal when clicking outside of it
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // Create a wrapper for the movie list
    let moviesWrapper = document.createElement("div");
    moviesWrapper.classList.add("moviesWrapper");

    // Append heading, button, and wrapper to the main container
    movieContainer.appendChild(heading);
    movieContainer.appendChild(button);
    movieContainer.appendChild(moviesWrapper);

    // Loop through the movie data and display each movie
    data.results.forEach(movie => {
      let movieElement = document.createElement("div");
      movieElement.classList.add("movie");
    
      // Convert vote_average to be out of 10
      let adjustedRating = (movie.vote_average / 1).toFixed(1);
    
      movieElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h2 class="movie-title">${movie.title}</h2>
          <h2 class="movie-rating"><span><i class="fa-solid fa-star"></i>${adjustedRating} / 10 IMDb</span></h2>
      `;
    
      // Add click event to navigate to details.html with movie ID
      movieElement.addEventListener("click", () => {
        window.location.href = `details.html?id=${movie.id}`;
      });
    
      moviesWrapper.appendChild(movieElement);
    });

    // Add the movie container to the page
    document.body.appendChild(movieContainer);
  })
  .catch(error => console.error("Error fetching data:", error));

// Create a header with a title and a toggle switch
let header = document.createElement("header");
header.classList.add("movie_header");

header.innerHTML = `
  <button class="burger"><i class="fa-solid fa-bars-staggered"></i></button>
  <h1>MyMovies</h1>
  <label class="switch">
    <input type="checkbox" id="darkModeToggle">
    <span class="slider round"></span>
  </label>
`;

// Add the header to the top of the page
document.body.prepend(header);

// Dark mode toggle functionality
document.getElementById("darkModeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
});
