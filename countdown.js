const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function countdown(input) {
  const {m, data: array} = input;
  let isCountingDown = false;
  let prev = null;
  let countSequences = 0;
  array.forEach((value) => {
    if (value === m) {
      isCountingDown = true;
      prev = value;
      return;
    }
    if (isCountingDown) {
      if (prev - 1 === value && value === 1) {
        countSequences += 1;
      }
      if (prev - 1 === value) {
        prev = value;
      } else {
        isCountingDown = false;
      }
    }
  });
  return countSequences;
}


let testNumber = 0;
let testCounter = 0;
let isFirst = true;
let isAdding = false;
let input = null;
readInterface.on('line', function(line) {
  if (isFirst) {
    testNumber = parseInt(line);
    isFirst = false;
    return;
  }

  if (testCounter >= testNumber) {
    return;
  }

  if (!isAdding) {
    const [length, m] = line.split(" ").map((item) => parseInt(item));
    isAdding = true;
    input = {
      length,
      m
    }
    return;
  }

  testCounter +=1;
  input.data = line.split(" ").map((item) => parseInt(item));
  const result = countdown(input);
  console.log(`Case #${testCounter}: ${result}`);
  isAdding = false;
});