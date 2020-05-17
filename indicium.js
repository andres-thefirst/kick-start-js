const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

let memory = {};

function indicium(n, target) {
  return generateCombinations(n, target);
}

function generateCombinations(n, target) {
  const array = [];
  for (let i = 0; i < n; i++) {
    array[i] = i +1;
  }
  return combine(n, array, [], target);
}

function combine(n, array, generated, target) {
  if (generated.length === n || array.length === 0) {
    const data = generateMatrix(generated, target);
    data.memory = [];
    return data;
  }
  let data = {};
  let key =  array.join("-");
  if (memory[key]) {
    console.log("entro", memory, " key ", key);
    for (let i = 0; i < memory[key].length; i+=1) {
      data = generateMatrix([...generated, ...memory[key][i]], target);
      data.memory = [];
      if (data.isPossible) {
        return data;
      }
    }
  } else {
    memory[key] = [];
    for (let i = 0; i < array.length; i+=1) {
      const number = array.splice(i, 1)[0];
      memory[key].push([number, ...array]);
      generated.push(number);
      data = combine(n, array, generated, target);
      if (data.isPossible) {
        return data;
      }
      data.memory.unshift(generated.pop())
      memory[key].push(data.memory);
      array.splice(i, 0, number);
    }
    memory[key].forEach((data) => {
      let key1 = data.join("-");
      memory[key1] = memory[key];
    });
  }
  return data;
}

function generateMatrix(generated, target) {
  let n = generated.length;
  let sum = 0;
  let current = 0;
  let isPossible = false;
  for (current = 1; current <= n && !isPossible; current += 1) {
    next = current;
    sum = 0;
    let counter = 0;
    while (counter < n) {
      sum += generated[next-1];
      next = next + 2
      if (next > n) {
        next = next - n;
      }
      counter+=1;
    }
    if (sum === target) {
      isPossible = true;
      break;
    }
  }

  if (!isPossible) {
    return {
      isPossible, 
      matrix: []
    }
  }

  const array = new Array(n);
  if (isPossible) {
    for (let j = 0; j < n; j +=1) {
      array[j] = new Array(n);
      for (let i = current, counter = 0; counter < n;  counter += 1, i += 1) {
        if (i > n) {
          i = 1;
        }
        array[j][counter] = generated[i-1]; 
      }
      current = current + 1;
      if (current > n) {
        current = current - n;
      }
    }
  }
  return {isPossible, matrix: array};
}


let counter = 0;
let isFirst = true;
let numberTests;
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }

  const input = line.split(" ").map((item) => parseInt(item, 10));
  addingActivities = false;
  counter += 1;
  memory = {};
  const result= indicium(input[0], input[1]);
  isPossibleString = result.isPossible ? "POSSIBLE" :  "IMPOSSIBLE";
  console.log(`Case #${counter}: ${isPossibleString}`);
  if (result.isPossible) {
    result.matrix.forEach((item) => {
      console.log(item.join(" "));
    })
  }
});