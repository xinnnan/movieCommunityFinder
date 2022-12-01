
// Search Elements
const searchFormEl = $("#tosearch-form");

// Display Results Elements
const resultEl = $("#movie-results");
const resultTextEl = $("#result-text");
const redditEl = $("#reddit-container");
const postSortEl = $("#post-sort");
const postTimeEl = $("#post-time");
const limitEl = $("#slider-output");
const postContainerEl = $("#post-container");
const subContainerEl = $("#sub-container");

// Base tosearchs URL and API key
const baseURL = "https://www.omdbapi.com/?";
const apikey = "&apikey=f05a1fc8";
const iconPlaceholder = "https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png";
const redditUrl = "https://www.reddit.com/";

// Get search history from localStorage
// or empty array if localStorage is empty
var searchHistory = JSON.parse(localStorage.getItem("tosearchs")) || [];

$(function() {

  $(document).foundation();

  // Output results in the order of inputs
  async function addMovies(tosearchs) {
    // Generate tosearchs URL for current movie
    const tosearchsURL = `${baseURL}t=${tosearchs}${apikey}`;
    await fetch(tosearchsURL)
      .then(await function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(await function (data) {
        if (data.Error) {
          searchHistory.pop();
          localStorage.setItem("tosearchs", JSON.stringify(searchHistory));
          console.log("No results found!");
          
        } else {
          localStorage.setItem("movie", JSON.stringify(data.Title));
          // Generate movie poster
          genMoviePoster(data);
          // Generate movie details/reddit page
          genMovieDetail(data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
async function loadPosters() {
    // Clear/reset posters in movie results container
    searchHistory = JSON.parse(localStorage.getItem("tosearchs")) || [];
    if (!searchHistory.length) {
      resultEl.html(
        '<img src="https://freesvg.org/img/1553605647.png" class="filter-white"></img>').css({
          "transform": "scale(0.5)"});
    } else {
      resultEl.html("");
    }

    // Load movie information from search history array
    for (let i = 0; i < searchHistory.length; i++) {
      // Replace white space with '+' character for omdb api tosearchs
      let historytosearchs = searchHistory[i].replace(/\s/g, "+");
      
      await addMovies(historytosearchs);
    }
  }

  // Set up the format of movie poster
  function setPoster(movie) {
    var moviePosterEl = $("<div>").addClass("thumbnail small-12 medium-5 large-2 row").attr({"id":"poster-card"});
    // redirect to another page showing movie's detail infos and related reddit posts and communities      
    var poster = $("<a>").addClass("thumbnail").attr({
      "href":"\detail.html",
      "id":"poster-link",
      "data-title":movie.Title});
    poster.append($("<img>").attr("src", movie.Poster));

    // title
    var movieTitle = $("<div>").addClass("card-section");
    movieTitle.html(`<h4>${movie.Title}</h4>`);
    // favourite button
    var favBtn = $("<button>").addClass("clear button");
    favBtn.attr({
      "type":"button",
      "id":"fav-btn",
      "data-url":movie.Poster});

    // change the icon if the movie has been favourited
    var fav = JSON.parse(localStorage.getItem("favourite")) || [];
    favBtn.html('<i class="fa-regular fa-star fa-lg"></i>');
    for (let i = 0; i < fav.length; i++) {
      if(movie.Title === fav[i].Title) {
        favBtn.html('<i class="fa-solid fa-star fa-lg"></i>');
      } 
    }
    // movieTitle.append();
    moviePosterEl.append(poster, movieTitle, favBtn); 
    return moviePosterEl;
  }

  // Generate movie poster for index page and favourite list
  function genMoviePoster(data) {
    // For first page
    // Add the movie poster to the movie results container
    // In the order of newer to older search
    var moviePosterEl = setPoster(data); 
    resultEl.prepend(moviePosterEl);
      // $("#movie-results").append(moviePosterEl);
      $("#poster-container").append(moviePosterEl);
      $('body').css({
        "background": "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.5)),url(" + data.Poster + ")",
        "background-size":"auto 100vh",
        "background-position": "center",
        "background-attachment": "fixed"
      });   
  }

  // Generate favourite panel
  function displayFavPanel() {
    $("#fav-panel").empty();
      var fav = JSON.parse(localStorage.getItem("favourite")) || []; 
      for (let i = 0; i < fav.length; i++) {
        var moviePosterEl = setPoster(fav[i]);
        // Order : Most recent to older ones
        $("#fav-panel").prepend(moviePosterEl);
      }     
  }
  
  // For second page
  function genMovieDetail(data) {

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
  
    if (data.Ratings) {
      imdbReviewEl.html(`IMDB Review: ${data.Ratings[0]}`);
      rottenTomatoesReviewEl.html(`Rotten Tomatoes Review: ${data.Ratings[1]}`);
      metaCriticReviewEl.html(`Metacritic Review: ${data.Ratings[2]}`);
    }
  
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
    movieDetailsContainerEl.addClass("center");
  
    // Movie details container
    const movieDetailsEl = $("<div>").attr("id", "movie-details");
    movieDetailsEl.addClass("padding-20 margin-20");

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
    $("#omdb-content").empty();
    $("#poster-container").empty();

    // Add the movie poster to the detail page
    // So user can choose to fav and unfav a movie after reading the detials and community posts
    var moviePosterEl = setPoster(data);    
    $("#poster-container").append(moviePosterEl);
    $("#omdb-content").append(movieDetailsEl);
  }
  
    //Search for subreddit
    function searchSubApi(tosearchs) {
      var searchKey= tosearchs.replace(/\s/g, "+");
      var subUrl = `${redditUrl}search.json?q=${searchKey}&source=recent&type=sr&limit=${limitEl.val()}`;
  
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
    function searchRedditApi(tosearchs) {
      var searchKey= tosearchs.replace(/\s/g, "+");
      var postUrl = `${redditUrl}search.json?q=${searchKey}&type=link&sort=${postSortEl.val()}&t=${postTimeEl.val()}&limit=${limitEl.val()}`;
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
      if(bannerUrl) {
        bannerUrl = bannerUrl.substring(0, bannerUrl.indexOf('?'));
        iconSection.css('background-image', 'url("' + bannerUrl + '")');
      }
      if (subObj.community_icon) {
          icon.attr(
              "src",subObj.community_icon.substring(0, subObj.community_icon.indexOf('?')));
      } else {
          // use placeholder if no icon has found
          icon.attr(
              "src", iconPlaceholder);
      }
      var title = $("<h4>").attr("id","title-text").text(subObj.title);
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
      var title = $("<h4>").attr("id","title-text").text(postObj.title);;
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
      for (let i = 0; i < commentObj.length-1; i++) {
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
    if ( document.URL.includes("detail.html") ) {
      var searchName = JSON.parse(localStorage.getItem("movie"));
      addMovies(searchName);
      resultTextEl.text(searchName);
      searchSubApi(searchName);
       searchRedditApi(searchName); 
    } else {
       loadPosters();
     }
  }
  
   // Update available search menu filters
   function updatePostMenu() {
    // hide menu for tiem when "hot" or "new" is selected
     // they are independent to time 
    if ($("#post-sort").val() === "hot" || $("#post-sort").val() === "new") {
         postTimeEl.hide();
    } else {
        postTimeEl.show();
     }
     handleSearchFormSubmit();
   }

  // Update searchterm when user search on the detial page
  function updateSearchTerm() {
    var searchName = JSON.parse(localStorage.getItem("tosearchs")).slice(-1)[0];
    localStorage.setItem("movie", JSON.stringify(searchName));
    handleSearchFormSubmit();
  }

  // Handle event for clicked favourite button for an movie
  function handleFavClicked(event) {
    event.stopPropagation();

    // Set favourite object for storing infos in localStorage
    var favItem = {
      Title: $(this).siblings().text(),
      Poster: $(this).data().url,
    }
    // Get saved favourite object from localStorage  
    var fav = JSON.parse(localStorage.getItem("favourite")) || [];

    for (var i = 0; i < fav.length; i++) {
      // Check if it has already been liked before
      if (favItem.Title=== fav[i].Title) {
        // Remove from localStorage if already been liked
        fav.splice(i, 1);
        localStorage.setItem("favourite", JSON.stringify(fav));
        handleSearchFormSubmit();
        displayFavPanel();
        return;
      }
    }
    // If not, add it to localStorage
    fav.push(favItem);
    localStorage.setItem("favourite", JSON.stringify(fav));
    handleSearchFormSubmit();
    displayFavPanel();
  }
  
  // Handle expand event for comment search
  function handleViewDetail() {
    var subPrx = this.dataset.sub;
    var postID = this.dataset.id;
    searchCommentApi(subPrx, postID, this);  
  }

  // Handle event for clicked movie poster
  function handlePosterClicked(event) {
    event.stopPropagation();
    localStorage.setItem("movie", JSON.stringify(this.dataset.title));
    handleSearchFormSubmit();
  }

  // Get the name of the poster selected
  $(document).on('click', '#poster-link', handlePosterClicked);

  // Automatically update search results when any of the input values changes
  $(".post-input").on("change", updatePostMenu);

  // Triggers the off-canvas favourite panel
  $("#fav-trigger").on("click",  displayFavPanel);

  // Favourite or unfavourite a movie
  $(document).on("click", "#fav-btn", handleFavClicked);

  // Update search infos whenever an input changes
  $(".slider").on("click", handleSearchFormSubmit);
  $(".slider").on("click", handleSearchFormSubmit);

  // Handle search from other page
  searchFormEl.on("submit", updateSearchTerm);

  // Handle click event for items from search history 
  $(document).on("click", "#history-btn", handleSearchFormSubmit);

  handleSearchFormSubmit();
})
