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

$(function() {

  $(document).foundation();

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
  function handleSearchFormSubmit(event) {
    event.preventDefault();
    var searchInputVal = $("#search-input").val().trim();
    if (!searchInputVal) {
      console.error("You need a search input value!");
      return;
    }
    searchSubApi(searchInputVal);
    searchRedditApi(searchInputVal); 
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
  $("#search-form").on("submit", handleSearchFormSubmit);
  $(".post-input").on("change", updatePostMenu);
  $(".slider").on("click", handleSearchFormSubmit);
  $(".slider").on("click", handleSearchFormSubmit);

})

