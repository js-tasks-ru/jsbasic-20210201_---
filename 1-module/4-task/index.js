/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
	let arg_1 = "1xbet", arg_2 = "xxx";
	return str.toLowerCase().includes(arg_1) || str.toLowerCase().includes(arg_2);
}
