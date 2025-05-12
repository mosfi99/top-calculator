// calculator basic functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// operation variables
let firstNumber = null;
let operator = null;
let secondNumber = null;

// operate function
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
