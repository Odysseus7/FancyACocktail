const searchBar = document.querySelector(".searchbar");

const handleSearch = (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		var letters = /^[a-zA-Z\s]*$/;

		let keyword = event.target.value.toLowerCase();
		console.log(keyword);
		const filter = document.querySelector("input[type=radio]:checked").value;

		if (keyword.match(letters)) {
			console.log("heyy");
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
