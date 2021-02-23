function highlight(table) {
  let step = 0;
  let countTr = table.rows.length-1;
  for(step; step <= countTr; step++){
    if (step!=0){ // != thead
		let getRows = table.rows[step];
			// Age
			let ageCells = table.rows[step].cells[1];
			if (ageCells.innerText < 18){
				getRows.style="text-decoration: line-through"
			}

			// Gender
			let genderCells = table.rows[step].cells[2];
      if (genderCells.innerText == 'm') getRows.classList.add('male');
      else if (genderCells.innerText == 'f') getRows.classList.add('female');

			// Status
			let statusCells = table.rows[step].cells[3];
      if (statusCells.hasAttribute('data-available')) {
        if (statusCells.dataset.available == 'true') {
				  getRows.classList.add('available');
        }	
        else if (statusCells.dataset.available == 'false') {
					getRows.classList.add('unavailable');
        }
      } 
			else if (!(statusCells.hasAttribute('data-available'))) {
				getRows.setAttribute('hidden', '');
      }
	}
  }
}