const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

let memory = {};

function patternMatching(strings) {
  const countArray = new Array(strings.length);
  const wordsCreated = []; 
  for (let i = 0; i < strings.length; i+=1) {
    const current = strings[i];
    const string = RegExp(current.replace(/\*/g, ".*"));
    for (let j = 0; j < strings.length; j+=1) {
      const toTest = strings[j];
      if (i !== j && string.test(toTest)) {
        countArray[j] = countArray[j] ? countArray[j] + 1 : 1;
        if (countArray[j] === strings.length - 1) {
          wordsCreated.push(toTest.replace(/\*/g, " "));
          break
        }
      } else if (i !== j) {
        if (current[current.length-1] === '*' && toTest[0] === "*") {
          const word = current.substr(0, current.length-1) + toTest.substring(1);
          wordsCreated.push(word);
        }
        if (current.length === toTest.length) {
          let word = "";
          for (let k = 0; k < current.length; k+=1) {
            word += current[k] !== "*" ? current[k] : toTest[k];
          }
          wordsCreated.push(word);
        }
      }
    }
  }
  for (let j = 0; j < wordsCreated.length; j+=1) {
    let counter = 0;
    for (let i = 0; i < strings.length; i+=1) {
      const current = strings[i];
      const string = RegExp(current.replace(/\*/g, ".*"));
      if (string.test(wordsCreated[j], '\\$&')) {
        counter += 1;
      }
    }
    if (counter == strings.length) {
      return wordsCreated[j];
    }
  }
  return "*";
}


let counter = 0;
let isFirst = true;
let numberTests;
let numActivities = undefined;
let strings = [];
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }

  if (numActivities === undefined) {
    numActivities = parseInt(line);
    return;
  }

  strings.push(line);
  if (strings.length === numActivities) {
    const result = patternMatching(strings);
    counter += 1;
    console.log(`Case #${counter}: ${result}`);
    strings = [];
    numActivities=undefined;
  }
});