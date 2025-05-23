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

// State managment
const calculator = {
	currentInput: '',
	firstOperand: '',
	operator: '',
	waitingForSecondOperand: false,
	equals: '',
	result: '',
};

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
	if (calculator.waitingForSecondOperand) {
		calculator.currentInput += digit;
		calculator.waitingForSecondOperand = false;
	} else {
		calculator.currentInput += digit; // User enters digits
	}
	updateDisplay();
}

function appendDecimal() {
	if (calculator.result !== '') {
		clearValues();
	}
	if (!calculator.currentInput.includes('.')) {
		if (calculator.currentInput === '') {
			calculator.currentInput = '0.';
		} else {
			calculator.currentInput += '.';
		}
		updateDisplay();
	}
}

function setOperator(op) {
	if (calculator.firstOperand === '' && calculator.currentInput === '') {
		return;
	}

	if (calculator.result) {
		const result = calculator.result;
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
	if (calculator.firstOperand === '' && calculator.currentInput !== '') {
		// set first operand
		calculator.firstOperand = calculator.currentInput;
		calculator.currentInput = '';

		// case where the operator is already set:
	} else if (calculator.operator) {
		calculator.result = getResult(
			calculator.firstOperand,
			calculator.operator,
			calculator.currentInput
		);
		calculator.firstOperand = calculator.result;
		calculator.currentInput = '';
		calculator.result = '';
	}

	calculator.operator = op; // set the operator
	calculator.waitingForSecondOperand = true;
	updateDisplay();
}

function setResult() {
	// Little Easter Egg for my special person:
	if (calculator.currentInput === '02082024' || '2082024') {
		elements.resultDisplay.textContent = 'i <3 u';
	}
	if (
		calculator.operator &&
		calculator.firstOperand !== '' &&
		calculator.currentInput !== ''
	) {
		calculator.result = getResult(
			calculator.firstOperand,
			calculator.operator,
			calculator.currentInput
		);
		calculator.equals = '=';
		calculator.waitingForSecondOperand = true;
		updateDisplay();
	}
}

function getResult(a, op, b) {
	const result = operate(a, op, b);
	if (result === 'Error' || isNaN(result)) {
		return handleError();
	} else {
		return round(result);
	}
}

function handleError() {
	elements.resultDisplay.classList.add('error-display');
	toggleButtons(true);
	return 'Error. Press Clear';
}

const ROUND_PRECISION = 100; // two decimal places
function round(num) {
	return Math.round(num * ROUND_PRECISION) / ROUND_PRECISION;
}

function deleteLastDigit() {
	if (!calculator.result) {
		calculator.currentInput = calculator.currentInput.slice(0, -1);
		updateDisplay();
	}
}

function clearValues() {
	calculator.currentInput = '';
	calculator.firstOperand = '';
	calculator.operator = '';
	calculator.waitingForSecondOperand = false;
	calculator.equals = '';
	calculator.result = '';

	// error handling
	elements.resultDisplay.classList.remove('error-display');
	toggleButtons(false);
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
	elements.equalsBtn.addEventListener('click', setResult);
	// decimals
	elements.decimal.addEventListener('click', appendDecimal);
}

// Stop all events, but keep clear, when there is an Error
function toggleButtons(booleanValue) {
	[
		...elements.numBtns,
		...elements.operatorBtns,
		elements.decimal,
		elements.equalsBtn,
		elements.delBtn,
	].forEach((btn) => {
		btn.disabled = booleanValue;
	});
}

// Calculation Logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? 'Error' : a / b);

const operate = (a, operator, b) => {
	if (typeof a === 'string') a = parseFloat(a);
	if (typeof b === 'string') b = parseFloat(b);
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
			return 'Error';
	}
};

// Initialization
function init() {
	updateDisplay();
	initEventListeners();
}

init();
