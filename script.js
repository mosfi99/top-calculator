// DOM elements
const elements = {
	previousDisplay: document.querySelector('.previous-display'),
	currentDisplay: document.querySelector('.current-display'),
	operatorDisplay: document.querySelector('.operator-display'),
	numBtns: document.querySelectorAll('.btn-number'),
	operatorBtns: document.querySelectorAll('.btn-operator'),
	clearBtn: document.querySelector('.btn-clear'),
	delBtn: document.querySelector('.btn-delete'),
	equalsBtn: document.querySelector('.btn-equals'),
};

// State management
const calculator = {
	currentInput: '',
	previousInput: '',
	operator: '',
};

// Display functions
function updateDisplay() {
	elements.previousDisplay.textContent = calculator.previousInput;
	elements.operatorDisplay.textContent = calculator.operator;
	elements.currentDisplay.textContent = calculator.currentInput;
}

function appendNumber(num) {
	calculator.currentInput += num; // User enters digits
	updateDisplay();
}
function setOperator(symbol) {
	// If current is not empty AND previous is not set,
	if (calculator.currentInput !== '' && calculator.previousInput === '') {
		calculator.operator = symbol; // operator can be stored and set.
		calculator.previousInput = calculator.currentInput; // previous stores current.
		calculator.currentInput = ''; // current reset for next input.
	}
	// TODO:
	// If the numbers are set for bot (not empty)
	if (calculator.currentInput !== '' && calculator.previousInput !== '') {
		// next time an operator is clicked it should:
		// first, evaluate the initial pair of numbers (12 + 7),
		// then display the result of that calculation (19).
		// Finally, use that result (19) as the first number in a new calculation, along with the next operator (-).
	}
	updateDisplay();
}

function deleteLastDigit() {
	calculator.currentInput = calculator.currentInput.slice(0, -1);
	updateDisplay();
}

function clearDisplay() {
	calculator.currentInput = '';
	calculator.previousInput = '';
	calculator.operator = '';
	updateDisplay();
}

// Event listeners
function initEventListeners() {
	// number buttons
	elements.numBtns.forEach((btn) => {
		btn.addEventListener('click', () => appendNumber(btn.textContent));
	});
	// clear button
	elements.clearBtn.addEventListener('click', clearDisplay);
	// delete button
	elements.delBtn.addEventListener('click', deleteLastDigit);

	// select operator
	elements.operatorBtns.forEach((btn) => {
		btn.addEventListener('click', () => setOperator(btn.textContent));
	});
}

// Calculation Logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstNumber = null;
let operator = null;
let secondNumber = null;

const operate = (a, operator, b) => {
	switch (operator) {
		case '+':
			return add(a, b);
		case '-':
			return subtract(a, b);
		case '/':
			return divide(a, b);
		case '*':
			return multiply(a, b);
		default:
			return 'OPERATE_ERROR';
	}
};

// Initialization
function init() {
	updateDisplay();
	initEventListeners();
}

init();
