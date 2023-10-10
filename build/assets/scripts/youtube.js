let movieArray = [];
var movieList = document.getElementById("movieList");
var movieButton = document.getElementById("movieButton");
// rapidapi request

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a29c1b9a85msh88864d9b5289dfbp1a2b09jsnb041e8531c7d",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};
function movieApi() {
  const response = fetch(
    "https://moviesdatabase.p.rapidapi.com/titles/random?limit=15&list=most_pop_movies",
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < 15; i++) {
        movieArray.push(data.results[i].titleText.text);
        movieList.textContent = movieArray;
        console.log(movieArray[i]);
        // set movie array to display as an element text content someelement.textContent=movieArray
      }
    });
}

movieButton.addEventListener("click", () => {
  movieArray = [];
  movieApi();
});
