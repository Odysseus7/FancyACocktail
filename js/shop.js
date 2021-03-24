const buttons = document.querySelectorAll(".btn");
const cartlist = document.querySelector(".cartlist");
const totalText = document.querySelector(".total");

const cart = {
	cocktailSet: {
		title: "Cocktail set",
		counter: 0,
		price: 25.99,
		totalCost: 0,
	},
	dryGin: {
		title: "FAC dry gin",
		counter: 0,
		price: 18.5,
		totalCost: 0,
	},
	celebrationDrinks: {
		title: "Celebration drinks",
		counter: 0,
		price: 15.0,
		totalCost: 0,
	},
	mocktails: {
		title: "Mocktails",
		counter: 0,
		price: 12.5,
		totalCost: 0,
	},
};

const handleButtonClick = (event) => {
	//get product id of clicked element and up counter
	const productId = event.target.parentNode.dataset.id;
	cart[productId].counter++;
	cart[productId].totalCost += cart[productId].price;

	let totalCost = 0;

	// update total cost of shopping cart
	Object.keys(cart).forEach((key) => {
		totalCost += cart[key].totalCost;
		totalText.innerHTML = `Total: &euro;${totalCost}`;
	});
};

buttons.forEach((button) => {
	button.addEventListener("click", handleButtonClick);
});

Object.keys(cart).forEach((key) => {
	console.log(key, cart[key]);
	if (cart[key].counter != 0) {
		cartlist.insertAdjacentHTML(
			"beforeend",
			`
        <article class="cartitem">
							<h2>${cart[key].title}</h2>
							<p>${cart[key].counter}x</p>
							<p>&euro;${cart[key.totalCost]}</p>
						</article>
        `
		);
	}
});
