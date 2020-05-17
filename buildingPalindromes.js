const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

// function buildingPalindromes(blocks, questions) {
//   let answered = 0;
//   questions.forEach(range => {
//     const start = range[0];
//     const end = range[1];
//     const memory = new Set();
//     let countOdds = (end - start) + 1;
//     for (let i = start; i <= end; i+=1) {
//       let letter = blocks[i-1];
//       if (memory.has(letter)) {
//         countOdds-=2;
//         memory.delete(letter);
//       } else {
//         memory.add(letter);
//       }
//     }
//     if (countOdds < 2) {
//       answered++;
//     }
//   });
//   return answered;
// }

function buildingPalindromes(blocks, questions) {
  let answered = 0;
  const memory = {};
  const letters = new Set();
  for (let i = 0; i < blocks.length; i+=1) {
    letters.add(blocks[i]);
  }
  Array.from(letters).forEach((letter) => {
    memory[letter] = new Array(blocks.length).fill(0);
    let counter = 0;
    for (let i = 0; i < blocks.length; i+=1) {
      if (blocks[i] === letter) {
        counter+=1;
      }
      memory[letter][i] = counter;
    }
  });
  questions.forEach(range => {
    const start = range[0];
    const end = range[1];
    let countOdds = 0
    Array.from(letters).forEach((letter) => {
      let endRange = 0;
      let startRange = 0;
      if (memory[letter][end-1]) {
        endRange = memory[letter][end-1];
      }
      if (memory[letter][start-2]) {
        startRange = memory[letter][start-2];
      }
      if ((endRange - startRange) % 2 !== 0) {
        countOdds+=1;
      }
    })
    if (countOdds < 2) {
      answered+=1;
    }
  });
  return answered;
}

let counter = 0;
let isFirst = true;
let isAdding = false;
let waitingBlocks = false;
let questions = 0;
let questionsObj = {
  blocks: "",
  questions: []
}
let tests = 0;
readInterface.on('line', function(line) {
  if (isFirst) {
    tests = parseInt(line);
    isFirst = false;
    return;
  }

  if (tests === counter) {
    return;
  }

  if (!isAdding) {
    isAdding = true;
    [_, questions] = line.split(" ").map((item) => parseInt(item));
    questionsObj.questions = [];
    waitingBlocks = true;
    return;
  }

  if (waitingBlocks) {
    questionsObj.blocks = line;
    waitingBlocks = false;
    return;
  }

  questionsObj.questions.push(line.split(" ").map((item) => parseInt(item)));
  questions--;
  if (questions === 0) {
    counter++;
    isAdding = false;
    const result = buildingPalindromes(questionsObj.blocks, questionsObj.questions);
    console.log(`Case #${counter}: ${result}`);
  }
});
