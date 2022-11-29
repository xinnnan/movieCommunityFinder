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

Reddit:
Title:
About: 
Number of subscribers
Hot posts
Top comments
Growth by percentage / Growth by number of increased subscribers from user subscription date

User Story:

AS A Movie Enthuiast 
I WANT TO SEARCH THE MOVIES AND ITS RELATED COMMUNITY TOPICS
SO THAT ALL INFORMATION IS PROVIDED AT ONCE

Wireframe:

Created in Axure2020 or Figma.
https://www.figma.com/file/9gMHwboFLy9wYfaVxcteEj/Untitled?node-id=0%3A1&t=ABoK2ZOToLi7EEJc-0


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







GET /subreddits/search
Search subreddits by title and description.

GET /subreddits/where
→ /subreddits/popular
→ /subreddits/new
→ /subreddits/gold
→ /subreddits/default
Get all subreddits.
The where parameter chooses the order in which the subreddits are displayed. popular sorts on the activity of the subreddit and the position of the subreddits can shift around. new sorts the subreddits based on their creation date, newest first.

GET /r/subreddit/about
Return information about the subreddit.
Data includes the subscriber count, description, and header image.

GET [/r/subreddit]/hot

GET [/r/subreddit]/comments/article
Get the comment tree for a given Link article.
If supplied, comment is the ID36 of a comment in the comment tree for article. This comment will be the (highlighted) focal point of the returned view and context will be the number of parents shown.


