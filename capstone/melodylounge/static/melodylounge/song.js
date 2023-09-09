const SONGS_DISPLAY = document.querySelector("#songs-display")

console.log("song.js loaded")
var songQueue = ""

function getUsersHTML(usersJSON) {
    console.log("getUsersHTML called")
    var htmlReturnValue = '';

    usersJSON.forEach(userData => {
        htmlReturnValue +=
        `
            <div class='song-display-container'>
                <span class="song-display-author" onclick='showProfile("${userData.username}")'>${userData.username}</span> - ${userData.songs_released} song(s)
            </div>
        `;
    });

    if (htmlReturnValue == '') { htmlReturnValue = "No results. <br>" }
    return htmlReturnValue;
}

function getSongsHTML(songsJSON, removePlaylistID=-1, removeSongPlaylistName="", targetSongsQueue = null) {
    var htmlReturnValue = "";

    songsJSON.forEach(songData => {
        var author = songData.author.username;
        var title = songData.title;
        var formattedTitle = title;
        var id = songData.id;

        htmlReturnValue += 
        `
        <div class="song-display-container" id="song-${id}">
        
        <div style='overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: calc(90% - 30vw);'>
         <span class="song-display-author" onclick="showProfile('${author}')">
            ${author}</span>
            - ${formattedTitle} <button class="song-display-play-btn" onclick="playAudio(${id}, '${btoa(targetSongsQueue)}')">▶</button>
        </div>

        ${[0].map(() => { if (removePlaylistID != -1) {return `<div onclick="removeSongFromPlaylist(${removePlaylistID}, ${id}, '${removeSongPlaylistName}')" class="remove-from-playlist-btn">
        -
    </div>`} else return ""})}
        

        <div class="dropdown show">
        <a class="dropdown-toggle add-to-playlist-btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            +
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            ${myPlaylists.map((playlistData) => {return `<div role="button" onclick="addSongToPlaylist(${playlistData.id}, ${id}, '${playlistData.title}')" class="dropdown-item">${playlistData.title}</div>`}).join("")}
        </div>
        </div>

        </div>
        `
    });

    if (htmlReturnValue == '') { htmlReturnValue = "No results. <br>" }
    return htmlReturnValue;
}

function GetPlaylistHTML(playlistJSON) {
    var htmlReturnValue = "";

    playlistJSON.forEach(playlistData => {
        var title = playlistData.title;
        var songCount = playlistData.song_count;
        var playlistID = playlistData.id;

        htmlReturnValue += 
        `
        <div onclick="viewSongsInPlaylist(${playlistID}, '${title}')" class="song-display-container">
            <span>
            ${title}</span>
            - ${songCount} song(s)
        </div>
        `
    });


    return htmlReturnValue;
}

const audioPlayer = document.querySelector("#audio-player");
const currentlyPlayling = document.querySelector("#currently-playing");

async function playAudio(songID, targetSongQueue = null) {
    if (targetSongQueue != null) {
        songQueue = targetSongQueue;

        const parsedSongQueue = JSON.parse(atob(songQueue));
        
        audioPlayer.addEventListener("ended", (ev) => {
            for (var i = 0; i < songQueue.length; i++) {
                console.log(`comparing song id of ${songID} and ${parsedSongQueue[i].id}`)
                if (songID == parsedSongQueue[i].id) {
                    playAudio(parsedSongQueue[(i + 1) % parsedSongQueue.length]["id"], songQueue);
                    break;
                }
            }
        });
    }

    audioPlayer.setAttribute("src", `/media/songs/${songID}.wav`);
    audioPlayer.dataset.song_id = songID;
    await audioPlayer.play();


    fetch(`get_song_data_by_id/${songID}`).then(response => response.json()).then(result => {
        currentlyPlayling.innerHTML = `<div class="w-50;">${getSongsHTML(result)}</div>`
    });
}

function showRandomSongs() {
    fetch("random_songs").then(response => response.json()).then(result => {
        SONGS_DISPLAY.innerHTML = getSongsHTML(result);
    });
}