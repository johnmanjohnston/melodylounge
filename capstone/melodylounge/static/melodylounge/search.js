console.log("search.js loaded")

const searchForm = document.querySelector("#search-form");
const songsDispaly = document.querySelector("#songs-display");

searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    songsDispaly.innerHTML = "";

    var searchQuery = ev.target.elements["search_query"].value;
    console.log(searchQuery);

    fetch(`search_songs/${searchQuery}`).then(response => response.json()).then(result => {
        SONGS_DISPLAY.innerHTML = getSongsHTML(result);
    });
})