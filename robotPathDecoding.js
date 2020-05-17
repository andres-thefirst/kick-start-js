const readline = require('readline');

const EDGE = 1000000000;

function S(rover) {
  if (rover.h + 1 > EDGE) {
    rover.h = 1;
    return rover;
  }
  rover.h+=1;
  return rover;
}

function N(rover) {
  if (rover.h - 1 < 1) {
    rover.h = EDGE;
    return rover;
  }
  rover.h-=1;
  return rover;
}

function W(rover) {
  if (rover.w - 1 < 1) {
    rover.w = EDGE;
    return rover;
  }
  rover.w-=1;
  return rover;
}

function E(rover) {
  if (rover.w + 1 > EDGE) {
    rover.w = 1;
    return rover;
  }
  rover.w+=1;
  return rover;
}

function robotPathDecoding(instructions) {
  const ops = {
    S: S,
    N: N,
    W: W,
    E: E
  };
  const rover = {
    w: 1, h: 1
  };

  let subProgramOpen = [];
  let subProgram = [];
  let memory = {}; 
  for (let index = 0; index < instructions.length; index+=1) {
    const item = instructions[index];
    if (isNaN(item)) {
      if (item === '(' && memory[index-1] !== undefined && memory[index-1].length > 0) {
        const info = subProgramOpen[subProgramOpen.length-1];
        while(info.item > info.executed) {
          memory[info.index].forEach((exec) => exec(rover));
          info.executed+=1;
        }
        subProgramOpen.pop();
        index = info.lastIndex;
        continue;
      }
      if (item === '(') {
        subProgramOpen.push(item);
        subProgram.push([]);
        continue;
      }
      if (subProgramOpen.length > 1 ) {
        if (!isNaN(subProgramOpen[subProgramOpen.length-2].item) && subProgramOpen[subProgramOpen.length-1] === '(' && item ===')') {
          let sub = subProgram.pop();
          subProgramOpen.pop();
          const info = subProgramOpen[subProgramOpen.length-1];
          const executions = [];
          sub.forEach((exec) => {
            executions.push(ops[exec]);
            ops[exec](rover);
          });
          memory[info.index] = executions;
          info.executed+=1;
          info.lastIndex = index;
          if (info.item === info.executed) {
            subProgramOpen.pop();
          } else {
            index = info.index;
          }
        } else {
          subProgram[subProgram.length-1].push(item);
        }
      } else {
        ops[item](rover);
      }
    } else {
      subProgramOpen.push({item: parseInt(item), index, executed: 0});
      console.log(subProgramOpen);
      console.log(subProgram);
    }
  }

  return rover;
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

  const input = line;
  counter += 1;
  const result= robotPathDecoding(input, day);
  console.log(`Case #${counter}: ${result.w} ${result.h}`);
  isAdding= false;
});

// function robotPathDecoding(instructions) {
//   const ops = {
//     S: S,
//     N: N,
//     W: W,
//     E: E
//   };
//   const rover = {
//     w: 1, h: 1
//   };
//   let subProgramOpen = [];
//   let subProgram = [];
//   for (let index = 0; index < instructions.length; index+=1) {
//     const item = instructions[index];
//     if (isNaN(item)) {
//       if (item === '(') {
//         subProgramOpen.push(item);
//         continue;
//       }
//       if (subProgramOpen.length > 1 ) {
//         if (subProgramOpen.length > 2 && !isNaN(subProgramOpen[subProgramOpen.length-2]) && subProgramOpen[subProgramOpen.length-1] === '(' && item ===')') {
//           let times = parseInt(subProgramOpen[subProgramOpen.length-2]);
//           let sub = subProgram.pop();
//           subProgramOpen.pop();
//           subProgramOpen.pop();
//           while (times > 0) {
//             sub.forEach((exec) => {
//               subProgram[subProgram.length-1].push(exec);
//             });
//             times-=1;
//           } 
//         } else if (subProgramOpen.length === 2 && !isNaN(subProgramOpen[subProgramOpen.length-2]) && subProgramOpen[subProgramOpen.length-1] === '(' && item ===')' ) {
//           let times = parseInt(subProgramOpen[subProgramOpen.length-2]);
//           let sub = subProgram.pop();
//           subProgramOpen.pop();
//           subProgramOpen.pop();
//           while (times > 0) {
//             sub.forEach((exec) => {
//               ops[exec](rover);
//             });
//             times-=1;
//           }
//         } else {
//           subProgram[subProgram.length-1].push(item);
//         }
//       } else {
//         ops[item](rover);
//       }
//     } else {
//       subProgramOpen.push(item);
//       subProgram.push([]);
//     }
//   }