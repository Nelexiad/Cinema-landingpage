const apiMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=0033ee975da6b7d14e983048ba63d1bd&language=it-IT&page=1&region=IT"
    );
    const result = await response.json();
    const listFilm = document.getElementById("film-list");

    for (let i = 0; i < 10; i++) {
      const current = result.results[i];
      console.log(current);

      const itemHTML = `<div class="flex ">
      <div>
         <img src="https://image.tmdb.org/t/p/w185/${current.poster_path}"/>
      </div>
      <div class="flex items-center font-bold">
          ${current.original_title}
      </div>
  </div>`;
      listFilm.insertAdjacentHTML("beforeend", itemHTML);
    }

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
apiMovies();
