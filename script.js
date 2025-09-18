const wrapper = document.getElementById("wrapper");
const URL = "https://api.themoviedb.org/3/movie";
const img = "https://image.tmdb.org/t/p/w500/";
const darkModeSwitch = document.getElementById("darkModeSwitch");
const body = document.body;

function fix_runtime(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
}

async function getDetails(id) {
  return fetch(`${URL}/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzg0NWUzYjBiODExZWNkYTkxNWY1ZTA4YjU3ZGZmMSIsIm5iZiI6MTc1ODA5MDE2Mi4xODUsInN1YiI6IjY4Y2E1M2IyNGFkNDE1ZTc5ZjY4MzNiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCyxQ3LgTaz1tbRPY52X6SMpoEFVUzqSTOSURpAYEyI`,
    },
  }).then((res) => res.json());
}

async function getNowPlaying() {
  return fetch(`${URL}/now_playing`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzg0NWUzYjBiODExZWNkYTkxNWY1ZTA4YjU3ZGZmMSIsIm5iZiI6MTc1ODA5MDE2Mi4xODUsInN1YiI6IjY4Y2E1M2IyNGFkNDE1ZTc5ZjY4MzNiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCyxQ3LgTaz1tbRPY52X6SMpoEFVUzqSTOSURpAYEyI`,
    },
  })
    .then((svar) => svar.json())
    .then((data) => {
      let first;

      first =
        /*html */
        `
        <section class="now-showing">
            <div class="button-header">
                <h2>Now Showing</h2>
                <button class="more">See more</button>
            </div>
            <div id="slider">${data.results
              .map((den) => {
                return /*html*/ `
               <div class="thumbscrew">
                <img class="movie-img" src=${img}${den.poster_path}>
                <div class="thumbnail">
                        <h3>${den.title}</h3>
                        <p>
                        <img class="svg" src="/img/star.svg">
                            ${den.vote_average.toFixed(
                              1
                            )}/10 <span class="imdb">IMDB</span>
                        </p>
                </div>
               </div>

               `;
              })
              .join("")}
            </div>
        </section>
    `;
      wrapper.insertAdjacentHTML("beforeend", first);
    });
}

getNowPlaying();

async function getPopular() {
  return fetch(`${URL}/popular`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzg0NWUzYjBiODExZWNkYTkxNWY1ZTA4YjU3ZGZmMSIsIm5iZiI6MTc1ODA5MDE2Mi4xODUsInN1YiI6IjY4Y2E1M2IyNGFkNDE1ZTc5ZjY4MzNiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCyxQ3LgTaz1tbRPY52X6SMpoEFVUzqSTOSURpAYEyI`,
    },
  })
    .then((svar) => svar.json())
    .then(async (data) => {
      const genres = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzg0NWUzYjBiODExZWNkYTkxNWY1ZTA4YjU3ZGZmMSIsIm5iZiI6MTc1ODA5MDE2Mi4xODUsInN1YiI6IjY4Y2E1M2IyNGFkNDE1ZTc5ZjY4MzNiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCyxQ3LgTaz1tbRPY52X6SMpoEFVUzqSTOSURpAYEyI`,
          },
        }
      ).then((res) => res.json());
      
        // FÅ ALLE DETAILS HER!
        for (let movie of data.results) {
            const details = await getDetails(movie.id);
            movie.runtime = fix_runtime(details.runtime);
            movie.genres = movie.genre_ids.map((id) => {
                return genres.genres.find((genre) => genre.id === id);
            });
            // tilføje flere keys fra details objektet
        }

      let second;

      second = /*html */ `
        <section class="popular">
            <div class="button-header">
                <h2>Popular</h2>
                <button class="more">See more</button>
            </div>
            <div class="popular-movie"> ${data.results
              .map((den) => {
                return /*html*/ `
                <div class="popular-container">
                    <figure><img class="popular-img" src="${img}/${
                  den.poster_path
                }"></figure>
                    <div class="popular-des">
                        <h3>${den.title}</h3>
                        <p>
                           <img class="svg" src="/img/star.svg">
                            ${den.vote_average.toFixed(
                              1
                            )}/10 <span class="imdb">IMDB</span> 
                        </p>
                        <div> 
                            <ul>
                                ${den.genres
                                  .map(
                                    (genre) => `<li><h4>${genre.name}</h4></li>`
                                  )
                                  .join("")}
                            </ul>
                        </div>
                        <p>
                            ${den.runtime}
                        </p>
                    </div>
                </div>
                `;
              })
              .join("")}
            
            </div>
        </section>
            `;
      wrapper.insertAdjacentHTML("beforeend", second);
    });
}

getPopular();

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  darkModeSwitch.checked = true;
} else {
  body.classList.add("light-mode");
}

darkModeSwitch.addEventListener("change", () => {
  if (darkModeSwitch.checked) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    return;
  }
  body.classList.remove("dark-mode");
  body.classList.add("light-mode");
  localStorage.setItem("theme", "light");
});
