const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function findAvailableSpot(dataSet, activity) {
  let left = 0;
  let right = dataSet.length - 1;
  if (dataSet.length === 0) {
    dataSet.push(activity);
    return true;
  } else if (dataSet[0][0] >= activity[1]) {
    dataSet.unshift(activity);
    return true;
  } else if (dataSet[dataSet.length - 1][1] <= activity[0])  {
    dataSet.push(activity);
    return true;
  }
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (mid  + 1 < dataSet.length) {
      if (dataSet[mid][1] <= activity[0] &&  activity[1] <= dataSet[mid+1][0]) {
        dataSet.splice(mid+1, 0, activity);
        return true;
      } else if (dataSet[mid][1] > activity[0]){
        right = mid;
      } else {
        left = mid + 1;
      }
    }
  }
  return false;
}

function generateString(dataSetJ, dataSetC) {
  let indexJ = 0;
  let indexC = 0;
  let array = [];
  dataSetJ.sort((a, b) => a[2] - b[2]);
  dataSetC.sort((a, b) => a[2] - b[2]);
  while (indexJ < dataSetJ.length && indexC < dataSetC.length) {
    if (dataSetC[indexC][2] < dataSetJ[indexJ][2]) {
      array.push("C");
      indexC+=1;
    } else {
      array.push("J");
      indexJ+=1;
    }
  }

  while (indexC < dataSetC.length) {
    array.push("C");
    indexC+=1;
  }

  while (indexJ < dataSetJ.length) {
    array.push("J");
    indexJ+=1;
  }

  return array.join("");
}

function parenting(activities) {
  activities.sort((a, b) => {
    if (a[0] == b[0]) {
      return a[1] - b[1]
    } else {
      return a[0] - b[0];
    }
  });
  if (activities.length == 0) {
    return "IMPOSSIBLE"
  }
  const dataSetJ = [];
  const dataSetC = [];

  for(let i = 0; i < activities.length; i+=1) {
    let found = findAvailableSpot(dataSetC, activities[i]);
    if (!found) {
      found = findAvailableSpot(dataSetJ, activities[i]);
      if (!found) {
        return "IMPOSSIBLE";
      }
    }
  }
  return generateString(dataSetJ, dataSetC);
}

let counter = 0;
let isFirst = true;
let numActivities;
let activities = [];
let addingActivities = false;
readInterface.on('line', function(line) {
  if(isFirst) {
    numberTests = parseInt(line);
    isFirst = false;
    return;
  }
  if (counter >= numberTests) {
    return;
  }
  if (addingActivities === false) {
    numActivities = parseInt(line);
    addingActivities = true;
    activities = [];
    return;
  }
  if (addingActivities) {
    activities .push([...line.split(" ").map((item) => parseInt(item, 10)), activities.length]);
    if (activities.length === numActivities) {
      addingActivities = false;
      counter += 1;
      const result = parenting(activities);
      console.log(`Case #${counter}: ${result}`);
    }
  }
});