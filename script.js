const URL = "https://api.themoviedb.org/3/movie"
const wrapper = document.getElementById("wrapper")

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
        <header class="header">
            <h1>MyMovies</h1>
            <label class="switch">
                <input type="checkbox" onclick=test()>
                <span class="slider round"></span>
            </label>
        </header>
    `
            wrapper.insertAdjacentHTML("beforeend", first)
        })


}

ting()

function test() {
    document.body.classList.toggle("dark-mode")
}