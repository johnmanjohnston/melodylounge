console.log("search.js loaded")

const searchForm = document.querySelector("#search-form");
const songsDispaly = document.querySelector("#songs-display");

searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    songsDispaly.innerHTML = "";

    var searchQuery = ev.target.elements["search_query"].value;
    console.log(searchQuery);

    fetch(`search_songs/${searchQuery}`).then(response => response.json()).then(result => {
        SONGS_DISPLAY.innerHTML = `<h1>Songs:</h1>` + getSongsHTML(result);
    }).then(() => {
        // After we display songs, display users
        fetch(`search_users/${searchQuery}`).then(response => response.json()).then(result => {
            SONGS_DISPLAY.innerHTML += `<br> <h1>Users:</h1>`
            SONGS_DISPLAY.innerHTML += getUsersHTML(result)
        });
    });
})