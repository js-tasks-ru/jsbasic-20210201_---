/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
	if (isNaN(str)) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	} else return ''; // for Number
}
