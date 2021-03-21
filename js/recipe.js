import {handleError} from './results.js';

const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("drinkId");

const fetchRecipe = async (id) => {
    await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`)
    .then(response => {
        const data = response.data.drinks;
        if(data != null) {
            handleDisplay(data);
        } else {
            handleError();
        }
    });
    
}