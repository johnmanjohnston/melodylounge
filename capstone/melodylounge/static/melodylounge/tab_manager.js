console.log("tab_manager.js loaded")

var tabs = ["search-tab", "playlists-tab", "profile-tab", "songs-in-playlist-tab", "home-tab"]

if (window.location.pathname == "/") {
    var navbarBrandBtn = document.querySelector("#navbar-brand-btn");
    navbarBrandBtn.setAttribute("href", "#");
    navbarBrandBtn.setAttribute("onclick", "showTab('home-tab')")
}

function hideAllTabs() {
    tabs.forEach(tab => {
        document.querySelector(`#${tab}`).style.display = "none";
    });
}

function showTab(tabName) {
    updatePlaylistList();
    SONGS_DISPLAY.innerHTML = "";

    tabs.forEach(tab => {
        document.querySelector(`#${tab}`).style.display = "none";
    });

    document.querySelector(`#${tabName}`).style.display = "block";
}

hideAllTabs();
showTab("home-tab");