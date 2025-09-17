const URL = "https://api.themoviedb.org/3/movie"
const wrapper = document.getElementById("wrapper")
const darkModeSwtich = document.querySelector("#darkModeSwitch");
const img = "https://image.tmdb.org/t/p/w500/"

let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

async function ting() {
    return fetch(`${URL}/now_playing`, {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzg0NWUzYjBiODExZWNkYTkxNWY1ZTA4YjU3ZGZmMSIsIm5iZiI6MTc1ODA5MDE2Mi4xODUsInN1YiI6IjY4Y2E1M2IyNGFkNDE1ZTc5ZjY4MzNiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCyxQ3LgTaz1tbRPY52X6SMpoEFVUzqSTOSURpAYEyI`
        }
    })
        .then((svar) => svar.json())
        .then((data) => {

            let first

            first = /*html */
                `
        <section class="now-showing">
            <div class="overslideren">
                <h2>Now Showing</h2>
                <button>See more</button>
            </div>
            <div id="slider">${data.results.map((hjælp) => {
                    return /*html*/`
               <div class="thumbscrew">
                <img class="movie-img" src=${img}${hjælp.poster_path}>
                <div class="thumbnail">
                        <h3>${hjælp.title}</h3>
                        <p>
                        <img class="svg" src="/img/star.svg">
                            ${hjælp.vote_average.toFixed(1)}/10 <span class="imdb">IMDB</span>
                        </p>
                </div>
               </div>

               `
                }).join("")}</div>
        </section>
    `
            wrapper.insertAdjacentHTML("beforeend", first)
        })


}

ting()


if (isDarkMode)
    darkModeSwtich.checked = true


function test() {
    isDarkMode = !isDarkMode
    if (isDarkMode) {
        document.body.classList.remove("light-mode")
        document.body.classList.add("dark-mode")
        return;
    }
    document.body.classList.remove("dark-mode")
    document.body.classList.add("light-mode")
}