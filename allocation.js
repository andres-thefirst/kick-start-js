const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function partition(items, left, right) {
  let pivot  = items[Math.floor((right + left) / 2)][0];
  while (left <= right) {
      while (items[left][0] < pivot) {
          left++;
      }
      while (items[right][0] > pivot) {
          right--;
      }
      if (left <= right) {
          [items[left], items[right]] = [items[right], items[left]];
          left++;
          right--;
      }
  }
  return left;
}

function quickSort(items, left, right) {
  let index;
  if (items.length > 1) {
      index = partition(items, left, right);
      if (left < index - 1) {
          quickSort(items, left, index - 1);
      }
      if (index < right) {
          quickSort(items, index, right);
      }
  }
  return items;
}

function allocate(numberHouses, houses, budget) {
  const groupHousesByCostsMap = new Map();
  const groupHousesByCostsArray = [];
  for(let index = 0; index < houses.length; index+=1) {
    const value = houses[index];
    if (groupHousesByCostsMap.has(value)) {
      groupHousesByCostsMap.set(value, groupHousesByCostsMap.get(value) + 1);
    } else {
      groupHousesByCostsMap.set(value, 1);
    }
  }
  groupHousesByCostsMap.forEach((houseQuantity, key) => {
    groupHousesByCostsArray.push([key, houseQuantity]);
  })
  quickSort(groupHousesByCostsArray, 0, groupHousesByCostsArray.length - 1);
  let count = 0;
  for(let index = 0; index < groupHousesByCostsArray.length; index+=1) {
    while (budget > 0 && groupHousesByCostsArray[index][1] > 0 && budget - groupHousesByCostsArray[index][0] >= 0) {
      budget -= groupHousesByCostsArray[index][0];
      groupHousesByCostsArray[index][1] -= 1;
      count += 1;
    }
  }
  return count;
}

let isFirst = true;
let numberTests = 0;
let inputTests = [];
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
  inputTests.push(line);
  if (inputTests.length == 2) {
    const [numberHouses, budget] = inputTests[0].split(' ').map((item) => parseInt(item, 10));
    const houses =  new Array(numberHouses);
    inputTests[1].split(' ').forEach((item, index) => houses[index] = parseInt(item));
    const quantity = allocate(numberHouses, houses, budget);
    inputTests = [];
    counter += 1;
    console.log(`Case #${counter}: ${quantity}`);
  }
});