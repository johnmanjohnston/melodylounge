# MelodyLounge -- CS50W Final Project

# About
MelodyLounge is a music streaming platform, similar to Spotify, Apple Music, etc. 
MelodyLounge is also completely mobile responsive. The main features of MelodyLounge is included as a single page application,
which makes the application run blazingly fast as you do not have to load an entirely new page any time you switch tabs in MelodyLounge.

There are three main tabs in MelodyLounge. The profile tab--which lets you see songs which have been uploaded by you, the search tab--which lets you search for songs and other artists, and finally the playlists tab which lets you view, edit, create, and delete playlists which you have created.

Each song that appears on MelodyLounge tells you information about that song. The song's author and title are shown, as well as options to add said song into any
of your playlists. On the right is a button which lets you play said song. If the song which you are viewing is part of a playlist's songs that you are viewing, you will get the option to remove said song from playlist. 

When you open the playlists tab, you are shown a menu which shows all of your playlists. Clicking on any of the playlists will show you the songs in said playlist, and the playlist title is visible on top. Clicking on the playlist title will show a textbox, which lets you reword the title of said playlist. You will also have the option to
delete the playlist that you are viewing. The delete button is directly under the playlist title. 

When you click on the play button for a song, the song comes below right above the play button. Clicking on the author of the song will take you to a tab where you can see all songs by the
author. You will also have the option to add the song to any playlist which you have created. 

# How to Run
To run MelodyLounge simply run `python manage.py runserver` and the server should be up and running.

# Distinctiveness and Complexity
MelodyLounge is a very powerful and blazingly fast application, due to the main features of the app being done in a single page, which allows for fast loading, and better browser caching. MelodyLounge also makes use of state-of-the-art security practices (like CSRF protection, and authorizing each request which manipulates data, by checking if the requester's user ID matches with the user ID of the owner of the resource being manipulated) for protection from malicious requests.

MelodyLounge also involves gorgeous, simplistic, modest UI, with a compeltely responsive layout, which lets MelodyLounge be accessed regardless of device screen size. MelodyLounge also offers the functionality to let users download songs they listen to so that they can listen to their favorite tunes, regardless of wether they have internet or not. MelodyLounge takes advantage of CSS animations, which notably enhance the UI's aesthetic appeal, and improves the overall user experience.

MelodyLounge comprises of models for Users, Songs, and Playlists. The communication with the server-side and client-side code happens via JSON. The `Song` model comprises of fields for the author, title, and a true/false value to mark wether the song is explicit or not. The model is programmed to automatically get rid of the song audio file uploaded during the creation of the `Song` model, when we delete the `Song` instance, via the `delete()` function present in the Song model class. This makes it so that when we delete a song from the Django admin interface, we do not have to manually locate the audio file and delete it ourselves--it is all done automatically to speed up the process of compeltely deleting songs. MelodyLounge also has its own system to make sure that all the songs shown in the UI look consistent, by parsing the response JSON and returning it as HTML. This converstion happens in `song.js`. 

# What Is Included in Each File?

### Server-Side Code
In `views.py` all the functions that handle returning views and APIs are stored, and in `urls.py` the routes are mapped to the functions in `views.py`.

There are views to register, login, logout, and publish songs, and the view for the main application, which is the default route.

There are also multiple API routes which the client side code uses to interfere with MelodyLounge's backend. 

The API consists of routes to search for songs, filter songs by author, get songs by a playlist ID, get playlists by a username, add songs to playlist, remove songs from playlist, get data about a particular song, rename/create/delete playlists, and finally a route to get random songs.

Views to create, edit, and delete playlists all utilize security checks to make sure no one can make unauthorized requests from any other account's behalf. 

In `models.py`, all the models which MelodyLounge utilizes are defined. Models are present for Users, Playlists, and Songs.

Changes have been made to `settings.py` to store the directory where we upload songs, in the `SONG_DESTINATION_DIR` variable. Songs are stored in the `/songs/` directory in the root directory of the Git repository.

### Client-Side Code
In `songs.js` contains the core code to handle listing UI songs, user profiles, and playlists, as well as playing songs.

`tab_manager.js` consists of functions to handle switching tabs. 

`search.js` handles the tab for searching for songs. When the search form is submitted, we prevent the default acation of submitting a form and we query the API for the search query and we then convert the JSON response into UI that the user can see, with the help of `song.js`.

`profile.js` hanldes the tab for looking at a profile. We query the server to get songs by the user's profile that we want to see, and we show the songs UI to the user.

`playlist.js` handles playlist operations. We have functions to create, rename, and delete playlists. We also have functions to view songs in a playlist, add and remove songs to/from a playlist. All these functions send a fetch request to the server to carry out such operations, which are protected by CSRF, and authorized on the server.

`global.css` has the CSS code that is used across all pages for MelodyLounge.