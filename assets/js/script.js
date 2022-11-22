// Search/History Elements
const searchMovieEl = $("#search-movie");
const searchBtnEl = $("#search-button");
const clearBtnEl = $("#clear-history");
const historyEl = $("#history");

// Display Results Elements
const resultEl = $("#movie-results");

// Get search history from localStorage or empty array
var searchHistory = JSON.parse(localStorage.getItem("movies")) || [];

// Base query URL and API key
const baseURL = "http://www.omdbapi.com/?";
const apikey = "&apikey=d812fbca";

// Temp array for testing
var myMovies = [
  "Alien",
  "Back to the future",
  "Akira",
  "Castle in the sky",
  "Mandy",
];

function addMovies() {
  // Variables to hold movie information
  var movieTitle;

  // Make i = length of list of movies
  for (let i = 0; i < myMovies.length; i++) {
    // Format the title of the movie to replace white space '\s' with '+'
    const myMovie = myMovies[i].replace(/\s/g, "+");

    // Make query URL for current movie
    const query = `${baseURL}t=${myMovie}${apikey}`;

    console.log(query);

    fetch(query)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        movieTitle = data.Title;

        console.log(movieTitle);
      });



    // Make a div with class movie-item to hold the movie data
    const block = $("<div>")
      .addClass("movie-item col-md-2 bg-primary text-white m-2 rounded")
      .attr("id", `item${i}`);

    // Make an area of the movie-item for holding the title
    const movieTitleEl = $("<p>").addClass(
      "title col-2 col-md-1 text-center py-4"
    );

    // // Make an area of the time-block for holding the save button
    // const blockSave = $("<div>").addClass("btn saveBtn col-2 col-md-1");

    // // Make an icon for the save button
    // icon = $("<button>")
    //   .addClass("btn icon fas fa-save fa-lg")
    //   .attr("id", i)
    //   .attr("title", "Save");

    // Append child elements to parent container
    //$("#move-results").append(block.append(movieTitleEl));

    // Add listener to icon that will save the task when the icon is clicked
    //icon.on("click", saveTask);
  }
}

addMovies();
