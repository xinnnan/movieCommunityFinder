// Search/History Elements
const searchFormEl = $("#search-form");
const searchMovieEl = $("#search-movie");
const searchBtnEl = $("#search-button");
const clearBtnEl = $("#clear-history");
const historyEl = $("#history");
const msgEl = $("#msg");

// Display Results Elements
const resultEl = $("#movie-results");

// Button that links to Reddit/Movie details page
const redditBtnEl = $("reddit-details");

// Get search history from localStorage
// or empty array if localStorage is empty
var searchHistory = JSON.parse(localStorage.getItem("query")) || [];

// Base query URL and API key
const baseURL = "https://www.omdbapi.com/?";
const apikey = "&apikey=d812fbca";
// const apikey = "&apikey=f05a1fc8";

$(function() {

  function addMovies(query) {
    // Generate query URL for current movie
    const queryURL = `${baseURL}t=${query}${apikey}`;
  
    fetch(queryURL)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (data) {
        if (data.Error) {
          console.log("No results found!");
          msgEl.show().text(`No results found, search again!`).fadeOut(3000);
        } else {
          // For first page
          // Add the movie poster to the movie results container
          const moviePosterEl = $("<img>").addClass("col-lg-2 m-1");
          moviePosterEl.attr("src", data.Poster);
  
          // Search results page append posters to parent container
          $("#movie-results").append(moviePosterEl);
  
          // Generate movie details/reddit page
          genMovieDetail(data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
  searchFormEl.on("submit", function (event) {
    event.preventDefault();
    // Get movie title currently in searchbar
    // Format the title of the movie to replace white space '\s' with '+'
    var query = searchMovieEl.val().trim().toLowerCase() ;
    updateSearchHistory(query);
  
    // Generate search history in HTML
    genSearchHistory();
  });
  
  // Clear history
  clearBtnEl.on("click", function () {
    localStorage.clear();
    searchHistory = [];
    // Generate empty search history in HTML
    genSearchHistory();
  });

  function updateSearchHistory(query) {
    // Get search history from localStorage
    searchHistory = JSON.parse(localStorage.getItem("query")) || [];

    // Check for duplicated searches
    for (var i = 0; i < searchHistory.length; i++) {
      // Check for duplicated searches
      if (searchHistory[i]=== query) {
        searchHistory.splice(i, 1);
      }
    }
    // Add movie value to searchHistory array
    searchHistory.unshift(query);
  
    // Add array to localStorage
    localStorage.setItem("query", JSON.stringify(searchHistory));
  }
  
  // Generate seach history in HTML when page loads
  // Load posters from search history
  function genSearchHistory() {
    // Clear/reset search history
    historyEl.html("");
    // Make seach history items
    for (let i = 0; i < searchHistory.length; i++) {
      // Make HTML element
      const historyItem = $("<button>");
  
      // Set attributes for the element
      // historyItem.attr("type", "text");
      // historyItem.attr("readonly", true);
      historyItem.attr("class", "query-btn form-control close-button");
      historyItem.attr("value", searchHistory[i]);
      historyItem.text(searchHistory[i].toUpperCase());

      // Action for when search history item is clicked
      
      // Append history item
      historyEl.append(historyItem);
    }
  
    loadPosters();
  }
  
  function loadPosters() {
    // Clear/reset posters in movie results container
    resultEl.html("");

    // Load movie information from search history array
    for (let i = 0; i < searchHistory.length; i++) {
      // Replace white space with '+' character for omdb api query
      let historyQuery = searchHistory[i].replace(/\s/g, "+");
      addMovies(historyQuery);
    }
  }
  
  // For second page
  function genMovieDetail(data) {
    // Add the movie poster to the movie results container
    const moviePosterEl = $("<img>").addClass("col-lg-2 m-1");
  
    moviePosterEl.attr("src", data.Poster);
  
    // Search results page append posters to parent container
    $("#movie-results").append(moviePosterEl);
  
    // Make an area of the movie-item for holding the title
    const movieTitleEl = $("<p>").addClass("title");
  
    movieTitleEl.html(`Title: ${data.Title}`);
  
    // Make an area of the movie-item for holding the release year
    const movieYearEl = $("<p>").addClass("year");
  
    movieYearEl.html(`Year: ${data.Year}`);
  
    // Make an area of the movie-item for holding the country of origin
    const movieCountryEl = $("<p>").addClass("country");
  
    movieCountryEl.html(`Country: ${data.Country}`);
  
    // Make an area of the movie-item for holding the rating
    const movieRatingEl = $("<p>").addClass("rating");
  
    movieRatingEl.html(`Rating: ${data.Rated}`);
  
    // Make an area of the movie-item for holding the genre
    const movieGenreEl = $("<p>").addClass("genre");
  
    movieGenreEl.html(`Genre: ${data.Genre}`);
  
    // Generate HTML container elements
    // Container for each movie
    const movieDetailsContainerEl = $("<div>").attr(
      "id",
      "movie-details-container"
    );
    movieDetailsContainerEl.addClass("d-flex flex-row justify-content-center");
  
    // Movie details container
    const movieDetailsEl = $("<div>").attr("id", "movie-details");
    movieDetailsEl.addClass(
      "col-2 m-1 p-1 bg-primary border border-white text-white"
    );
  
    // Reddit details container
    const movieRedditEl = $("<div>").attr("id", "movie-reddit");
    movieRedditEl.addClass(
      "col-2 m-1 p-1 bg-primary border border-white text-white"
    );
    
    // For demo purpose/placeholder
    movieRedditEl.text("Reddit");
    
    // Reddit/Details page append container to hold
    // poster/movie info/reddit info
    movieDetailsContainerEl.append(moviePosterEl, movieDetailsEl, movieRedditEl);
  
    // Inject into HTML page
    $("#main-details-container").append(movieDetailsContainerEl);
  
    // Add data to movie details
    movieDetailsEl.append(
      movieTitleEl,
      movieYearEl,
      movieCountryEl,
      movieRatingEl,
      movieGenreEl
    );
  }
  
  // Loads history items
  genSearchHistory();
})