/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
		let table = document.createElement('table');
    // Заголовок
		let thd = document.createElement('thead');
		let headers = ['Имя', 'Возраст', 'Зарплата', 'Город'];
    let tr = document.createElement('tr');
      for (let item of headers) {
        let th = document.createElement('th');
        th.innerHTML = item.toString();
        tr.append(th);
      }
    thd.append(tr);
    table.append(thd);
    //
		// Тело
		let tbdy = document.createElement('tbody');
    let step = rows.length-1, i = 0;
    for (i; i <= step; i++) {
      let trHead = document.createElement('tr');
        for (let item in rows[step]) {
          let td = document.createElement('td');
          td.innerHTML = rows[i][item];
          trHead.append(td);
        }
        let td = document.createElement('td');
        td.innerHTML = `<button>X</button>`;
        trHead.append(td);
      tbdy.append(trHead);
    }
    table.appendChild(tbdy);
    //
    // Удаление
		const buttons = table.querySelectorAll('button');
		for (let button of buttons) {
			button.addEventListener('click', (event) => event.target.closest('tr').remove());
		}
    //
    this.elem = table;
  }
}