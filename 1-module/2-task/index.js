/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 * @param {string | null} name
 * @returns {boolean}
 */
function isValid(name) {
	if (name !== null) {
	  if (!name.match(/\s/g)) {
		  if (name.length >= 4) {
			if (isNaN(name)) {
			  // console.log("typeof String");
			  return true;					
			} else if (isFinite(name)) {
			  // console.log("typeof Number");
			  return false;
			}
		  }
		  else if (name.length < 4) {
		  // console.log("Need more letters");
		  return false;
		  }
	  } else {
		// console.log("Find space");
		return false;
	  }
	} else return false;
}

function sayHello() {
  let userName = prompt('Введите ваше имя', 'UserName');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
