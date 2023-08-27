var tabs = ["search-tab", "playlists-tab"]

function hideAlTabs() {
    tabs.forEach(tab => {
        document.querySelector(`#${tab}`).style.display = "none";
    });
}

function showTab(tabName) {
    tabs.forEach(tab => {
        document.querySelector(`#${tab}`).style.display = "none";
    });

    document.querySelector(`#${tabName}`).style.display = "block";
}

hideAlTabs(); // Don't show any tabs by default