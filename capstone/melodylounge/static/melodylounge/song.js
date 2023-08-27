function GetSongsHTML(songsJSON) {
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
            <span class="song-display-author" onclick="showProfile('${author}')">${author}</span> - ${formattedTitle} <button class="song-display-play-btn" onclick="playAudio(${id})">▶</button>
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

        var htmlValue = 
        `
            <div class="playlist-container"><strong>${title}</strong>, ${songCount} song(s)</div>
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
}