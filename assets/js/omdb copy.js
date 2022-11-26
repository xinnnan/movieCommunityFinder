// Search/History Elements
const searchMovieEl = $("#search-input");
const searchBtnEl = $("#search-button");
const clearBtnEl = $("#clear-history");
const historyEl = $("#history");

const searchFormEl = $("#search-form");

// Display Results Elements
const resultEl = $("#movie-results");

// Button that links to Reddit/Movie details page
const redditBtnEl = $("reddit-details");

// Get search history from localStorage
// or empty array if localStorage is empty
var searchHistory = JSON.parse(localStorage.getItem("query")) || [];

// Base query URL and API key
const baseURL = "http://www.omdbapi.com/?";
const apikey = "&apikey=d812fbca";

$(function () {
  $(document).foundation();
  function addMovies(query) {
    // Generate query URL for current movie
    const queryURL = `${baseURL}t=${query}${apikey}`;

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // For first page
        // Add the movie poster to the movie results container
        // const moviePosterEl = $("<img>").addClass("col-lg-2 m-1");
        const moviePosterEl = document.createElement("img");

        // moviePosterEl.attr("src", data.Poster);
        moviePosterEl.setAttribute("src", data.Poster);

        // const movieBtn = $("<button>").append(moviePosterEl);

        // movieBtn.attr("id", `${data.Title}`);
        // movieBtn.addClass("img-btn");

        // Search results page append posters to parent container
        // $("#movie-results").append(movieBtn);
        // document.getElementById("movie-results").append(moviePosterEl);
        // console.log(movieBtn);

        // Generate movie details/reddit page
        genMovieReddit(data);
      });
  }

  searchFormEl.on("submit", function () {
    // Get movie title currently in searchbar
    // Format the title of the movie to replace white space '\s' with '+'
    const query = searchMovieEl.val();
    console.log(query);

    // Add movie value to searchHistory array
    searchHistory.push(query);

    // Add array to localStorage
    localStorage.setItem("query", JSON.stringify(searchHistory));

    // Generate search history in HTML
    genSeachHistory();
  });

  // Clear history
  clearBtnEl.on("click", function () {
    localStorage.clear();
    searchHistory = [];
    // Generate empty search history in HTML
    genSeachHistory();
  });

  // Generate seach history in HTML when page loads
  // Load posters from search history
  function genSeachHistory() {
    // Clear/reset search history
    historyEl.html("");

    // Make seach history items
    for (let i = 0; i < searchHistory.length; i++) {
      // Make HTML element
      const historyItem = $("<input>");

      // Set attributes for the element
      historyItem.attr("type", "text");
      historyItem.attr("readonly", true);
      historyItem.attr("class", "form-control d-block bg-white");
      historyItem.attr("value", searchHistory[i]);

      // Action for when search history item is clicked
      historyItem.on("click", function () {});

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
  function genMovieReddit(data) {
    // Add the movie poster to the movie results container
    const moviePosterEl = $("<img>").addClass("m-1");
    const movieBtn = $("<button>").append(moviePosterEl);

    movieBtn.attr("id", `${data.Title}`);
    movieBtn.addClass("img-btn");
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

    // Make an area of the movie-item for holding the reviews
    const imdbReviewEl = $("<p>").addClass("imdb-review");
    const rottenTomatoesReviewEl = $("<p>").addClass("rotten-tomatoes-review");
    const metaCriticReviewEl = $("<p>").addClass("meta-critic-review");

    imdbReviewEl.html(`IMDB Review: ${data.Ratings[0]}`);
    rottenTomatoesReviewEl.html(`Rotten Tomatoes Review: ${data.Ratings[1]}`);
    metaCriticReviewEl.html(`Metacritic Review: ${data.Ratings[2]}`);

    // Make an area of the movie-item for holding the plot
    const moviePlotEl = $("<p>").addClass("plot");

    moviePlotEl.html(`Plot: ${data.Plot}`);

    // Make an area of the movie-item for holding the director
    const movieDirectorEl = $("<p>").addClass("director");

    movieDirectorEl.html(`Director: ${data.Director}`);

    // Make an area of the movie-item for holding the actors
    const movieActorsEl = $("<p>").addClass("actors");

    movieActorsEl.html(`Actors: ${data.Actors}`);

    // Make an area of the movie-item for holding the awards
    const movieAwardsEl = $("<p>").addClass("awards");

    movieAwardsEl.html(`Awards: ${data.Awards}`);

    // Make an area of the movie-item for holding the box office earnings
    const movieBoxOfficeEl = $("<p>").addClass("box-office");

    movieBoxOfficeEl.html(`Box Office: ${data.BoxOffice}`);

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
    movieDetailsContainerEl.append(movieBtn, movieDetailsEl, movieRedditEl);

    // Inject into HTML page
    $("#omdb-content").append(movieDetailsContainerEl);

    // Add data to movie details
    movieDetailsEl.append(
      movieTitleEl,
      movieYearEl,
      movieCountryEl,
      movieRatingEl,
      movieGenreEl,
      movieRatingEl,
      moviePlotEl,
      movieDirectorEl,
      movieActorsEl,
      movieAwardsEl,
      movieBoxOfficeEl
    );
  }

  $(".img-btn").on("click", posterClick);

  function posterClick(event) {
    console.log(event.target);
  }

  // Loads history items
  genSeachHistory();
});
