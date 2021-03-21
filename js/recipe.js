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
    container.insertAdjacentHTML('afterbegin', `
        <article class="card" data-id=${cocktail.idDrink}>
            <figure>
                <img src="${cocktail.strDrinkThumb}" alt=${cocktail.strDrink}>
            </figure>
            <h2>${cocktail.strDrink}</h2>
            <p>${cocktail.strInstructions}</p>
        </article> 
    `);
}

window.onload = fetchRecipe(id);