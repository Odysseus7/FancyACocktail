const searchBar = document.querySelector(".searchbar");

const handleSearch = (event) => {
    var letters = /^[A-Za-z]+$/;
    let keyword = event.target.value.toLowerCase();
    const filter = document.querySelector("input[type=radio]:checked").value;

    if(keyword.match(letters)) {
        // if the input is valid, redirect and save search term and filter used.
        window.location.href = `results.html?keyword=${event.target.value}&filter=${filter}`;
    } else {
        alert("invalid input");
    }

}

searchBar.addEventListener("change", handleSearch);