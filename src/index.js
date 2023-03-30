const listFilm = document.getElementById("film-list");
const filmDetails = document.getElementById("film-details");
const navbar = document.getElementById("navbar").classList;

let result = [];
let filmNames = {};

const showDetails = (id, i) => {
  console.log("id:", id, "i:", i);
  const tramaButton = document.getElementById(`tramaButton:${id}`);

  const detailsDiv = document.getElementById(`details:${id}`);
  if (detailsDiv.classList.contains("hidden")) {
    detailsDiv.classList.remove("hidden");
    tramaButton.innerHTML = "Chiudi";
  } else {
    detailsDiv.classList.add("hidden");
    tramaButton.innerHTML = "Trama";
  }

  console.log(detailsDiv);
};
const hideDetail = (id) => {
  const detailsDiv = document.getElementById(`details:${id}`);
  if (!detailsDiv.classList.contains("hidden")) {
    detailsDiv.classList.add("hidden");
  }
};

const apiMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=0033ee975da6b7d14e983048ba63d1bd&language=it-IT&page=1&region=IT"
    );
    result = await response.json();
    console.log(result);

    for (let i = 0; i < 10; i++) {
      const current = result.results[i];

      const itemHTML = `
      
      <div id="current-film${i}" class="flex  w-5/6 relative border-4 border-red-500 rounded-md pt-2 pb-2 text-black" >
          <div class="pl-5">
              <img class="" src="https://image.tmdb.org/t/p/w185/${
                current.poster_path
              }"/>
          </div>
          <div class="flex flex-col justify-center  w-full  gap-10 font-bold pl-5">
           <div> <div class="font-extrabold text-2xl ">${
             current.original_title
           }</div>
            <div>data uscita: ${
              current.release_date
            }<div> in sala fino al: ${new Date(
        new Date(current.release_date).getTime() +
          (Math.floor(Math.random() * 12) + 7) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10)}
        <div>In sala: ${Math.floor(Math.random() * 12)}</div>
            </div>
          </div>
        </div>
            <div class="flex gap-10" id="trama:${
              current.original_title
            }"       ><p     onclick="showDetails('${
        current.original_title
      }','${i}')" class="border-4 border-yellow-800 p-2 rounded-lg max-h-12 bg-custom-yellow hover:bg-orange-300 hover:cursor-pointer" id="tramaButton:${
        current.original_title
      }" >Trama</p><div class="hidden  max-w-md  border-2 border-red-800 rounded-2xl bg-custom-yellow shadow-red-500 shadow-2xl   h-max text-black text-center" id="details:${
        current.original_title
      }">${current.overview}
            </div>
          </div>
        </div>
        
      </div>
    `;

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

window.addEventListener("scroll", function (event) {
  let top = window.scrollY;
  if (top > 350) {
    navbar.add("fixed");
    navbar.add("top-0");
  } else if (top < 350) {
    navbar.remove("fixed");
    navbar.remove("top-0");
  }
});
