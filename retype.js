const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function leastAmountTime([lastLevel, currentLevel, swordLevel]) {
  const back = (lastLevel - swordLevel) + (currentLevel - swordLevel) + currentLevel
  const restart = lastLevel + currentLevel
  return Math.min(back, restart);
}

let isFirst = true;
let numberTests = 0;
let counter = 0;
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }

  const input = line.split(" ").map(item => parseInt(item, 10));
  counter += 1;
  const result= leastAmountTime(input);
  console.log(`Case #${counter}: ${result}`);
});