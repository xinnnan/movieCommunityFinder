// Search/History Elements
const searchMovieEl = $("#search-movie");
const searchBtnEl = $("#search-button");
const clearBtnEl = $("#clear-history");
const historyEl = $("#history");
const msgEl = $("#msg");

// Search Elements
const resultTextEl = $("#result-text");
const redditEl = $("#reddit-container");
const postSortEl = $("#post-sort");
const postTimeEl = $("#post-time");
const limitEl = $("#slider-output");
const postContainerEl = $("#post-container");
const subContainerEl = $("#sub-container");

const iconPlaceholder = "https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png";
const redditUrl = "https://www.reddit.com/";

// Display Results Elements
const resultEl = $("#movie-results");

// Button that links to Reddit/Movie details page
// const redditBtnEl = $("reddit-details");

// Get search history from localStorage
// or empty array if localStorage is empty
var searchHistory = JSON.parse(localStorage.getItem("query")) || [];

// Base query URL and API key
const baseURL = "http://www.omdbapi.com/?";
const apikey = "&apikey=d812fbca";

$(function() {

  $(document).foundation();

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
          var moviePosterEl = $("<a>").addClass("thumbnail small-12 row").attr({
            "id":"poster-link",
             "href":"\detail.html",
            "data-title":data.Title});

              var imageUrl = data.Poster;
              $('body').css("background", "url(" + imageUrl + ")");
  
            
          var movieTitle = $("<div>").addClass("card-section");
          movieTitle.html(`<h4>${data.Title}</h4>`);
          moviePosterEl.append($("<img>").attr("src", data.Poster), movieTitle);
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
  
  searchBtnEl.on("click", function () {
    // Get movie title currently in searchbar
    // Format the title of the movie to replace white space '\s' with '+'
    const query = searchMovieEl.val().trim().toLowerCase();
    updateSearchHistory(query);
  
    // Add movie value to searchHistory array
    // searchHistory.push(query);
  
    // Add array to localStorage
    // localStorage.setItem("query", JSON.stringify(searchHistory));
  
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
    // Make the posters clickable
    var moviePosterEl = $("<a>").addClass("thumbnail medium-1").attr({
      "href":"\detail.html",
      "data-title":data.Title});
    moviePosterEl.append($("<img>").attr("src", data.Poster));
    $("#movie-results").append(moviePosterEl);

    // const moviePosterEl = $("<img>").addClass("m-1");
    // moviePosterEl.attr("src", data.Poster);   
  
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
    // const movieRedditEl = $("<div>").attr("id", "movie-reddit");
    // movieRedditEl.addClass(
    //   "col-2 m-1 p-1 bg-primary border border-white text-white"
    // );
  
    // For demo purpose/placeholder
    // movieRedditEl.text("Reddit");
  
    // Reddit/Details page append container to hold
    // poster/movie info/reddit info
    movieDetailsContainerEl.append(moviePosterEl, movieDetailsEl);
  
    // Inject into HTML page
    $("#main-details-container").append(movieDetailsContainerEl);

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
    localStorage.setItem("movie", JSON.stringify(data.Title));
    $("#omdb-content").append(movieDetailsEl);
  }
  
    //Search for subreddit
    function searchSubApi(query) {
      var subUrl = `${redditUrl}search.json?q=${query}&source=recent&type=sr&limit=${limitEl.val()}`;
      resultTextEl.text(query);
  
      fetch(subUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (subRes) {
        var sub = subRes.data.children;
        if (!sub.length) {
          console.log('No results found!');
          redditEl.text('No results found, search again!');
        } else {
          subContainerEl.empty();
          for (var i = 0; i < sub.length; i++) {
              displaySub(sub[i].data);
          }       
        }
       })
      .catch(function (error) {
        console.error(error);
      });
    }
  
    // Search for reddit posts
    function searchRedditApi(query) {
      var postUrl = `${redditUrl}search.json?q=${query}&type=link&sort=${postSortEl.val()}&t=${postTimeEl.val()}&limit=${limitEl.val()}`;
      fetch(postUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (postRes) {
        var post = postRes.data.children;
  
        if (!post.length) {
          console.log('No results found!');
          redditEl.text('No results found, search again!');
        } else {
          postContainerEl.empty();
          for (var i = 0; i < post.length; i++) {
              displayPost(post[i].data);
          }       
        }
       })
      .catch(function (error) {
        console.error(error);
      });
    }
  
    // Search for comments for expanded post
    function searchCommentApi (sub, id, postEl) {
      var commentUrl = `${redditUrl}${sub}/comments/${id}.json?sort=top$limit=30`;
      fetch(commentUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (commentRes) {
        var commentData = commentRes[1].data.children;
        if (!commentData.length) {
          console.log('No results found!');
          reddiEl.text('No results found, search again!');
        } else {
          displayComment(commentData, postEl);
        }
       })
      .catch(function (error) {
        console.error(error);
      });
  }
  
    // Display search result for subreddit
    function  displaySub(subObj) {
  
      var subEl = $("<li>").addClass("accordion-item accordion-navigation");
      subEl.attr({"id":"item-container", "data-accordion-item":""});
  
      // date when the subreddit is created
      var date = $("<h>").attr("id","date");
      date = date.text(new Date(subObj.created_utc*1000).toLocaleString());
        
      // title block for brief info of the subreddit
      var titleBlock = $("<a>").addClass("accordion-title").attr({
          "id":"sub-heading", 
          "role":"tab", 
          "href":`#sub-content${date}`, 
          "aria-controls":"item-content"});
      
      // icon and banner of the subreddit
      var iconSection = $("<div>").attr("id", "icon-section");
      var icon = $("<img>").attr("id","sub-icon");
      iconSection.append(icon);
      var bannerUrl = subObj.banner_background_image;
      bannerUrl = bannerUrl.substring(0, bannerUrl.indexOf('?'));
      iconSection.css('background-image', 'url("' + bannerUrl + '")');
      if (subObj.community_icon.length) {
          icon.attr(
              "src",subObj.community_icon.substring(0, subObj.community_icon.indexOf('?')));
      } else {
          // use placeholder if no icon has found
          icon.attr(
              "src", iconPlaceholder);
      }
      var title = $("<h5>").attr("id","title-text").text(subObj.title);
      var sub = $("<span>").attr("id","sub-name").text(subObj.display_name_prefixed);
      var subscriber = $("<h>").attr("id","subscriber");
      if (subObj.subscribers) {
          subscriber.text(`${subObj.subscribers.toLocaleString()} Subscribers`);
      }
      titleBlock.append(iconSection,$("<div>").append(sub, subscriber),title,$("<div>").append(date));
  
      // details of the subreddit
      var body = $("<div>").addClass("accordion-content");
      body.attr({
          "id":`sub-content${date}`, 
          "data-tab-content":"", 
          "role":"tabpanel", 
          "aria-labelledby":"item-content-heading", 
          "data-tab-content":""});
      if (subObj.public_description) {
          body.append($("<h>").append(subObj.public_description));
      }  
      // opem subreddit in a new window after button clicked 
      var subBtn= $("<a>").addClass("button expand medium").text(
          "Go to " + subObj.display_name_prefixed);
      body.append($("<div>").attr("id","subBtn").append(subBtn.attr({
          "href":redditUrl + subObj.display_name_prefixed,
          "target":"_blank"})));    
      subEl.append(titleBlock, body);
      subContainerEl.append(subEl);
      
      // re-initialize the container 
      Foundation.reInit(subContainerEl);
    }
  
    // Display search result for reddit post
    function displayPost(postObj) {
  
      var postEl = $("<li>").addClass("accordion-item");
      // construct a titleblock to display brief infos of this post
      var title = $("<h5>").attr("id","title-text").text(postObj.title);;
      var sub = $("<span>").attr("id","sub-name").text(postObj.subreddit_name_prefixed);
      var subscriber = $("<h>").attr("id","subscriber");
      subscriber.text(`${postObj.subreddit_subscribers.toLocaleString()} Subscribers`);
      var date = $("<h>").attr("id","date");
      date = date.text(new Date(postObj.created_utc*1000).toLocaleString());
      var author = $("<h>").text(postObj.author);
      var ups = $("<span>").html(
          `<i class="fa-solid fa-thumbs-up" style="padding-left:20px;"></i> ${postObj.ups}`);
      var titleBlock = $("<a>").addClass("accordion-title").attr("href", `#post-content${date}`);
      titleBlock.append($("<div>").append(sub, subscriber),title, date, author, ups);
  
      // content of this post
      var body = $("<div>").addClass("accordion-content");
      body.attr({"id":`post-content${date}`, "data-tab-content":""});
      var imgUrl = postObj.url_overridden_by_dest;
      // image content
      if (imgUrl != undefined) {
          if (imgUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
              var img = $("<a>").addClass("thumbnail").attr({
                  "href":imgUrl,
                  "target":"_blank"});
              img.append($("<img>").attr("src",imgUrl));
              body.append(img);
          } 
      }
      // video content
      if (postObj.media) {
          var videoUrl;
          var video =  $("<div>").addClass("flex-video widescreen vimeo");
          // youtube video
          if (postObj.media.oembed) {
              videoUrl = postObj.media.oembed.html.substring(
                  postObj.media.oembed.html.indexOf(':') + 1,
                   postObj.media.oembed.html.lastIndexOf('?'));
              videoUrl = 'https:' + videoUrl;
          // reddit video    
          } else if (postObj.media.reddit_video) {
              videoUrl = postObj.media.reddit_video.fallback_url;
          }
          // display video in iframe
          var iframe = $("<iframe>").attr({
              "src":videoUrl,
              "frameborder":"0",
              "allowFullScreen":""});
          video.append(iframe);
          body.append(video);  
      }
      // text content
      if (postObj.selftext) {
          body.append($("<h>").attr("id", "post-text").append(postObj.selftext));
      } 
      // number of comments and comment section
      var numComment = $("<div>").text(postObj.num_comments + " comments");
      var commentEl = $("<div>").addClass("comment-section");
      body.append(numComment,commentEl);
      postEl.append(titleBlock, body);
      postEl.attr({
          "id":"item-container",
          "data-accordion-item":"",
          "data-id":postObj.id, 
          "data-sub":postObj.subreddit_name_prefixed,
      });
      // trigger search for comment when number of comments is not 0
      if (postObj.num_comments) {
          postEl.on("click", handleViewDetail);
      }
      postContainerEl.append(postEl);
      Foundation.reInit(postContainerEl);
    }
  
    // Display comments for reddit post
    function displayComment(commentObj, postEl) {
      var commentsEl = $("<ul>");
  
      // construct comments
      for (var i = 0; i < commentObj.length-1; i++) {
          var cmtEl = $("<li>").attr("id", "comment-wrapper");
          var author = $("<h>").text(commentObj[i].data.author);
          var date = $("<h>").attr("id","date").text(
              new Date(commentObj[i].data.created_utc*1000).toLocaleString());
          var ups = $("<span>").html(
              `<i class="fa-solid fa-thumbs-up" style="padding-left:20px;"></i> ${commentObj[i].data.ups}`);
          var comment = $("<div>").attr("id","comment").text(commentObj[i].data.body);
          cmtEl.append(date, author, ups, comment);
          commentsEl.append(cmtEl);
      }
      // empty the comment section before appending them
      $(postEl).find($(".accordion-content")).find($(".comment-section")).empty().append(commentsEl);
  }
  
    // Handle search event and trigger searches on APIs
    function handleSearchFormSubmit() {
      
      var searchName = JSON.parse(localStorage.getItem("movie"));
 
      if (!searchName) {
        console.error("You need a search input value!");
        return;
      }
      searchSubApi(searchName);
      searchRedditApi(searchName); 
      addMovies(searchName); 
    }
  
    // Update available search menu filters
    function updatePostMenu(event) {
      // hide menu for tiem when "hot" or "new" is selected
      // they are independent to time 
      if ($("#post-sort").val() === "hot" || $("#post-sort").val() === "new") {
          postTimeEl.hide();
      } else {
          postTimeEl.show();
      }
      handleSearchFormSubmit(event);
    }
  
    // Handle expand event for comment search
    function handleViewDetail(event) {
      var subPrx = this.dataset.sub;
      var postID = this.dataset.id;
      searchCommentApi(subPrx, postID, this);  
    }
  
    // Automatically update search results when any of the input values changed
    $(document).on('click', '#poster-link', function(event) {
      localStorage.setItem("movie", JSON.stringify(this.dataset.title));
      handleSearchFormSubmi();
   });

    // $("#poster-link").on("click", handleSearchFormSubmit);
    $(".post-input").on("change", updatePostMenu);
    $(".slider").on("click", handleSearchFormSubmit);
    $(".slider").on("click", handleSearchFormSubmit);
    $("#search-form").on("submit", function(){
      localStorage.setItem("movie", JSON.stringify($("#search-input").val().trim()))});
  
  // Loads history items
  genSeachHistory();

  // $(window).on('beforeunload', function(){
  // });

  $(window).on('load', function(){
    var searchName = JSON.parse(localStorage.getItem("movie"));
    searchSubApi(searchName);
    searchRedditApi(searchName); 
    addMovies(searchName);
  });
  
})
