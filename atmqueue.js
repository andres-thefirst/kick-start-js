const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function atmqueue(queue, max) {
  const order = new Array(queue.length).fill(0);
  return queue.map((item, index) => {
    return {index, times: Math.ceil(item / max)}
  }).sort((a, b) => {
    if (a.times < b.times) {
      return -1;
    } else if (a.times > b.times) {
      return 1;
    } else {
      return a.index - b.index;
    }
  }).map((item) => {
    return item.index+1;
  });
}

let counter = 0;
let isFirst = true;
let numberTests;
let dataInput = {
  sizeQueue: null,
  max: null,
  queue: null
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

  if (!dataInput.sizeQueue) {
    const [sizeQueue, max] =  line.split(" ").map((item) => parseInt(item));
    dataInput.sizeQueue = sizeQueue;
    dataInput.max = max;
    return;
  }

  if (!dataInput.queue) {
    dataInput.queue = line.split(" ").map((item) => parseInt(item));
  }
  counter += 1;
  memory = {};
  const result= atmqueue(dataInput.queue, dataInput.max);
  console.log(`Case #${counter}: ${result.join(" ")}`);
  dataInput = {
    sizeQueue: null,
    max: null,
    queue: null
  }
});