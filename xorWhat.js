const readline = require('readline');


const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function hammingWheight(number) {
  let sum = 0;
  while (number != 0) {
    sum+=1;
    number &= (number - 1);
  }
  return sum;
}

function xorWhat(data) {
  const list = data.list;
  const changes = data.changes;
  if (list.length === 0) {
    return new Array(changes.length).fill(0).join(" ");
  }
  const odds = new Set();
  for (let index = 0; index < list.length; index+=1) {
    if (hammingWheight(list[index]) % 2 !== 0) {
      odds.add(index);
    }
  }
  const positions = changes.map((item) => {
    list[item.index] = item.value;
    if (odds.has(item.index)) {
      odds.delete(item.index);
    }
    if (hammingWheight(item.value) % 2 !== 0) {
      odds.add(item.index);
    }
    if (odds.size % 2 === 0) {
      return list.length;
    }
    const array = Array.from(odds);
    const first = list.length - (Math.min(...array) + 1);
    const last = Math.max(...array) ;
    return Math.max(first, last, 0);
  });
  return positions.join(" ");
}

let counter = 0;
let isFirst = true;
let numberTests;
let isAdding = false;
let data = {};
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
    const [sizeList, quantityChanges] = line.split(" ").map((item) => parseInt(item));
    data = {
      sizeList,
      quantityChanges,
      changes: [],
    };
    return;
  }

  if (!data.list) {
    data.list = line.split(" ").map((item) => parseInt(item));
    return;
  }

  if (data.quantityChanges > 0) {
    const [index, value] = line.split(" ").map((item) => parseInt(item));
    data.changes.push({ index, value });
    data.quantityChanges -= 1;
  }

  if (data.quantityChanges === 0) {
    const input = line;
    counter += 1;
    const result = xorWhat(data);
    console.log(`Case #${counter}: ${result}`);
    isAdding= false;
  }
});


// const readline = require('readline');


// const readInterface = readline.createInterface({
//   input: process.stdin,
//   console: false
// });

// function hammingWheight(number) {
//   let sum = 0;
//   while (number != 0) {
//     sum+=1;
//     number &= (number - 1);
//   }

//   return sum;
// }

// function xorWhat(data) {
//   const list = data.list;
//   const changes = data.changes;
//   if (list.length === 0) {
//     return new Array(changes.length).fill(0).join(" ");
//   }
//   const positions = changes.map((item) => {
//     list[item.index] = item.value;
//     let sum = list[0];
//     for (let index = 1; index < list.length; index+=1) {
//       sum ^= list[index];
//     }
//     if (hammingWheight(sum) % 2 === 0) {
//       return list.length;
//     }
//     for (let index = 0; index < list.length - 1; index+=1) {
//       sum ^= list[index];
//       if (hammingWheight(sum) % 2 === 0) {
//         return list.length - index - 1;
//       }
//     }
//     return 0;
//   });
//   return positions.join(" ");
// }

// let counter = 0;
// let isFirst = true;
// let numberTests;
// let isAdding = false;
// let data = {};
// readInterface.on('line', function(line) {
//   if(isFirst) {
//     numberTests = parseInt(line);
//     isFirst = false;
//     return;
//   }
//   if (counter >= numberTests) {
//     return;
//   }

//   if (!isAdding) {
//     isAdding = true;
//     const [sizeList, quantityChanges] = line.split(" ").map((item) => parseInt(item));
//     data = {
//       sizeList,
//       quantityChanges,
//       changes: [],
//     };
//     return;
//   }

//   if (!data.list) {
//     data.list = line.split(" ").map((item) => parseInt(item));
//     return;
//   }

//   if (data.quantityChanges > 0) {
//     const [index, value] = line.split(" ").map((item) => parseInt(item));
//     data.changes.push({ index, value });
//     data.quantityChanges -= 1;
//   }

//   if (data.quantityChanges === 0) {
//     const input = line;
//     counter += 1;
//     const result = xorWhat(data);
//     console.log(`Case #${counter}: ${result}`);
//     isAdding= false;
//   }
// });