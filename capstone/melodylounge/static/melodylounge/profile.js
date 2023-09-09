console.log("profile.js loaded")
const profileNameDisplay = document.querySelector("#profile-name");

function showProfile(username) {
    showTab("profile-tab");

    if (username == USERNAME) {
        profileNameDisplay.innerHTML = "My Profile"
    } else {
        profileNameDisplay.innerHTML = `${username}'s profile`
    }

    fetch(`songs_by_author/${username}`).then(response => response.json()).then(result => {
        SONGS_DISPLAY.innerHTML = getSongsHTML(result)
    });
}