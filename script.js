// DOM elements
const elements = {
	display: document.querySelector('.text'),
	numBtns: document.querySelectorAll('.btn-number'),
	operatorBtns: document.querySelectorAll('.btn-operator'),
	clearBtn: document.querySelector('.btn-clear'),
	delBtn: document.querySelector('.btn-delete'),
	equalsBtn: document.querySelector('.btn-equals'),
};

// State management
const calculator = {
	currentInput: '',
};

// Display functions
function updateDisplay() {
	elements.display.textContent = calculator.currentInput;
}

function appendNumber(num) {
	calculator.currentInput += num;
	updateDisplay();
}

function clearDisplay() {
	calculator.currentInput = '';
	updateDisplay();
}

// todo2: create a delete function for deleteBtn where the last digit is removed

// Event listeners
// todo1: create a initEventListeners function with all event listeners inside
elements.numBtns.forEach((btn) => {
	btn.addEventListener('click', () => appendNumber(btn.textContent));
});

elements.clearBtn.addEventListener('click', clearDisplay);

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
