const SONGS_DISPLAY = document.querySelector("#songs-display")

/*var usersPlaylists = {};

function updatePlaylistsByUser() {
    fetch(`get_playlists_by_user/${USERNAME}`).then(response => response.json()).then(result => {
        usersPlaylists = result;
    });
}
updatePlaylistsByUser();

function GetSongsHTML(songsJSON) {
    console.log("logging users playlists")
    console.log(usersPlaylists)
    songsJSON = JSON.parse(songsJSON);
    var htmlReturnValueList = [];

    songsJSON.forEach(songData => {
        var author = songData.author.username;
        var title = songData.title;
        var id = songData.id;
        var explicit = songData.explicit;
        
        var formattedTitle = title;
        if (explicit) {
            formattedTitle += 
            `
                <svg style="transform: scale(.6);" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" fill="#5A5A5A"/>
                <path d="M15.1748 11.57V14.694H20.2128V17.598H15.1748V20.986H20.8728V24H11.4128V8.556H20.8728V11.57H15.1748Z" fill="#E8E8E8"/>
                </svg>
            `
        }

        var htmlValue = 
        `<div class="song-display-container">
            <span class="song-display-author" onclick="showProfile('${author}')">
            ${author}</span>
            - ${formattedTitle} <button class="song-display-play-btn" onclick="playAudio(${id})">▶</button>

            <div class="dropdown" style="display: inline-block; float: right; margin-right: 10px;">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Add to Playlist
                </a>
            
                <ul class="dropdown-menu">
                    ${usersPlaylists.map(curPlaylist => `<li><div onclick="addSongToPlaylist(${id}, ${curPlaylist.id})" data-song-id="${id}" data-playlist-id="${curPlaylist.id}" class="dropdown-item cursor-pointer">${curPlaylist.title}</div></li>`).join("")}
                </ul>
          </div>

        </div>`


        htmlReturnValueList.push(htmlValue);
    });

    return htmlReturnValueList
}

function GetPlaylistHTML(playlistJSON) {
    playlistJSON = JSON.parse(playlistJSON);

    var htmlReturnValue = [];

    playlistJSON.forEach(playlist => {
        var title = playlist.title;
        var songCount = playlist.song_count;
        var id = playlist.id;

        var htmlValue = 
        `
            <div onclick="show_songs_in_playlist(${id}, '${title}')" class="playlist-container"><strong>${title}</strong>, ${songCount} song(s)</div>
        `

        htmlReturnValue.push(htmlValue);
    });

    return htmlReturnValue
}

const audioPlayer = document.querySelector("#audio-player");
function playAudio(id) {
    audioPlayer.setAttribute("src", `media/songs/${id}.wav`);
    audioPlayer.dataset.song_id = id
    audioPlayer.play();
}*/

console.log("song.js loaded")

function getSongsHTML(songsJSON, removePlaylistID=-1, removeSongPlaylistName="") {
    var htmlReturnValue = "";

    songsJSON.forEach(songData => {
        var author = songData.author.username;
        var title = songData.title;
        var formattedTitle = title;
        var id = songData.id;

        htmlReturnValue += 
        `
        <div class="song-display-container">
        <span class="song-display-author" onclick="showProfile('${author}')">
        ${author}</span>
        - ${formattedTitle} <button class="song-display-play-btn" onclick="playAudio(${id})">▶</button>
        
        ${[0].map(() => { if (removePlaylistID != -1) {return `<div onclick="removeSongFromPlaylist(${removePlaylistID}, ${id}, '${removeSongPlaylistName}')" class="remove-from-playlist-btn">
        -
    </div>`} else return ""})}
        

        <div class="dropdown show">
        <a class="dropdown-toggle add-to-playlist-btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            +
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            ${myPlaylists.map((playlistData) => {return `<div role="button" onclick="addSongToPlaylist(${playlistData.id}, ${id})" class="dropdown-item">${playlistData.title}</div>`}).join("")}
        </div>
        </div>

        </div>
        `
    });

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

const audioPlayer = document.querySelector("#audio-player")
function playAudio(songID) {
    audioPlayer.setAttribute("src", `/media/songs/${songID}.wav`);
    audioPlayer.dataset.song_id = songID;
    audioPlayer.play();
}