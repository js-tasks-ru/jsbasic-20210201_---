function makeDiagonalRed(table) {
  let step = 0;
  for (step; step < table.rows.length; step++) {
    table.rows[step].cells[step].style = 'background-color: red'; 
  //debugger;
  }
}
