// Fetch now-playing movies from TMDb API
fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", {
  headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDY2OGM0ZGJkM2NmOTUxZmE5ZWEzMDhlNzA0MTJjYyIsIm5iZiI6MTc0MDk5MDM1MC4xMjIsInN1YiI6IjY3YzU2NzhlNmNhOTAzNWE2YTdhNzAzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gYWWaf3nQ4bSqOwtUVUEATUZIDWqXHGtaSsCk7PugNs"
  }
})
.then(response => response.json()) // Convert response to JSON
.then(data => {
  let movieContainer = document.createElement("div"); // Main container
  movieContainer.classList.add("movieContainer");

  let heading = document.createElement("h2"); // Section title
  heading.textContent = "Now Showing";
  
  let button = document.createElement("button"); // "See More" button
  button.textContent = "See more";
  button.classList.add("seeMoreBtn");

  let moviesWrapper = document.createElement("div"); // New wrapper for movies
  moviesWrapper.classList.add("moviesWrapper"); 

  movieContainer.appendChild(heading);
  movieContainer.appendChild(button);
  movieContainer.appendChild(moviesWrapper); // Append wrapper to container

  // Loop through movies and add them to moviesWrapper
  data.results.forEach(movie => {
      let movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h2>${movie.title}</h2>
      `;
      moviesWrapper.appendChild(movieElement); // Append to wrapper
  });

  document.body.appendChild(movieContainer);
})
.catch(error => console.error("Error fetching data:", error));

// Create header with title and toggle switch
let header = document.createElement("header");
header.classList.add("movie_header");

header.innerHTML = `
  <h1>MyMovies</h1>
  <label class="switch">
    <input type="checkbox">
    <span class="slider round"></span>
  </label>
`;

document.body.prepend(header); // Add header to top of page
