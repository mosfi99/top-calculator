// calculator basic functions
const add = function (...numbers) {
	return numbers.reduce((total, num) => total + num, 0);
};

console.log(add(1, 2, 3)); // 6

const subtract = function (...numbers) {
	return numbers.reduce((total, num) => {
		total === 0 ? (total += num) : (total -= num);
		return total;
	}, 0);
};
console.log(subtract(5.2, 1)); // 4.2

const multiply = function (...numbers) {
	return numbers.reduce((total, num) => total * num, 1);
};

console.log(multiply(3, 2, 5)); // 30

const divide = function (dividend, divisor) {
	return dividend / divisor;
};
console.log(divide(12, 4)); // 3
