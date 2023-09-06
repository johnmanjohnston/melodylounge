/*var myPlaylistsContainer = document.querySelector("#my-playlists-container");
var playlistsTab = document.querySelector("#playlists-tab");
var songsInPlaylistTab = document.querySelector("#songs-in-playlist-tab");

fetch(`/get_playlists_by_user/${USERNAME}`).then(response => response.text()).then(result => {
    console.log(result);

    console.log(GetPlaylistHTML(result))

    var playlistHTMLReturnValues = GetPlaylistHTML(result);
    playlistHTMLReturnValues.forEach(HTMLreturnValue => {
        myPlaylistsContainer.innerHTML += HTMLreturnValue;
    });
})

function addSongToPlaylist(songID, playlistID) {
    console.log(songID, playlistID)
    fetch("add_song_to_playlist", {
        method: "POST",
        body: JSON.stringify({
            "song_id": songID,
            "playlist_id": playlistID
        }),
        headers: {
            "X-CSRFToken": CSRF_TOKEN
        }
    }).then(response => response.text()).then(result => {
        updatePlaylistsByUser()
    });
}

function show_songs_in_playlist(id, playlistTitle) {
    
    songsInPlaylistTab.innerHTML = `<h1>${playlistTitle}</h1>`
    
    fetch(`get_song_by_playlist_id/${id}`).then(response => response.text()).then(result => {
        showTab("songs-in-playlist-tab");
        var htmlValues = GetSongsHTML(result);

        htmlValues.forEach(htmlValue => {
            songsDispaly.innerHTML += htmlValue
        });
    });
}*/

console.log("playlist.js loaded")
var myPlaylistsContainer = document.querySelector("#my-playlists-container");
var myPlaylists = {};

var newPlaylistForm = document.querySelector("#new-playlist-form");
newPlaylistForm.addEventListener("submit", newPlaylist)
function newPlaylist(ev) {
    ev.preventDefault();
    var title = ev.target["title"].value;

    fetch("new_playlist", {
        method: "post",
        body: JSON.stringify({
            "title": title
        })
    }).then(response => response.text()).then(result => {
        updatePlaylistList()
    })
}

function updatePlaylistList() {
    fetch(`get_playlists_by_user/${USERNAME}`).then(response => response.json()).then(result => {
        console.log(result)

        myPlaylistsContainer.innerHTML = GetPlaylistHTML(result)
        myPlaylists = result;
    });
}

var renamePlaylistForm; // Will be assigned after the form is created in viewSongsInPlaylist()
function renamePlaylist(ev) {
    ev.preventDefault()
    var playlistID = ev.target["playlist_id"].value
    var newName = ev.target["new_name"].value
    
    fetch("rename_playlist", {
        method: "post",
        body: JSON.stringify({
            "playlist_id": playlistID,
            "new_name": newName
        })
    }).then(response => response.text()).then(result => {
        console.log(result)
    })
}

function deletePlaylist(playlistID) {
    fetch("delete_playlist", {
        method: "post", 
        body: JSON.stringify({ "playlist_id": playlistID })
    }).then(response => response.text()).then(result => {
        console.log(result)
        showTab("playlists-tab")
    })
}

function viewSongsInPlaylist(playlistID, playlistName) {
    showTab("songs-in-playlist-tab");
    fetch(`get_songs_by_playlist_id/${playlistID}`).then(response => response.json()).then(result => {
        SONGS_DISPLAY.innerHTML = 
        `
        <form class="position-relative" id="rename-playlist-form">
            <input hidden name="playlist_id" value="${playlistID}">
            <input class="edit-playlist-title-input" name="new_name" value="${playlistName}"> <input type="submit" value="Edit Title"> <hr>
        </form>

        <button onclick="deletePlaylist(${playlistID})" class="btn btn-danger">Delete Playlist</button> <br> <br>
        ` + getSongsHTML(result, playlistID, playlistName)

        renamePlaylistForm = document.querySelector("#rename-playlist-form");
        renamePlaylistForm.addEventListener("submit", renamePlaylist)
    });
}

function removeSongFromPlaylist(removePlaylistID, songID, removeSongPlaylistName) {
    console.log(`playlistID: ${removePlaylistID} and songID is ${songID}`)
    
    fetch(`/remove_song_from_playlist`, {
        method: "post",
        body: JSON.stringify({
            "song_id": songID,
            "playlist_id": removePlaylistID
        })
    }).then(response => response.text()).then(result => {
        // viewSongsInPlaylist(removePlaylistID, removeSongPlaylistName)
        document.querySelector(`#song-${songID}`).remove() // Remove this one element instead of refreshing the entire songs view
    })
}

function addSongToPlaylist(playlistID, songID) {
    console.log(`playlistID: ${playlistID} and songID is ${songID}`)

    fetch(`/add_song_to_playlist`, {
        method: "post",
        body: JSON.stringify({
            "song_id": songID,
            "playlist_id": playlistID
        })
    })
}

updatePlaylistList();