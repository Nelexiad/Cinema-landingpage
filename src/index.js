const navbar = document.getElementById("navbar");

const apiMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=0033ee975da6b7d14e983048ba63d1bd&language=it-IT&page=1&region=IT"
    );
    const result = await response.json();
    const listFilm = document.getElementById("film-list");
    const filmDetails = document.getElementById("film-details");

    for (let i = 0; i < 10; i++) {
      const current = result.results[i];
      console.log(current);

      const itemHTML = `<div class="flex pt-24">
      <div>
         <img src="https://image.tmdb.org/t/p/w185/${current.poster_path}"/>
      </div>
      <div class="flex items-center font-bold">
          ${current.original_title}
      </div>
  </div>`;
      const detailsHTML = listFilm.insertAdjacentHTML("beforeend", itemHTML);
    }

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
apiMovies();

// window.addEventListener(
//   "scroll",
//   function (event) {
//     let top = window.scrollY;
//     if (top == 300 || top == 350 || top == 400 || top == 500) {
//       navbar.add("sticky", "sticky-navbar");
//     } else if (top == 250 || top == 200 || top == 100 || top == 0) {
//       navbar.remove("sticky", "sticky-navbar");
//     }
//   },
//   false
// );
