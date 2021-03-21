const urlParams = new URLSearchParams(window.location.search);

const keyword = urlParams.get("keyword");
const filter = urlParams.get("filter");

const fetchRecipesByName = async (name) => {
    await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then(response => {
        const data = response.data.drinks;
        if(data != null) {
            handleDisplay(data);
        } else {
            handleError();
        }
    });

    
}

const fetchRecipesByIngredient = async (ingredient) => {
    await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(response => {
        const data = response.data.drinks;
        if(data) {
            handleDisplay(data);
        } else {
            handleError();
        }
    });
}

const handleDisplay = (cocktails) => {
    const container = document.querySelector(".container");

    container.insertAdjacentHTML('beforebegin', `
        <div class="back">
            <a href="./index.html"><h1>&larr; Go back</h1></a>
        </div>
    `);

    cocktails.forEach(cocktail => {
        container.insertAdjacentHTML(
        'beforeend',
        `<article class="card">
            <figure>
                <img src="${cocktail.strDrinkThumb}" alt="Classic burger">
            </figure>
            <h2>${cocktail.strDrink}</h2>
            
            <button data-id="${cocktail.idDrink}">Get instructions</button>
        </article>
        `
        );
    });

    
}

const handleError = () => {
    container.insertAdjacentHTML('beforebegin', `
        <div class="back">
            <h1>&larr; Go back</h1>
        </div>
    `);
    document.querySelector(".container").insertAdjacentHTML(
        'afterbegin',
        `<div class="heading">
            <h1 class="errorHeading">404: No cocktails were found</h1>
        </div>
        `
        );
}

// check if url parameters change
if(filter != "name" && filter != "ingredient") {
    alert("invalid filter");
    window.location.href = "./index.html";
} else if(filter == "name") {
    fetchRecipesByName(keyword)
} else if(filter == "ingredient") {
    fetchRecipesByIngredient(keyword);
}

