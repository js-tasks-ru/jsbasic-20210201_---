/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
	let result = n;
	let i = result <= 1 ? result = 1 : result-1;
	for (i; i > 0; i--) {
		result = result * i;
	}
return result;
}
