const readline = require('readline');


const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function training(studentSkills, teamMembers) {
  if (teamMembers === 1) {
    return 0;
  }
  studentSkills.sort((a, b) => b - a);
  let sum = 0;
  const sumAll = new Array(studentSkills.length).fill(0);
  studentSkills.map((item, index) => {
    sum += item;
    sumAll[index] = sum;
  });
  let minHours = Infinity;
  for (let i = 0; i + teamMembers - 1 < studentSkills.length; i++) {
    let target = studentSkills[i] * teamMembers;
    let start = 0;
    if (sumAll[i-1]) {
      start = sumAll[i-1];
    }
    let end = sumAll[i+teamMembers-1] - start;
    minHours = Math.min(minHours, target - end);
  }

  return minHours;
}

let counter = 0;
let isFirst = true;
let numberTests;
let isAdding = false;
let day = 0;
let teamMembers = 0;
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }

  if (!isAdding) {
    isAdding = true;
    [, teamMembers] = line.split(" ").map((item) => parseInt(item));
    return;
  }

  const input = line.split(" ").map((item) => parseInt(item));
  counter += 1;
  const result = training(input, teamMembers);
  console.log(`Case #${counter}: ${result}`);
  isAdding= false;
});
