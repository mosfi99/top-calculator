/*
TODO:
- Prevent overflow for all numbers on display
- Handle division by 0
- Implement decimals functionality.
- After a result with equals, pressing a new digit should clear the result and start a new calculation instead of appending the digit to the existing result. 
*/

// DOM elements
const elements = {
	previousDisplay: document.querySelector('.previous-display'),
	currentDisplay: document.querySelector('.current-display'),
	operatorDisplay: document.querySelector('.operator-display'),
	resultDisplay: document.querySelector('.result'),
	numBtns: document.querySelectorAll('.btn-number'),
	operatorBtns: document.querySelectorAll('.btn-operator'),
	clearBtn: document.querySelector('.btn-clear'),
	delBtn: document.querySelector('.btn-delete'),
	equalsBtn: document.querySelector('.btn-equals'),
};

// State management
const calculator = {
	currentInput: '',
	firstOperand: null,
	operator: null,
	waitingForSecondOperand: false,
	result: '',
};

// Global variables
let result = null;

// Display functions
function updateDisplay() {
	elements.previousDisplay.textContent = calculator.firstOperand;
	elements.operatorDisplay.textContent = calculator.operator;
	elements.currentDisplay.textContent = calculator.currentInput;
	elements.resultDisplay.textContent = calculator.result;
}

function appendDigit(digit) {
	// Only append digits if there is no result
	if (calculator.result === '') {
		// Check if we are waiting for the user to set the second value
		if (calculator.waitingForSecondOperand) {
			calculator.currentInput = digit;
			calculator.waitingForSecondOperand = false;
		} else {
			calculator.currentInput += digit; // User enters digits
		}
		updateDisplay();
	}
}

function setOperator(op) {
	if (calculator.result) {
		calculator.firstOperand = result;
		calculator.operator = op;
		calculator.result = '';
		calculator.currentInput = '';
		updateDisplay();
		return;
	}
	// If first number is set and there is an operator, but the next number is not set yet:
	if (calculator.operator && calculator.waitingForSecondOperand) {
		// Change the operator before typing second operand
		calculator.operator = op;
		updateDisplay();
		return;
	}

	// If current is not empty AND firstOperand has not being set yet:
	if (calculator.currentInput !== '' && calculator.firstOperand === null) {
		// set first operand
		calculator.firstOperand = parseFloat(calculator.currentInput);
		calculator.currentInput = '';

		// case where the operator is already set:
	} else if (calculator.operator) {
		result = operate(
			calculator.firstOperand,
			calculator.operator,
			parseFloat(calculator.currentInput)
		);
		result = round(result);
		calculator.result = `= ${result}`;
		calculator.firstOperand = result;
		calculator.currentInput = '';
		calculator.result = '';
	}

	calculator.operator = op; // set the operator
	calculator.waitingForSecondOperand = true;
	updateDisplay();
}

function getResult() {
	if (
		calculator.operator &&
		calculator.firstOperand !== null &&
		calculator.currentInput !== ''
	) {
		result = operate(
			calculator.firstOperand,
			calculator.operator,
			parseFloat(calculator.currentInput)
		);
		result = round(result);
		calculator.result = `= ${result}`;
		calculator.waitingForSecondOperand = true;
		updateDisplay();
	}
}

function round(num) {
	return Math.round(num * 100) / 100;
}

function deleteLastDigit() {
	if (!calculator.result) {
		calculator.currentInput = calculator.currentInput.slice(0, -1);
		updateDisplay();
	}
}

function clearDisplay() {
	calculator.currentInput = '';
	calculator.firstOperand = null;
	calculator.operator = null;
	calculator.waitingForSecondOperand = false;
	calculator.result = '';
	updateDisplay();
}

// Event listeners
function initEventListeners() {
	// numbers
	elements.numBtns.forEach((btn) => {
		btn.addEventListener('click', () => appendDigit(btn.textContent));
	});
	// operators
	elements.operatorBtns.forEach((btn) => {
		btn.addEventListener('click', () => setOperator(btn.textContent));
	});
	// clear
	elements.clearBtn.addEventListener('click', clearDisplay);
	// delete
	elements.delBtn.addEventListener('click', deleteLastDigit);
	// equals
	elements.equalsBtn.addEventListener('click', getResult);
}

// Calculation Logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, operator, b) => {
	switch (operator) {
		case '+':
			return add(a, b);
		case '-':
			return subtract(a, b);
		case '÷':
			return divide(a, b);
		case '×':
			return multiply(a, b);
		default:
			return 'ERROR';
	}
};

// Initialization
function init() {
	updateDisplay();
	initEventListeners();
}

init();
