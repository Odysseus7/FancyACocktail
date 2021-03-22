const urlParams = new URLSearchParams(window.location.search);

const keyword = urlParams.get("keyword");
const filter = urlParams.get("filter");
const container = document.querySelector(".container");

const fetchRecipesByName = async (name) => {
	await axios
		.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
		.then((response) => {
			const data = response.data.drinks;
			if (data != null) {
				document.title = name;
				handleDisplay(data);
			} else {
				handleError();
			}
		});
};

const fetchRecipesByIngredient = async (ingredient) => {
	await axios
		.get(
			`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
		)
		.then((response) => {
			const data = response.data.drinks;
			if (data) {
				handleDisplay(data);
			} else {
				handleError();
			}
		});
};

const handleDisplay = (cocktails) => {
	container.insertAdjacentHTML(
		"beforebegin",
		`
        <div class="back">
            <a href="./index.html"><h1>&larr; Go back</h1></a>
        </div>
    `
	);

	cocktails.forEach((cocktail) => {
		container.insertAdjacentHTML(
			"beforeend",
			`<article class="card" data-id=${cocktail.idDrink}>
            <figure>
                <img src="${cocktail.strDrinkThumb}" alt=${cocktail.strDrink}>
            </figure>
            <h2>${cocktail.strDrink}</h2>
            
            <button class="btn">Get instructions</button>
        </article>
        `
		);
	});

	document.querySelectorAll(".btn").forEach((button) => {
		button.addEventListener("click", () => {
			window.location.href = `./../recipe.html?drinkId=${button.parentNode.dataset.id}&keyword=${keyword}&filter=${filter}`;
		});
	});
};

export const handleError = () => {
	container.insertAdjacentHTML(
		"beforebegin",
		`
        <div class="back">
            <a href="./index.html"><h1>&larr; Go back</h1><a href="./index.html">
        </div>
    `
	);

	document.querySelector(".container").insertAdjacentHTML(
		"afterbegin",
		`<div class="heading">
            <h1 class="errorHeading">404: No cocktails were found</h1>
        </div>
        `
	);
};

window.onload = () => {
	// check if url parameters change
	if (
		filter != "name" &&
		filter != "ingredient" &&
		window.location.href == "./results.html"
	) {
		alert("invalid filter");
		window.location.href = "./index.html";
	} else if (filter == "name") {
		fetchRecipesByName(keyword);
	} else if (filter == "ingredient") {
		fetchRecipesByIngredient(keyword);
	}
};
