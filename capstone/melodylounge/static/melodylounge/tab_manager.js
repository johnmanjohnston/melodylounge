console.log("tab_manager.js loaded")

var tabs = ["search-tab", "playlists-tab", "profile-tab", "songs-in-playlist-tab"]

function hideAlTabs() {
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

hideAlTabs(); // Don't show any tabs by default