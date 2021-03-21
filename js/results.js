// import axios from 'axios';

const urlParams = new URLSearchParams(window.location.search);

const keyword = urlParams.get("keyword");
const filter = urlParams.get("filter");

const fetchRecipesByName = async (name) => {
    await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then(response => {
        const data = response.data.drinks;
        if(data) {
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
        
    });
}

const handleDisplay = (data) => {
    console.log(data)
}

const handleError = () => {
    
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

