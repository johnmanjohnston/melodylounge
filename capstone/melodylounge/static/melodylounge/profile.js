const profileName = document.querySelector("#profile-name");

function showProfile(username) {
    fetch(`songs_by_author/${username}`).then(response => response.text()).then(result => {
        showTab("profile-tab");
        profileName.innerHTML = `Profile: ${username}`

        var htmlValues = GetSongsHTML(result);

        htmlValues.forEach(htmlValue => {
            songsDispaly.innerHTML += htmlValue
        });
    });
}