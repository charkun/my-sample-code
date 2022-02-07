const incrementButton = document.getElementsByClassName('increment');
const decrementButton = document.getElementsByClassName('decrement');
const yourMoneyLeftText = document.querySelector('.elonMoney');
const footer = document.querySelector('.footer');

console.log(document.getElementsByClassName('container'));

grandTotalArray = [];
yourMoney = 0;

// According to https://www.investopedia.com/articles/investing/012715/5-richest-people-world.asp
var billionairesList = [
	{
		rank: 1,
		name: 'Elon Musk',
		networth: 1252215450000,
		// Source: https://usd.currencyrate.today/convert/amount-164000000-to-php.html,
	},
	{
		rank: 2,
		name: 'Bernard Arnault',
		networth: 1015170550000,
		// Source: https://usd.currencyrate.today/convert/amount-164000000-to-php.html,
	},
	{
		rank: 3,
		name: 'Jeff Bezos',
		networth: 962037095000000,
		// Source: https://usd.currencyrate.today/convert/amount-164000000-to-php.html,
	},
	{
		rank: 4,
		name: 'Bill Gates',
		networth: 682237340000000,
		// Source: https://usd.currencyrate.today/convert/amount-164000000-to-php.html,
	},
	{
		rank: 5,
		name: 'Larry Page',
		networth: 625555990000000,
		// Source: https://usd.currencyrate.today/convert/amount-164000000-to-php.html,
	},
];

var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'PHP',

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function getSelectedFunc() {
	var getSelected = document.getElementById('billionaires').value;
	console.log(getSelected);
	for (let i = 0; i < billionairesList.length; i++) {
		// console.log(billionairesList[i].name);
		if (getSelected === billionairesList[i].name) {
			// console.log(yourMoney);

			yourMoney = billionairesList[i].networth;

			document.querySelector('.billionaires-info').textContent = `${
				billionairesList[i].name
			} is the no. ${
				billionairesList[i].rank
			} richest person in the world with a networth of ${formatter.format(
				billionairesList[i].networth
			)}. Now go spend!`;

			yourMoneyLeftText.textContent = `${
				billionairesList[i].name
			} fortune remaining: ${formatter.format(yourMoney)}`;

			footer.children[1].textContent = `${
				billionairesList[i].name
			} remaining money ${formatter.format(yourMoney)}`;

			incrementButtonFun();
			decrementButtonFun();
		}
	}
}

function incrementButtonFun() {
	for (let i = 0; i < incrementButton.length; i++) {
		button = incrementButton[i];

		button.addEventListener('click', function (event) {
			buttonClicked = event.target; // For getting the event action of the user
			productContainer = buttonClicked.parentElement.parentElement.children[0]; // For product div code

			// Button code for HTML element
			inputElement = buttonClicked.parentElement.children[1];
			inputValue = inputElement.value;
			quantityValue = parseInt(inputValue) + 1;
			inputElement.value = quantityValue;

			//For list quantity value
			quantityValueSpan = productContainer.children[3];
			quantityValueSpan.textContent = `x ${quantityValue}`;

			decButton = buttonClicked.parentElement.children[2];
			if (quantityValue >= 1) {
				decButton.disabled = false;
			} else if (quantityValue === 0) {
				decButton.disabled = true;
			}

			// Pricing code for HTML element
			productPrice = productContainer.children[2];
			productPriceTxtContent = productPrice.textContent
				.replace('₱', '')
				.replace(',', '')
				.replace(',', '')
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

			incButton = buttonClicked.parentElement.children[0];
			if (grandTotal > yourMoney) {
				incButton.disabled = true;
				alert(
					'Spending amount has already been reached! Choose another billionaire'
				);
			} else {
				incButton.disabled = false;
			}

			yourMoneyLeft = yourMoney - grandTotal;
			yourMoneyLeftText.textContent = `Billionaires fortune remaining: ${formatter.format(
				yourMoneyLeft
			)}`;

			// sub and grand total price code for HTML element
			productContainer.children[4].textContent = ` ${formatter.format(
				subTotal
			)}`;

			document.querySelector(
				'.grandTotalText'
			).textContent = `Grand total: ${formatter.format(grandTotal)}`;

			//  (value/total value)×100%.

			percentageSpent = parseFloat((grandTotal / yourMoney) * 100);

			// For footer event
			// The total budget your spent

			footer.children[0].textContent = `The total budget you spent: ${formatter.format(
				grandTotal
			)}`;

			footer.children[1].textContent = `Billionaires remaining money: ${formatter.format(
				yourMoneyLeft
			)}`;

			footer.children[2].textContent = `You only spent ${percentageSpent} % of the total`;
		});
	}
}

function decrementButtonFun() {
	for (let i = 0; i < decrementButton.length; i++) {
		button = decrementButton[i];
		button.disabled = true;

		button.addEventListener('click', function (event) {
			buttonClicked = event.target; // For getting the event action of the user
			productContainer = buttonClicked.parentElement.parentElement.children[0]; // For product div code
			console.log(productContainer);

			// Button code for HTML element
			inputElement = buttonClicked.parentElement.children[1];
			inputValue = inputElement.value;
			quantityValue = parseInt(inputValue) - 1;
			inputElement.value = quantityValue;

			//For list quantity value
			quantityValueSpan = productContainer.children[3];
			quantityValueSpan.textContent = `x ${quantityValue}`;

			// Pricing code for HTML element
			// productPrice = productContainer.children[2];
			// productPriceTxtContent = productPrice.textContent
			// 	.replace('₱', '')
			// 	.replace(',', '');

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

			incButton = buttonClicked.parentElement.children[1];
			if (grandTotal >= yourMoney) {
				incButton.disabled = true;
			} else {
				incButton.disabled = false;
			}

			yourMoneyLeft = yourMoney - grandTotal;
			yourMoneyLeftText.textContent = `Fortune remaining: ${formatter.format(
				yourMoneyLeft
			)}`;

			// sub price code for HTML element
			subTotalPrice =
				productContainer.children[4].textContent = ` ${formatter.format(
					subTotal
				)}`;
			// grand total price code for HTML element
			document.querySelector(
				'.grandTotalText'
			).textContent = `Grand total: ${formatter.format(grandTotal)}`;

			// Checking the quantity element
			decButton = buttonClicked.parentElement.children[2];
			if (subTotal >= 1) {
				decButton.disabled = false;
			} else if (subTotal <= 0) {
				decButton.disabled = true;
			}
		});
	}
}



