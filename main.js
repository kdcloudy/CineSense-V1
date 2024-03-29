$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        console.log(searchText);
        e.preventDefault();
    });
});
    function getMovies(searchText){
        axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=ebce8643&s='+searchText)
          .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie)=> {
              output += `
                <div class="col-md-3 col-sm-6">
                  <div class="thumbnail">
                    <img src="${movie.Poster}" class="example hoverable">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                  </div>
                </div>
                
              `;
            });
            $('#movies').html(output);
        })
        .catch((err) => {
          console.log(err);
        });
    }

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
    }

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('https://www.omdbapi.com/?apikey=ebce8643&i='+movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}"  class="example hoverable">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title} (${movie.Year})</h2>
            <ul class="list-group">
            <p>${movie.Plot}</p>
              <p><strong>Directed by:</strong> ${movie.Director}</p>
              <p><strong>Written by:</strong> ${movie.Writer}</p>
              <p><strong>Cast:</strong> ${movie.Actors}</p>
              <p><strong>Runtime:</strong> ${movie.Runtime}</p>
              <p><strong>Rating:</strong> ${movie.Rated}</p>
              <p><strong>Genre:</strong> ${movie.Genre}</p>
              <p><strong>Release Date:</strong> ${movie.Released}</p>
              <p><strong>Studio:</strong> ${movie.Production}</p>
            
             
            </ul>

            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index2.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
           
      `;

      $('#moviebox').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
