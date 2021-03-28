const searchBar = document.querySelector(".searchbar");

const handleSearch = (event) => {
	if (event.key === "Enter") {
		var letters = /^[a-zA-Z\s]*$/;

		let keyword = event.target.value.toLowerCase();
		const filter = document.querySelector("input[type=radio]:checked").value;

		if (keyword.match(letters)) {
			// if the input is valid, redirect and save search term and filter used.
			window.location.href = `results.html?keyword=${event.target.value}&filter=${filter}`;
			searchBar.value = "";
		} else {
			alert("invalid input");
		}
	}
};

window.onload = () => {
	searchBar.addEventListener("keypress", handleSearch);
};
