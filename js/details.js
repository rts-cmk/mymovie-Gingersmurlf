const wrapper = document.getElementById("wrapper");
const link = "https://api.themoviedb.org/3/movie";
const img = "https://image.tmdb.org/t/p/w500/";
const darkModeSwitch = document.getElementById("darkModeSwitch");
const body = document.body;
const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)


let id = Number.parseInt(params.get("id"))


async function getDetails() {
    return fetch(`https://api.themoviedb.org/3/movie/1038392`, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzg0NWUzYjBiODExZWNkYTkxNWY1ZTA4YjU3ZGZmMSIsIm5iZiI6MTc1ODA5MDE2Mi4xODUsInN1YiI6IjY4Y2E1M2IyNGFkNDE1ZTc5ZjY4MzNiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCyxQ3LgTaz1tbRPY52X6SMpoEFVUzqSTOSURpAYEyI`,
        },
    }).then((res) => res.json())
        .then((data) => {
            let first 
            
            first = /*html*/ `
                
        `
            body.insertAdjacentHTML("beforeend", first)
        })
}

getDetails()


