/*const profileName = document.querySelector("#profile-name");

function showProfile(username) {
    fetch(`songs_by_author/${username}`).then(response => response.text()).then(result => {
        showTab("profile-tab");
        profileName.innerHTML = `Profile: ${username}`

        var htmlValues = GetSongsHTML(result);

        htmlValues.forEach(htmlValue => {
            songsDispaly.innerHTML += htmlValue
        });
    });
}*/

console.log("profile.js loaded")

function showProfile(username) {
    showTab("profile-tab");

    fetch(`songs_by_author/${username}`).then(response => response.json()).then(result => {
        SONGS_DISPLAY.innerHTML = getSongsHTML(result)
    });
}