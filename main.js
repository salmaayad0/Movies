/*
REJEX=>Regular Expression
/ab/ ...must contain ab
/[ab]/ .. must contain a or b
/[a-z]{5,}/ ...must contain any letter between a to z(small)
/[A-Z]/ ...must contain any letter between A to Z(capital)
/[a-zA-Z].. must contain any letter capital or small
/web [a-z]/.... web then any letter between a to z(small)
/[10-80]/ .. 1 or any number from 0 to 8 or 0
^ =>start with
$ =>end with
{}=> number of entered numbers or letters {3,6}=>range
/^[a-z]{3,6}$/... must start with (from 3 to 6) letters from a to z (small) and end here
... to write range of numbers between 10-80 =>  (10-79)|(80)
/([1-7][0-9])|(80)/

... to write range of numbers between 0-100 =>  (1-9)|(10-99)|(100)
/^([1-9])$|^([1-9][0-9])|^(100)$/

---img path=> https://developers.themoviedb.org/3/getting-started/images

*/

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
//getElementsByClassName returns an Array-like object
//عشان كدا كان لازم اعمل لووب عليهم عشان اقدر استخدمخم
 // https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class   
Array.from(navLink).forEach(function(navLink) {
        navLink.addEventListener('click',  getCateg);
        });

    //onclick

//       function get(e){
// console.log(e.getAttribute('filmCtegory'));
// onclick="get(this);" callllllllllll

//       }



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