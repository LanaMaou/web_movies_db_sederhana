/* eslint-disable no-undef */
// $('.search-button').click(function () {
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=e502dbda&s=' + $('.input-keyword').val(),
//         success: results => {
//             const movies = results.Search;
//             let cards = '';
//             movies.forEach(m => {
//                 cards += showCards(m);
//             });
//             $('.movie-container').html(cards);


//             // ketika tombol detail di-klik
//             $('.modal-detail-button').on('click', function () {
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=e502dbda&i=' + $(this).data('imdbid'),
//                     success: m => {
//                         const movieDetail = showMovieDetails(m);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 })
//             })
//         },
//         error: (e) => {
//             console.log(e.responseText);
//         }
//     });

// });


// ? Fetch
const searchBtn = document.querySelector('.search-button');
searchBtn.addEventListener('click', function () {
    const inputKey = document.querySelector('.input-keyword');
    fetch('http://www.omdbapi.com/?apikey=e502dbda&s=' + inputKey.value)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search;
            let cards = '';
            movies.forEach(m => cards += showCards(m));
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = cards;



            // Ketika button detail di klik
            const modalDetailButton = document.querySelectorAll('.modal-detail-button');
            modalDetailButton.forEach(btn => {
                btn.addEventListener('click', function () {
                    const imdbid = this.dataset.imdbid;
                    fetch('http://www.omdbapi.com/?apikey=e502dbda&i=' + imdbid)
                        .then(response => response.json())
                        .then(m => {
                            const movieDetail = showMovieDetails(m)
                            const modalBody = document.querySelector('.modal-body');
                            modalBody.innerHTML = movieDetail;
                        });

                })
            })

        });

});




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