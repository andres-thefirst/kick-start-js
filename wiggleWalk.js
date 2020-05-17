const readline = require('readline');


const readInterface = readline.createInterface({
  input: process.stdin,
  console: false
});

function adjustRange(range, spot) {
  while (0 <= spot - 1 && range[spot-1][1] + 1 === range[spot][0]) {
    range[spot-1][1] = range[spot][1];
    range.splice(spot, 1);
    if (spot >= range.length) {
      spot -=1;
    }
  }

  while (range.length > spot + 1 && range[spot+1][0] - 1 === range[spot][1]) {
    range[spot+1][0] = range[spot][0];
    range.splice(spot, 1);
  }
}

function findRange(range, value) {
  let l = 0;
  let r = range.length-1;
  let middle = 0;
  while(l < r) {
    middle  = l + r >> 1;
    if (range[middle][0] <= value && range[middle][1] >= value) {
      return middle;
    } else if (value < range[middle][0]) {
      r = middle;
    } else if (value > range[middle][1]) {
      l = middle + 1;
    }
  }
  return l;
}

function prevPostion(range, spot, position) {
  if (range.length === 0) {
    range.splice(spot, 0, [position, position]);
    return position;
  }

  if (range[spot][1] < position) {
    range.splice(spot+1, 0, [position, position]);
    spot += 1;
  } else if (range[spot][0] <= position) {
    position = range[spot][0] - 1;
    range[spot][0] = position; 
  } else {
    range.splice(spot, 0, [position, position]);
  }

  adjustRange(range, spot);

  return position;
}

function nextPostion(range, spot, position) {
  if (range.length === 0) {
    range.splice(spot, 0, [position, position]);
    return position;
  }
  if (range[spot][1] < position) {
    range.splice(spot+1, 0, [position, position]);
    spot += 1;
  } else if (range[spot][0] <= position) {
    position = range[spot][1] + 1;
    range[spot][1] = position; 
  } else {
    range.splice(spot, 0, [position, position]);
  }

  adjustRange(range, spot);

  return position;
}

function wiggleWalk(instructions, info) {
  const robot = {
    row: info.currentRow,
    column: info.currentColumn
  }
  const rows = new Array(info.columns);
  const columns = new Array(info.rows);
  rows[robot.column-1] = [[robot.row, robot.row]];
  columns[robot.row-1] = [[robot.column, robot.column]];
  for (let i =0; i < instructions.length; i+=1) {
    const letter = instructions[i];

    const ensure = (robot) => {
      if (!rows[robot.column-1]) {
        rows[robot.column-1] = [[robot.row, robot.row]];
      }
      if (!columns[robot.row-1]) {
        columns[robot.row-1] = [[robot.column, robot.column]];
      }
    }

    switch(letter) {
      case 'N':
          robot.row-=1;
          ensure(robot);
          spot = findRange(rows[robot.column-1], robot.row);
          robot.row = prevPostion(rows[robot.column-1], spot, robot.row);
          ensure(robot);
          spot = findRange(columns[robot.row-1], robot.column);
          columns[robot.row-1].splice(spot, 0, [robot.column, robot.column]);
          if (columns[robot.row-1][spot][1] < robot.column) {
            columns[robot.row-1].splice(spot+1, 0, [robot.column, robot.column]);
            adjustRange(columns[robot.row-1], spot+1);
          } else if (columns[robot.row-1][spot][0] > robot.column) {
            columns[robot.row-1].splice(spot, 0, [robot.column, robot.column]);
            adjustRange(columns[robot.row-1], spot);
          }
        break;
      case 'S':
          robot.row+=1;
          ensure(robot);
          spot = findRange(rows[robot.column-1], robot.row);
          robot.row = nextPostion(rows[robot.column-1], spot, robot.row);
          ensure(robot);
          spot = findRange(columns[robot.row-1], robot.column);
          if (columns[robot.row-1][spot][1] < robot.column) {
            columns[robot.row-1].splice(spot+1, 0, [robot.column, robot.column]);
            adjustRange(columns[robot.row-1], spot+1);
          } else if (columns[robot.row-1][spot][0] > robot.column) {
            columns[robot.row-1].splice(spot, 0, [robot.column, robot.column]);
            adjustRange(columns[robot.row-1], spot);
          }
        break;
      case 'E':
          robot.column+=1;
          ensure(robot);
          spot = findRange(columns[robot.row-1], robot.column);
          robot.column = nextPostion(columns[robot.row-1], spot, robot.column);
          ensure(robot);
          spot = findRange(rows[robot.column-1], robot.row);
          if (rows[robot.column-1][spot][1] < robot.row) {
            rows[robot.column-1].splice(spot+1, 0, [robot.row, robot.row]);
            adjustRange(rows[robot.column-1], spot+1);
          } else if (rows[robot.column-1][spot][0] > robot.column) {
            rows[robot.column-1].splice(spot, 0, [robot.row, robot.row]);
            adjustRange(rows[robot.column-1], spot);
          }
        break;
      case 'W':
          robot.column-=1;
          ensure(robot);
          spot = findRange(columns[robot.row-1], robot.column);
          robot.column = prevPostion(columns[robot.row-1], spot, robot.column);
          ensure(robot);
          spot = findRange(rows[robot.column-1], robot.row);
          if (rows[robot.column-1][spot][1] < robot.row) {
            rows[robot.column-1].splice(spot+1, 0, [robot.row, robot.row]);
            adjustRange(rows[robot.column-1], spot+1);
          } else if (rows[robot.column-1][spot][0] > robot.column) {
            rows[robot.column-1].splice(spot, 0, [robot.row, robot.row]);
            adjustRange(rows[robot.column-1], spot);
          }
        break;
    }

    ensure(robot);
  }

  return robot;
}

let counter = 0;
let isFirst = true;
let numberTests;
let isAdding = false;
let info = {
  sizeIns: 0,
  rows: 0,
  columns: 0,
  currentRow: 0,
  currentColumn: 0
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

  if (!isAdding) {
    isAdding = true;
    [info.sizeIns, info.rows, info.columns, info.currentRow, info.currentColumn] = line.split(" ").map((item) => parseInt(item));
    return;
  }

  const input = line;
  counter += 1;
  const result = wiggleWalk(input, info);
  console.log(`Case #${counter}: ${result.row} ${result.column}`);
  isAdding= false;
});