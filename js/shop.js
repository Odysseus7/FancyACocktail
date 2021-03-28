const buttons = document.querySelectorAll(".btn");
const proceedButton = document.querySelector(".btn-proceed");
const cartlist = document.querySelector(".cart");
const totalText = document.querySelector(".total-heading");

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

	Object.keys(cart).forEach((key) => {
		// update total cost of shopping cart
		totalCost += cart[key].totalCost;
		totalText.innerHTML = `Total: &euro;${totalCost.toFixed(2)}`;

		// if the product is not in the cart yet, and the products counter does not equal zero, add it.
		if (!document.querySelector(`.${key}`) && cart[key].counter != 0) {
			cartlist.insertAdjacentHTML(
				"beforeend",
				`
                    <ul class="cartitem ${key}">
                                        <li>${cart[key].title}</li>
                                        <li>${cart[key].counter}x</li>
                                        <li>&euro;${cart[key].totalCost.toFixed(
																					2
																				)}</li>
                                    </ul>
                    `
			);
		} else if (document.querySelector(`.${key}`) && cart[key].counter >= 0) {
			/* Generate cart values and price*/
			const cartItem = document.querySelector(`.${key}`);
			cartItem.childNodes[3].innerHTML = `${cart[key].counter}x`;
			cartItem.childNodes[5].innerHTML = `${cart[key].totalCost.toFixed(2)}`;
		}
	});
};

buttons.forEach((button) => {
	button.addEventListener("click", handleButtonClick);
});

proceedButton.addEventListener("click", () => {
	if (!document.querySelector(".cartitem")) {
		alert("Can't proceed with an empty cart!");
	} else {
		alert(
			`Order placed. Your order number is ${Math.round(Math.random() * 2000)}.`
		);
	}
});
