let imgpath = "https://image.tmdb.org/t/p/w500";
var movieContainer = [];
let navLink=document.getElementsByClassName('category-link');
let category = "now_playing";
let searchInput=document.getElementById('searchInput');
async function getData(category) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?api_key=b7ed3ef8d2fddd67928ca17512db61f4`
  );
  let json = await response.json();
  movieContainer = json.results;
 
  displayMovies();
}
getData(category);

//function display movies
function displayMovies() {
    var container = ``;
    for (var i = 0; i < movieContainer.length; i++) {
      container += `
  <div class="col-md-3 film ">
  <div class="content  overflow-hidden mb-4">
  <div class="layer text-center p-2" >
  <h5>${movieContainer[i].original_title}</h5>
  <p class=" ">${movieContainer[i].overview}</p>
  <p class=" ">rate:${movieContainer[i].vote_average}</p>
  <h6 class=" ">${movieContainer[i].release_date}</h6>    
  </div>
      <img src="${imgpath + movieContainer[i].poster_path}" alt="" class="w-100" >
      
  </div>
  
  </div>
  `;
    }
    document.getElementById("dataContainer").innerHTML = container;
  }
//addEventListener
async function getTrendingMovies() {
    let response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=b7ed3ef8d2fddd67928ca17512db61f4`
    );
    let json = await response.json();
    movieContainer = json.results;
    console.log(movieContainer)
    displayMovies();
  }
document.getElementById('trendingLink').addEventListener('click',getTrendingMovies)
function getCateg(e){
category=e.target.getAttribute('filmCtegory')
    console.log(category);
    getData(category);
    
    }
  
Array.from(navLink).forEach(function(navLink) {
        navLink.addEventListener('click',  getCateg);
        });



async function getMovieDetails(id){

  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/?api_key=b7ed3ef8d2fddd67928ca17512db61f4`
  );
  let json = await response.json();
  movieContainer = json.results;
  console.log(movieContainer)
  displayMovies();
}

async function searchMovies(){
let text=searchInput.value;
if(text==""){
getData(category);

}
else{
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=b7ed3ef8d2fddd67928ca17512db61f4&language=en-US&query=${text}&page=1&include_adult=false`
  );
  let json = await response.json();
  console.log(json)
  movieContainer = json.results;
  console.log(movieContainer)
  displayMovies();
}

}