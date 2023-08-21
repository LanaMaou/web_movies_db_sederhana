/* eslint-disable no-undef */
// ? Fetch

// * Refactoring

// !Ketika tombol search di klik
const searchButton = document.querySelector(".search-button");
// beritahu kepada javascript bahwa didalam function ini ada asynchronous menggunakan syntak "async"
searchButton.addEventListener("click", async function () {
    try {
        const inputKey = document.querySelector(".input-keyword");
        // "await" digunakan untuk memberitahu javascript bahwa ini adalah asynchronous jadi tunggu dulu atau buat dia seolah-olah synchronous, ini digunakan agar javascript menunggu function getMovies selesai dlu baru jalankan function updateUI 
        const movies = await getMovies(inputKey.value);
        updateUI(movies);
    } catch (err) {
        updateError(err);
    }
});

function getMovies(keyword) {
    return fetch("http://www.omdbapi.com/?apikey=e502dbda&s=" + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error("UnAuthorized");
            }
            return response.json();
        })
        .then(response => {
            if (response.Response === "False") {
                throw new Error(response.Error);
            }
            return response.Search;
        });
}

function updateUI(movies) {
    let cards = "";
    movies.forEach((m) => (cards += showCards(m)));
    const movieContainer = document.querySelector(".movie-container");
    movieContainer.innerHTML = cards;
}

function updateError(e) {
    const alertError = document.querySelector(".alert-error");
    const movieError = showError(e);
    alertError.innerHTML = movieError;
}



// !ketika tombol detail diklik
// ?Event binding
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("modal-detail-button")) {
        try {
            const imdbid = e.target.dataset.imdbid;
            const movieDetail = await getMovieDetail(imdbid);
            updateUIDetail(movieDetail);
        } catch (err) {
            updateError(err);
        }
    }
});

function getMovieDetail(imdbid) {
    return fetch("http://www.omdbapi.com/?apikey=e502dbda&i=" + imdbid)
        .then(response => {
            if (!response.ok) {
                throw new Error("UnAuthorized");
            }
            return response.json();
        })
        .then(m => {
            if (m.Response === "False") {
                throw new Error(m.Error);
            }
            return m;
        });
}

function updateUIDetail(m) {
    const movieDetail = showMovieDetails(m);
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = movieDetail;
}


function showCards(m) {
    return `<div class="col my-3">
                <div class="card h-100">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body d-flex flex-column justify-content-around">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <div class="custom-flex">
                            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" 
                            data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                        </div>
                    </div>
                </div>
            </div>`;
}

function showMovieDetails(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${m.Title} (${m.Year})</h4>
                            </li>
                            <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}

function showError(e) {
    return `<div class="row">
                <div class="col-8 m-auto">
                    <div class="alert alert-danger" role="alert">
                        <h6>${e}</h6>
                    </div>
                </div>
        </div>`
}
