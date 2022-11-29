# movieCommunityFinder
A webpage to help individuals find places on reddit about the movies they are interested in
OMDB + Reddit Possible Project Titles:
- Movie Community Finder


Project Description: 

OMDB/Reddit to search/list favorite movies/actors then grab subreddits.
Enter list of movies or actors (see early project of grocery list) and get all reddits for those movies/actors.
And show related subreddits.
And show statistics for each (number of users, posts, reads, etc.)
If a user has a list of topics they are following, select the ones they would like to currently look at and only show those subreddits.
The selected topics that the user wants to follow will persist in the local memory to appear when the user comes back to the page and automatically loads all related subreddits
Retrieve and update information from IMDB and Reddit every hour (new episodes, series, reviews, subreddits, posts, etc. )
User Input: title and/or characters
Mark/unmark movies user would like to watch 
Mark/unmark movies user have already watched
List of interests as filter tags (keywords, generes, release date, language)

Reddit: user can either search for subreddits or posts relating to input movie name, and with change in filter menus and limit slider, the page will be dynamically loaded in a nested accordion form. By selecting the "subreddit" tab, user can view detials of the subreddit, and by clicking on the title, a button leading to the subreddit is presented. If "post" tab is selected, user can view the content of each post by clicking on the title block, and the comments will also be generated including number of upvotes. 

User Story:

AS A Movie Enthuiast 
I WANT TO SEARCH THE MOVIES AND ITS RELATED COMMUNITY TOPICS
SO THAT ALL INFORMATION IS PROVIDED AT ONCE

API’s used:
OMDB
Reddit

Breakdown of tasks:

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




Omdb part in a branch 


Search result: 
key : input  result: json 

Movie object: { returned json, fav: boolean, }

Key: property boolean  result: input


