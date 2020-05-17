const readline = require('readline');

function busRoutes(routes, day) {
  let index = routes.length - 1;
  while(day > 0 && index >=0) {
    if (day % routes[index] === 0) {
      index-=1;
    } else {
      const  factor = parseInt(day / routes[index]);
      day = factor * routes[index] ;
    }
  }
  
  return day;
}

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

let counter = 0;
let isFirst = true;
let numberTests;
let isAdding = false;
let day = 0;
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }

  if (isAdding === false) {
    isAdding = true;
    [, day] = line.split(" ").map((item) => parseInt(item, 10));
    return;
  }

  const input = line.split(" ").map((item) => parseInt(item, 10));
  counter += 1;
  const result= busRoutes(input, day);
  console.log(`Case #${counter}: ${result}`);
  isAdding= false;
});

