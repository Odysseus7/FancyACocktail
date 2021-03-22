import {handleError} from './results.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("drinkId");
const container = document.querySelector(".container");

const fetchRecipe = async (id) => {

    await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => {
        const data = response.data.drinks[0];
        if(data != null) {
            handleDisplay(data);
        } else {
            handleError();
        }
    });
    
}

const handleDisplay = cocktail => {
    console.log(cocktail);
    document.title = cocktail.strDrink;

    //Check which ingredients are used, get keys and save corresponding values
    const ingredientKeys = Object.keys(cocktail).filter(key => key.includes("strIngredient") && cocktail[key] != null);
    const measureKeys = ingredientKeys.map(key => key.replace("Ingredient", "Measure"));
    const measures = measureKeys.map(key => cocktail[key].trim());
    const ingredients = ingredientKeys.map(key => cocktail[key]);
    
    // concatenate measure to ingredient
    
    const completeIngredients = measures.map((measure, index) => {
        return measure + " " + ingredients[index];
    });
   
    container.insertAdjacentHTML('afterbegin', `
        <article class="card" data-id=${cocktail.idDrink}>
            <figure>
                <img src="${cocktail.strDrinkThumb}" alt=${cocktail.strDrink}>
            </figure>
            <h2>${cocktail.strDrink}</h2>
            <h3>Ingredients</h3>
            <ul class="ingredients"></ul>
            <p>${cocktail.strInstructions}</p>
        </article> 
    `);

    completeIngredients.forEach(ingredient => {
        document.querySelector(".ingredients").insertAdjacentHTML('afterbegin',
    `<li>${ingredient}</li>`);
    })
    
}

window.onload = fetchRecipe(id);