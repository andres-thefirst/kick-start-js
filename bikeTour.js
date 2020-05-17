const readline = require('readline');

function bikeTour(checkpoints) {
  if (checkpoints.length < 3) {
    return 0;
  }

  let peaks = 0;
  for (let index = 1; index < checkpoints.length; index +=1) {
    if (checkpoints[index - 1] < checkpoints[index] && checkpoints[index + 1] < checkpoints[index]) {
      peaks+=1;
    }
  }

  return peaks;
}

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

let counter = 0;
let isFirst = true;
let numberTests;
let isAdding = false;
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
    return;
  }

  const input = line.split(" ").map((item) => parseInt(item, 10));
  counter += 1;
  const result= bikeTour(input);
  console.log(`Case #${counter}: ${result}`);
  isAdding= false;
});

