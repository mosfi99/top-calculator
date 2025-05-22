/*
TODO:
- Handle division by 0
*/

// DOM elements
const elements = {
	firstOperandDisplay: document.querySelector('.first-operand-display'),
	currentDisplay: document.querySelector('.current-display'),
	operatorDisplay: document.querySelector('.operator-display'),
	resultDisplay: document.querySelector('.result-display'),
	numBtns: document.querySelectorAll('.btn-number'),
	operatorBtns: document.querySelectorAll('.btn-operator'),
	clearBtn: document.querySelector('.btn-clear'),
	delBtn: document.querySelector('.btn-delete'),
	equalsBtn: document.querySelector('.btn-equals'),
	equalsDisplay: document.querySelector('.equals-display'),
	decimal: document.querySelector('.btn-decimal'),
};

// State management
const calculator = {
	currentInput: '',
	firstOperand: null,
	operator: null,
	waitingForSecondOperand: false,
	equals: '',
	result: '',
};

// Global variables
let result = null;

// Display functions
function updateDisplay() {
	elements.firstOperandDisplay.textContent = calculator.firstOperand;
	elements.operatorDisplay.textContent = calculator.operator;
	elements.currentDisplay.textContent = calculator.currentInput;
	elements.resultDisplay.textContent = calculator.result;
	elements.equalsDisplay.textContent = calculator.equals;
}

function appendDigit(digit) {
	if (calculator.result !== '') {
		clearValues();
	}

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

function appendDecimal() {
	if (!calculator.currentInput.includes('.')) {
		calculator.currentInput += '.';
		updateDisplay();
	}
}

function setOperator(op) {
	if (calculator.result) {
		clearValues();
		calculator.firstOperand = result;
		calculator.operator = op;
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
		calculator.result = `${result}`;
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
		calculator.result = `${result}`;
		calculator.equals = '=';
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

function clearValues() {
	calculator.currentInput = '';
	calculator.firstOperand = null;
	calculator.operator = null;
	calculator.waitingForSecondOperand = false;
	calculator.equals = '';
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
	elements.clearBtn.addEventListener('click', clearValues);
	// delete
	elements.delBtn.addEventListener('click', deleteLastDigit);
	// equals
	elements.equalsBtn.addEventListener('click', getResult);
	// decimals
	elements.decimal.addEventListener('click', appendDecimal);
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
