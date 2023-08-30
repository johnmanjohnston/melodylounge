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
const myPlaylistsContainer = document.querySelector("#my-playlists-container");

function updatePlaylistList() {
    fetch(`get_playlists_by_user/${USERNAME}`).then(response => response.json()).then(result => {
        console.log(result)

        myPlaylistsContainer.innerHTML = GetPlaylistHTML(result)
    });
}

updatePlaylistList();