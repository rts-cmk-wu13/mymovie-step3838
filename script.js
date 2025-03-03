fetch("https://api.themoviedb.org/3/trending/movie/week"), {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer //indsæt din token her...'
    } }
  // Det henter alle film som trender i denne uge.

  let header = document.createElement("header");
  header.classList.add("movie_header")

  header.innerHTML = `
  //burger menu
  <h1>MyMovies</h1>
  
  <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>
  `

document.body.prepend(header);

let divElm = document.createElement("div")

/* ---------- */

/* let dataArray = [];

fetch('https://api.example.com/data') // Replace with your API URL
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    dataArray = data; // Store API data in the array
    console.log(dataArray); // Log the array to see the data
  })
  .catch(error => console.error('Error fetching data:', error)); */