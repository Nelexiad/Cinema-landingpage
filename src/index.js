const listFilm = document.getElementById("film-list");
const filmDetails = document.getElementById("film-details");

let result = [];
let filmNames = {};

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

      const itemHTML = `<div id="current-film${i}" class="flex pt-24 relative" >
        <div class="pl-5">
          <img class="" src="https://image.tmdb.org/t/p/w185/${current.poster_path}"/>
        </div>
        <div class="flex flex-col justify-center items-start gap-y-14 font-bold pl-5">
          <div>${current.original_title}</div>
          <div class="flex pl-5" id="trama:${current.original_title}"       onclick="showDetails('${current.original_title}')">Trama</div>
          <div class="hidden max-w-md h-20 border-2 border-red-800 overflow-y-scroll absolute bottom-6 right-64" id="details:${current.original_title}">${current.overview}</div>
        </div>
        
      </div>`;

      listFilm.insertAdjacentHTML("beforeend", itemHTML);
      filmNames[current.original_title] = {
        overview: current.overview,
        poster_path: current.poster_path,
        // Aggiungi altre proprietà che ti servono
      };
    }
    localStorage.setItem("filmNames", JSON.stringify(filmNames));
  } catch (error) {
    console.log(error);
  }
};

apiMovies();
