const listFilm = document.getElementById("film-list");
const filmDetails = document.getElementById("film-details");

let result = [];

const showDetails = (id) => {
  const detailsDiv = document.getElementById(`details:${id}`);
  detailsDiv.classList.toggle("hidden");
  console.log(detailsDiv);
};

const apiMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=0033ee975da6b7d14e983048ba63d1bd&language=it-IT&page=1&region=IT"
    );
    result = await response.json();

    for (let i = 0; i < 10; i++) {
      const current = result.results[i];

      const itemHTML = `<div id="current-film" class="flex pt-24" onclick="showDetails('${current.original_title}')">
        <div>
          <img src="https://image.tmdb.org/t/p/w185/${current.poster_path}"/>
        </div>
        <div class="flex items-center font-bold">
          ${current.original_title}
        </div>
      </div>`;
      const detailsHTML = `<div class="hidden" id="details:${current.original_title}" class="hidden">${current.overview}</div>`;

      listFilm.insertAdjacentHTML("beforeend", itemHTML);
      filmDetails.insertAdjacentHTML("beforeend", detailsHTML);
    }

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

apiMovies();
