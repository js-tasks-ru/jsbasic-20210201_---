/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  return str.split('-').map(function(item, index){
      return index == 0 ? item : item[0].toUpperCase() + item.slice(1);
    }).join('');
}
