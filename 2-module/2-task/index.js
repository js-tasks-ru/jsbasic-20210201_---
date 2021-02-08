/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
	for (let key in schedule) {
		// console.log(key);
		return false; // есть свойство по ключам;
	}
	return true; // нет свойств по ключам;
}
