const incrementButton = document.getElementsByClassName('increment');
const decrementButton = document.getElementsByClassName('decrement');
const elonMoneyText = document.querySelector('.elonMoney');
const receiptList = document.querySelector('.receipt-list');

grandTotalArray = [];
elonMoney = 12311400000000;

elonMoneyText.textContent = `Elon's fortune remaining: ${elonMoney}`;

function incrementButtonFun() {
	for (let i = 0; i < incrementButton.length; i++) {
		button = incrementButton[i];

		button.addEventListener('click', function (event) {
			buttonClicked = event.target; // For getting the event action of the user
			productContainer = buttonClicked.parentElement.children[0]; // For product div code

			// Button code for HTML element
			inputElement = buttonClicked.parentElement.children[2];
			inputValue = inputElement.value;
			quantityValue = parseInt(inputValue) + 1;
			inputElement.value = quantityValue;

			//For list quantity value
			quantityValueSpan = productContainer.children[3];

			decButton = buttonClicked.parentElement.children[3];
			if (quantityValue >= 1) {
				decButton.disabled = false;
			} else if (quantityValue === 0) {
				decButton.disabled = true;
			}

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

			incButton = buttonClicked.parentElement.children[3];
			if (grandTotal >= elonMoney) {
				incButton.disabled = true;
			} else {
				incButton.disabled = false;
			}

			elonMoneyLeft = elonMoney - grandTotal;
			elonMoneyText.textContent = `Elon's fortune remaining: ${elonMoneyLeft}`;

			// sub and grand total price code for HTML element
			productContainer.children[2].textContent = `  SubTotal: ${subTotal}`;
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
			productContainer = buttonClicked.parentElement.children[0]; // For product div code

			// Button code for HTML element
			inputElement = buttonClicked.parentElement.children[2];
			inputValue = inputElement.value;
			quantityValue = parseInt(inputValue) - 1;
			inputElement.value = quantityValue;

			// For list quantity value
			// quantityValueSpan = productContainer.children[3];
			// quantityValueSpan.textContent = `x ${quantityValue}`;

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

			incButton = buttonClicked.parentElement.children[3];
			if (grandTotal >= elonMoney) {
				incButton.disabled = true;
			} else {
				incButton.disabled = false;
			}

			elonMoneyLeft = elonMoney - grandTotal;
			elonMoneyText.textContent = `Elon's fortune remaining: ${elonMoneyLeft}`;

			// sub price code for HTML element
			subTotalPrice =
				productContainer.children[2].textContent = `  SubTotal: ${subTotal}`;
			// grand total price code for HTML element
			document.querySelector(
				'.grandTotalText'
			).textContent = `Grand total: ${grandTotal}`;

			// Checking the quantity element
			decButton = buttonClicked.parentElement.children[3];
			if (subTotal >= 1) {
				decButton.disabled = false;
			} else if (subTotal <= 0) {
				decButton.disabled = true;
			}
		});
	}
}

incrementButtonFun();
decrementButtonFun();

