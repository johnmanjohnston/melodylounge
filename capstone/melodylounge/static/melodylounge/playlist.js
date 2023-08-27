var myPlaylistsContainer = document.querySelector("#my-playlists-container");

fetch(`/get_playlists_by_user/${USERNAME}`).then(response => response.text()).then(result => {
    console.log(result);

    console.log(GetPlaylistHTML(result))

    var playlistHTMLReturnValues = GetPlaylistHTML(result);
    playlistHTMLReturnValues.forEach(HTMLreturnValue => {
        myPlaylistsContainer.innerHTML += HTMLreturnValue;
    });
})