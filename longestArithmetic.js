const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function compare(isIncreasing, a, b) {
  if (isIncreasing) {
    return a >= b;
  } 
  return a <= b;
}

function longestArithmetic({size, array}) {
  if (size < 2) {
    return size;
  }
  let prevDiff = null;
  let counter = 1;
  let maxSize = 0;
  let isIncreasing = null;
  for (let i = 1; i < size; i+=1) {
    if (array[i-1] - array[i] === 0) {
      if (prevDiff !== 0) {
        maxSize = Math.max(counter+1, maxSize);
        isIncreasing = null;
        counter = 0;
      }
      prevDiff = 0;
      counter += 1;
      continue;
    }
    if (isIncreasing === null) {
      isIncreasing = array[i-1] < array[i];
    }
    if (prevDiff !== null) {
      const newDiff = Math.abs(array[i-1] - array[i]);
      let newIncreasing = compare(isIncreasing, array[i-1], array[i]);
      if (newIncreasing !== isIncreasing) {
      }
      if (prevDiff !== newDiff || newIncreasing) {
        maxSize = Math.max(counter+1, maxSize);
        counter = 1;
        prevDiff = newDiff;
        if (newIncreasing) {
          isIncreasing = !isIncreasing;
        }
      } else {
        counter+=1;
      }
    } else {  
      prevDiff = Math.abs(array[i-1] - array[i]);
    }
  }
  maxSize = Math.max(maxSize, counter+1);
  return maxSize;
}

let counter = 0;
let isFirst = true;
let numberTests;
let input = {
  size: null,
  array: null,
}
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }
  if (input.size === null) {
    input.size = parseInt(line);
    return;
  }
  if (input.array === null) {
    input.array = line.split(" ").map(item => parseInt(item, 10));
    const result = longestArithmetic(input);
    counter+=1;
    console.log(`Case #${counter}: ${result}`);
    input = {
      size: null,
      array: null
    };
  }
});
