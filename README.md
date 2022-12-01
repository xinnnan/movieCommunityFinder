# movieCommunityFinder
Movie Community Finder
A webpage to help individuals find places on reddit about the movies they are interested in.

## Project Description: 

OMDB/Reddit to search/list favorite movies/actors then grab subreddits.
Enter a movie title and get detailed information from OMDB and all related reddit posts and subreddits.
Click on a movie poster to view details of that movie and related subreddits/posts in a accordion form.
And show statistics for each (number of users, date created, number of upvotes, etc.) and icons/banners for each subreddit.
The searched movie that the user wants to follow will persist in the local memory to appear when the user comes back to the page.
Retrieve and update information from IMDB and Reddit every time user loads the application.
User Input: title of movie
Mark/unmark movies user would like to watch 

## User Story:

AS A Movie Enthuiast 
I WANT TO SEARCH THE MOVIES AND ITS RELATED COMMUNITY TOPICS
SO THAT ALL INFORMATION IS PROVIDED AT ONCE

## Installation

N/A

## Usage

API’s used:
OMDB & Reddit
After the page is loaded, user can search for a movie following the instructions. If found, a poster of the searched movie and it's title will be presented on the screen. User can click on the poster to view details of the movie and also it's related subreddits and posts. User can mark and unmark the movie from favourite list from 3 places: 1. Click on the star icon on the navigation bar, and all the marked movie would be shown from the most recent to oldest; 2.From the main page, click on the star icon at the bottom right conner of each poster; 3. From movie detials/reddit page. User can also search for a movie on the details/reddit page. User history and search result on the main page are also ordered from the most recent search to the oldest, removing a search key word from history list will remove the related movie from the main page, but will not effect the favourite panel. The application's background is also dynamically changed according to user input. 
Reddit: user can either search for subreddits or posts relating to input movie name, and with change in filter menus and limit slider, the page will be dynamically loaded in a nested accordion form. By selecting the "subreddit" tab, user can view detials of the subreddit, and by clicking on the title, a button leading to the subreddit is presented. If "post" tab is selected, user can view the content of each post by clicking on the title block, and the top comments will also be generated including numbers of upvotes. 

## Screenshot

The following image shows the web application's appearance and functionality:
![Main page with header, navigation bar for off-canvas search and favourite panels, search movie will be loadd to the center of the main page if found.](./assets/images/chrome-capture-1.gif)
![Click on the poster to enter the page with movie details and reddit information, user can also search for movies from this page.](./assets/images/chrome-capture-2.gif)
![User has access to reddit posts and communities from the detailed page, and by changing the slider and inputs from drop down menu, information will be dynamically generated.](./assets/images/chrome-capture-3.gif)
![User also has access to videos and reddit comments from this page.](./assets/images/chrome-capture-4.gif)
![By click on either the star button on the navigation bar or on the poster, user can mark or unmark the movie.](./assets/images/chrome-capture-5.gif)
![User can directly go to other favourited movie's detail page by click on the poster stored in favourite panel.](img src="/assets/images/chrome-capture-6.gif" width="720" height="353")
![All informations are shared between pages, and user is also able to mark/unmark movie from the main page.](./assets/images/chrome-capture-7.gif)
![Movie poster is removed from the main page if user delete it's related search keyword.](./assets/images/chrome-capture-8.gif)

## Link

[Deploy Link to the web application](https://xinnnan.github.io/movieCommunityFinder/index.html).

## Credits

N/A

## License

Please refer to the LICENSE in the repo.

## Breakdown of tasks:

Functions: 

(Michael)

HTML CSS JS (Page 1 Page 3)
	Headers 
	View Fav 
	Movie/Info Placeholders 
	Icon/Add to Fav
	Movie select 
	Hover action

(Xinnan)

HTML CSS JS (Page 1)
Inputbox 
Search button 
Search List Storage 
Delete Icon 
	
(Joseph)

Basic HTML CSS with OMDB part (Page 1 Page2 Page3)
OMDB API integration  (search + Store + Display)


(Xuan)

Basic HTML CSS with Reddit (Page 2)
Reddit API integration (search + Store + Display)


