console.log("search.js loaded")

const searchForm = document.querySelector("#search-form");
const songsDispaly = document.querySelector("#songs-display");

searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    songsDispaly.innerHTML = "";

    var searchQuery = ev.target.elements["search_query"].value;
    console.log(searchQuery);

    fetch(`search_songs/${searchQuery}`).then(response => response.text()).then(result => {
        console.log(result)
        
        var htmlValues = GetSongsHTML(result);

        console.log(htmlValues)

        if (htmlValues.length === 0) {
            songsDispaly.innerHTML = "No songs"
        }

        htmlValues.forEach(htmlValue => {
            songsDispaly.innerHTML += htmlValue;
        });
    });
    
    /*
    fetch(`all_songs`).then(response => response.text()).then(result => {
        console.log(GetSongsHTML(result))
    });
    */

})