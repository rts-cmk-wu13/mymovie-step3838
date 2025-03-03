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

let  = document.createElement("div")

/* ---------- */