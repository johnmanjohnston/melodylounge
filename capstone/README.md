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
MelodyLounge is distinctive and complex as it is a very powerful and blazingly fast application, and the main features of the app are done in a single page, which allows for fast loading, and better caching. MelodyLounge also makes use of state-of-the-art security practices for protection from malicious practices. Every request which manipulates any data is checked to see if the user has permission to perform such actions.

MelodyLounge also involves gorgeous, simplistic, and modest UI, with a compeltely mobile responsive layout.

# What Is Included in Each File?
TODO

