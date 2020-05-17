const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

let memory =  new Set();

function takePlates(stacks, lengthStack,  requiredPlates, sum = 0) {
  let max = -Infinity;
  if (requiredPlates === 0) {
    return sum;
  }
  const values = [0];
  for (let index = 0; index < stacks.length; index+=1) {
    if (stacks[index].length > 0) {
      const value = stacks[index].shift();
      let key = '';
      let keyArray = new Array(stacks.length+1);
      let firm = 0;
      for (let index = 0; index < stacks.length; index+=1) {
        keyArray[index] = `${firm}-${stacks[index].length}-`;
      }
      keyArray[stacks.length] =`${sum}-${requiredPlates}`;
      key = keyArray.join('');
      if (memory.has(key)) {
        stacks[index].unshift(value);
        continue;
      }
      let result = takePlates(stacks, lengthStack, requiredPlates - 1, sum + value);
      if (max < result) {
        max = result;
      }
      memory.add(key);
      stacks[index].unshift(value);
    }
  }
  return max;
}

let isFirst = true;
let numberTests = 0;
let inputTests = [];
let counter = 0;
let stacks = [];
let numberStacks = null;
let lengthStack = null;
let requiredPlates = null;
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }
  inputTests.push(line);
  if (inputTests.length > 1) {
    const [numberStacks, lengthStack, requiredPlates] = inputTests[0].split(' ').map((item) => parseInt(item, 10));
    stacks[stacks.length] = inputTests[inputTests.length - 1].split(' ').map((item) => parseInt(item, 10));
    if (stacks.length === numberStacks) {
      const quantity = takePlates(stacks, lengthStack, requiredPlates, 0);
      memory =  new Set();
      inputTests = [];
      stacks = [];
      counter += 1;
      console.log(`Case #${counter}: ${quantity}`);
    }
  }
});