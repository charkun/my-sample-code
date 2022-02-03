const incrementButton = document.getElementsByClassName('increment');
const decrementButton = document.getElementsByClassName('decrement');

grandTotalArray = [];

function incrementButtonFun() {
	for (let i = 0; i < incrementButton.length; i++) {
		button = incrementButton[i];

		button.addEventListener('click', function (event) {
			buttonClicked = event.target; // For getting the event action of the user

			// Button code for HTML element
			inputElement = buttonClicked.parentElement.children[2];
			inputValue = inputElement.value;
			quantityValue = parseInt(inputValue) + 1;
			checkDecrementButton();
			inputElement.value = quantityValue;

			productContainer = buttonClicked.parentElement.children[0]; // For product div code

			// Pricing code for HTML element
			productPrice = productContainer.children[1];
			productPriceTxtContent = productPrice.textContent
				.replace('₱', '')
				.replace(',', '');

			productPriceNumber = parseInt(productPriceTxtContent); // This variable can now perform arithmetic operations
			subTotal = productPriceNumber * quantityValue;

			// For adding all the elements in an array
			grandTotalArray.push(productPriceNumber);

			// Getting all the sum from an array
			const grandTotal = grandTotalArray.reduce(
				(previousValue, currentValue) => previousValue + currentValue,
				0
			);

			// sub and grand total price code for HTML element
			subTotalPrice =
				productContainer.children[2].textContent = `  Total price: ${subTotal}`;
			document.querySelector(
				'.grandTotalText'
			).textContent = `Grand total: ${grandTotal}`;
		});
	}
}

function decrementButtonFun() {
	for (let i = 0; i < decrementButton.length; i++) {
		button = decrementButton[i];
		button.disabled = true;

		button.addEventListener('click', function (event) {
			buttonClicked = event.target; // For getting the event action of the user

			// Button code for HTML element
			inputElement = buttonClicked.parentElement.children[2];
			inputValue = inputElement.value;
			quantityValue = parseInt(inputValue) - 1;
			checkDecrementButton();
			inputElement.value = quantityValue;

			productContainer = buttonClicked.parentElement.children[0]; // For product div code

			// Pricing code for HTML element
			productPrice = productContainer.children[1];
			productPriceTxtContent = productPrice.textContent
				.replace('₱', '')
				.replace(',', '');

			productPriceNumber = parseInt(productPriceTxtContent); // This variable can now perform arithmetic operations
			subTotal = productPriceNumber * quantityValue;

			// Removing the specific values of an array
			const index = grandTotalArray.indexOf(productPriceNumber);
			if (index > -1) {
				grandTotalArray.splice(index, 1); // 2nd parameter means remove one item only
			}

			// Getting all the sum from an array
			const grandTotal = grandTotalArray.reduce(
				(previousValue, currentValue) => previousValue + currentValue,
				0
			);

			// sub price code for HTML element
			subTotalPrice =
				productContainer.children[2].textContent = `  Total price: ${subTotal}`;

			// grand total price code for HTML element
			document.querySelector(
				'.grandTotalText'
			).textContent = `Grand total: ${grandTotal}`;
		});
	}
}

function checkDecrementButton() {
	for (let i = 0; i < decrementButton.length; i++) {
		button = decrementButton[i];

		// button.addEventListener('click', function (event) {
		// 	buttonClicked = event.target;

		// 	if (quantityValue >= 1) {
		// 		decrementButton[i].disabled = false;
		// 	}
		// });
	}
}

incrementButtonFun();
decrementButtonFun();
