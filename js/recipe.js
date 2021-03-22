import { handleError } from "./results.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("drinkId");
const keyword = urlParams.get("keyword");
const filter = urlParams.get("filter");

const container = document.querySelector(".container");

const fetchRecipe = async (id) => {
	await axios
		.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
		.then((response) => {
			const data = response.data.drinks[0];
			if (data != null) {
				handleDisplay(data);
			} else {
				handleError();
			}
		});
};

const handleDisplay = (cocktail) => {
	document.title = cocktail.strDrink;
	container.insertAdjacentHTML(
		"beforebegin",
		`
        <div class="back">
            <a href="./results.html?keyword=${keyword}&filter=${filter}"><h1>&larr; Go back</h1></a>
        </div>
    `
	);

	//Check which ingredients are used, get keys and save corresponding values
	const ingredientKeys = Object.keys(cocktail).filter(
		(key) => key.includes("strIngredient") && cocktail[key]
	);

	const measureKeys = Object.keys(cocktail).filter(
		(key) => key.includes("strMeasure") && cocktail[key]
	);

	const measures = measureKeys.map((key) => cocktail[key].trim());
	const ingredients = ingredientKeys.map((key) => cocktail[key]);

	// concatenate measure to ingredient

	const completeIngredients = measures.map((measure, index) => {
		return measure + " " + ingredients[index];
	});

	container.insertAdjacentHTML(
		"afterbegin",
		`
        <article class="card" data-id=${cocktail.idDrink}>
            <figure>
                <img src="${cocktail.strDrinkThumb}" alt=${cocktail.strDrink}>
            </figure>
            <h2>${cocktail.strDrink}</h2>
            <h3>Ingredients</h3>
            <ol class="ingredients"></ol>
            <p>${cocktail.strInstructions}</p>
        </article> 
    `
	);

	completeIngredients.forEach((ingredient) => {
		document
			.querySelector(".ingredients")
			.insertAdjacentHTML("beforeend", `<li>${ingredient}</li>`);
	});
};

window.onload = fetchRecipe(id);
