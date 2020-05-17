const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function nestingParenthesis(string) {
  const array = [];
  if (string.length === 0) {
    return string;
  }

  let prev = 0
  for (let i = 0; i < string.length; i+=1) {
    let current = parseInt(string[i], 10);
    if (prev > current) {
      let close = prev - current;
      while(close > 0) {
        array.push(")");
        close-=1;
      }
      array.push(current);
    } else if (prev < current) {
      let open = current - prev;
      while(open > 0) {
        array.push("(");
        open-=1;
      }
      array.push(current);
    } else {
      array.push(current);
    }
    prev = current;
  }

  while(prev > 0) {
    array.push(")");
    prev-=1;
  }

  return array.join("");
}

let counter = 0;
let isFirst = true;
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }
  counter += 1;
  const value = nestingParenthesis(line);
  console.log(`Case #${counter}: ${value}`);
});