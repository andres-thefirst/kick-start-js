const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function decents(number) {
  let bitpos = 0;
  while(number != 0) {
    bitpos+=1;
    number = Math.floor(number / 10);
  } 
  return bitpos-1;
}

const map = {};


function countBoringNumber([start, end]) {
  let count = 0
  for (let number = start; number <= end; number+=1) {
    if (map[number] !== undefined) {
      count+=map[number];
      continue;
    }
    let digits = number;
    let bitpos = Math.pow(10, decents(digits));
    let isBoring = 1;
    let position = 1;
    while (bitpos >= 1) {
      let compare = Math.floor(digits / bitpos);
      if (compare % 2 != position % 2) {
        isBoring = 0;
      }
      bitpos /=  10;
      position +=1;
    }
    map[number]=isBoring;
    count+=isBoring;
  }
  return count;
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
  const result= countBoringNumber(input);
  console.log(`Case #${counter}: ${result}`);
});