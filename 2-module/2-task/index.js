/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
	if (obj === undefined) {
		return false;
	} else {
		for (let key in schedule) {
			if (true ==!!obj[key])
				return false;
			else if (obj[key] === undefined)
				return false;
		}
	}
	return true;
}