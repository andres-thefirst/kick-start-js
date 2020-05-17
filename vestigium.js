const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function vestigium(matrix) {
  let sum = 0;
  let rowRepeated = 0;
  let columnRepeated = 0;
  const rows  = new Array(matrix.length);
  for (let i = 0; i < rows.length; i+=1) {
    rows[i] = new Array(matrix.length);
  }
  const columns = new Array(matrix.length);
  for (let i = 0; i < columns.length; i+=1) {
    columns[i] = new Array(matrix.length);
  }
  for (let i = 0; i < matrix.length; i+=1) {
    for(let j = 0; j  < matrix.length; j+=1) {
      const current = matrix[i][j];
      if (i == j) {
        sum += current;
      }
      if (rows[i].length) {
        if (rows[i][current]) {
            rowRepeated+=1;
            rows[i] = [];
        } else {
          rows[i][current] = 1;
        }
      }
      if (columns[j].length) {
        if (columns[j][current]) {
          columnRepeated+=1;
          columns[j] = [];
        } else {
          columns[j][current] = 1;
        }
      }
    }
  }
  return {sum, rowRepeated, columnRepeated};
}

let inputTests = [];
let counter = 0;
let isFirst = true;
let matrixSize = null;
let generatingMatrix = false;
let matrix = null;
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }
  if (generatingMatrix === false) {
    matrixSize = parseInt(line, 10);
    generatingMatrix = true;
    matrix = [];
    return;
  }
  if (generatingMatrix) {
    matrix .push(line.split(" ").map((item) => parseInt(item, 10)));
    if (matrix.length === matrixSize) {
      generatingMatrix = false;
      counter += 1;
      const  {sum, rowRepeated, columnRepeated} = vestigium(matrix);
      console.log(`Case #${counter}: ${sum} ${rowRepeated} ${columnRepeated}`);
    }
  }
});