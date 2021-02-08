/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
	let result = Number(0);
	for (let key in salaries) {
		if ((typeof salaries[key] !== typeof Boolean()) && (typeof salaries[key] !== typeof String())) {
			if (!isNaN(salaries[key]) && isFinite(salaries[key])) {
				//console.log(salaries[key]);
				result += salaries[key];
			}
		}
	}
	return result;
}