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
	previousInput: '',
	operator: '',
	hasFirstInput: false,
	hasSecondInput: false,
	result: '',
};

// Operation variables
let firstNumber = null;
let operator = null;
let secondNumber = null;

// Display functions
function updateDisplay() {
	elements.previousDisplay.textContent = calculator.previousInput;
	elements.operatorDisplay.textContent = calculator.operator;
	elements.currentDisplay.textContent = calculator.currentInput;
	elements.resultDisplay.textContent = calculator.result;
}

function appendNumber(num) {
	calculator.currentInput += num; // User enters digits
	updateDisplay();
}

function setOperator(symbol) {
	// If current is not empty AND second is not set
	if (calculator.currentInput !== '' && calculator.previousInput === '') {
		// operator can be stored and set.
		calculator.operator = symbol;
		// previous stores first number.
		calculator.previousInput = calculator.currentInput;
		// current is reset for next input.
		calculator.currentInput = '';
		// First number is set
		firstNumber = Number(calculator.previousInput);
		calculator.hasFirstInput = true;
		state(); // debugging
	}
	// If first number is set and there is an operator, but the next number is not set yet:
	if (calculator.operator && calculator.currentInput === '') {
		calculator.operator = symbol; // change the operator.
	}
	updateDisplay();
}

function getResult() {
	// maybe i could join this if with the next one just by checking:  calculator.currentInput !== '' and there is no need fot the second input boolean
	if (calculator.hasFirstInput && calculator.currentInput !== '') {
		secondNumber = Number(calculator.currentInput);
		calculator.hasSecondInput = true;
	}

	if (calculator.hasFirstInput && calculator.hasSecondInput) {
		operator = calculator.operator;
		// next time an operator is clicked it should:
		// first, evaluate the initial pair of numbers (12 + 7),
		const result = operate(firstNumber, operator, secondNumber);
		// then display the result of that calculation (19).
		calculator.result = `= ${result}`;
		// TODO:
		// Finally, use that result (19) as the first number in a new calculation, along with the next operator (-).
	}
	updateDisplay();
}

// still need to make decimal functionality

function deleteLastDigit() {
	if (!calculator.result){
		calculator.currentInput = calculator.currentInput.slice(0, -1);
		updateDisplay();
	}
}

function clearDisplay() {
	calculator.currentInput = '';
	calculator.previousInput = '';
	calculator.operator = '';
	calculator.result = '';
	firstNumber = null;
	secondNumber = null;
	updateDisplay();
	state();
}

// Event listeners
function initEventListeners() {
	// number buttons
	elements.numBtns.forEach((btn) => {
		btn.addEventListener('click', () => appendNumber(btn.textContent));
	});
	// select operator
	elements.operatorBtns.forEach((btn) => {
		btn.addEventListener('click', () => setOperator(btn.textContent));
	});
	// clear button
	elements.clearBtn.addEventListener('click', clearDisplay);
	// delete button
	elements.delBtn.addEventListener('click', deleteLastDigit);
	// equals button
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

function state() {
	console.log('pre', firstNumber);
	console.log('op', operator);
	console.log('cu', secondNumber);
}
