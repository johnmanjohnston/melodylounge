function GetSongsHTML(songsJSON) {
    songsJSON = JSON.parse(songsJSON);
    var htmlReturnValueList = [];

    songsJSON.forEach(songData => {
        var author = songData.author.username;
        var title = songData.title;
        var id = songData.id;

        var htmlValue = `<div>${author} - ${title} - <button onclick="playAudio(${id})">Play</button></div>`
    
        htmlReturnValueList.push(htmlValue);
    });

    return htmlReturnValueList
}

const audioPlayer = document.querySelector("#audio-player");
function playAudio(id) {
    audioPlayer.setAttribute("src", `media/songs/${id}.wav`);
    audioPlayer.dataset.song_id = id
    audioPlayer.play();
}