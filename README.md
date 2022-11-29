# movieCommunityFinder
A webpage to help individuals find places on reddit about the movies they are interested in
OMDB + Reddit Possible Project Titles:
- Movie Community Finder


Project Description: 

OMDB/Reddit to search/list favorite movies/actors then grab subreddits.
Enter a movie title and get detailed information from OMDB and all related reddit posts and subreddits.
Click on a movie poster to view details of that movie and related subreddits/posts in a accordion form.
And show statistics for each (number of users, date created, number of upvotes, etc.) and icons/banners for each subreddit.
The searched movie that the user wants to follow will persist in the local memory to appear when the user comes back to the page.
Retrieve and update information from IMDB and Reddit every time user loads the application.
User Input: title and/or characters
Mark/unmark movies user would like to watch 
Mark/unmark movies user have already watched

Reddit: user can either search for subreddits or posts relating to input movie name, and with change in filter menus and limit slider, the page will be dynamically loaded in a nested accordion form. By selecting the "subreddit" tab, user can view detials of the subreddit, and by clicking on the title, a button leading to the subreddit is presented. If "post" tab is selected, user can view the content of each post by clicking on the title block, and the top comments will also be generated including numbers of upvotes. 

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


