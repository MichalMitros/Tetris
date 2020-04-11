const padding = 40;
let size;
let board = [];
let tetroid = [];
let tetroidType;
let delay = 16;
let tick = 0;

function setup() {
  if(window.innerWidth <= window.innerHeight) {
    size = window.innerWidth - padding;
  } else {
    size = window.innerHeight - padding;
  }

  if(size < 30) {
    size = 30;
  }

  for(let i=0; i<20; i++) {
    board[i] = [];
    for(let j=0; j<10; j++) {
      // board[i][j] = Math.floor(Math.random()*8);
      board[i][j] = 0;
    }
  }

  createTetroid();

  createCanvas(size, size);
}

function draw() {
  frameRate(30);
  background(0);
  drawBoard();

  if(tick === delay) {
    tick = 0;

    if(keyIsDown(LEFT_ARROW)) {
      if(canBeMoved(-1)) {
        moveTetroid(-1);
      }
    } else if(keyIsDown(RIGHT_ARROW)) {
      if(canBeMoved(1)) {
        moveTetroid(1);
      }
    }
    if(keyIsDown(DOWN_ARROW)) {
      if(canBeMoved(0)) {
        moveTetroid(0);
      }
    }

    if(canBeMoved(0)) {
      moveTetroid(0);
    } else {
      saveTetroid();
      removeFilledRows();
      createTetroid();
      if(isGameOver()) {
        clearBoard();
        createTetroid();
      }
    }
  } else {
    tick++;
    if(tick === delay/2) {
      if(keyIsDown(LEFT_ARROW)) {
        if(canBeMoved(-1)) {
          moveTetroid(-1);
        }
      } else if(keyIsDown(RIGHT_ARROW)) {
        if(canBeMoved(1)) {
          moveTetroid(1);
        }
      }
      if(keyIsDown(DOWN_ARROW)) {
        if(canBeMoved(0)) {
          moveTetroid(0);
        }
      }
    }
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    if(canBeMoved(-1)) {
      moveTetroid(-1);
    }
  } else if(keyCode === RIGHT_ARROW) {
    if(canBeMoved(1)) {
      moveTetroid(1);
    }
  } else if(keyCode === DOWN_ARROW) {
    if(canBeMoved(0)) {
      moveTetroid(0);
    } else {
      saveTetroid();
      removeFilledRows();
      createTetroid();
      if(isGameOver()) {
        clearBoard();
        createTetroid();
      }
    }
  }
}

function removeFilledRows() {
  for(let i=19; i>=0; i--) {
    let isFilled = true;
    for(let j=0; j<10; j++) {
      if(board[i][j] === 0) {
        isFilled = false;
      }
    }
    if(isFilled) {
      board[i] = undefined;
      for(let j=i; j>0; j--) {
        board[j] = board[j-1];
      }
      board[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      i++;
    }
  }
}

function drawBoard() {
  translate(3, 3);
  strokeWeight(1);
  stroke(0);
  fill(0);
  let s = (size - 6) / 20;
  for(let i=0; i<20; i++) {
    for(let j=0; j<10; j++) {
      let c = board[i][j];
      for(let k=0; k<tetroid.length; k++) {
        if(tetroid[k][0] === i && tetroid[k][1] === j) {
          c = tetroidType + 1;
          break;
        }
      }
      switch(c) {
        case 1:
          // Z
          fill(87, 195, 245);
          break;
        case 2:
          // Rev. Z
          fill(0, 244, 0);
          break;
        case 3:
          // L
          fill(4, 49, 247);
          break;
        case 4:
          // Rev. L
          fill(197, 57, 247);
          break;
        case 5:
          // Arr
          fill(244, 242, 0);
          break;
        case 6:
          // Rect
          fill(247, 36, 0);
          break;
        case 7:
          // Line
          fill(245, 112, 0);
          break;
        case 0:
          // None
          fill(0);
          break;
      }
      rect(j*s, i*s, s, s);
    }
  }
  noFill();
  stroke(255);
  strokeWeight(3);
  translate(-3, -3);
  rect(2, 2, s*10, s*20);
}

function windowResized() {
  if(window.innerWidth <= window.innerHeight) {
    size = window.innerWidth - padding - 10;
  } else {
    size = window.innerHeight - padding - 10;
  }

  if(size < 30) {
    size = 30;
  }

  resizeCanvas(size + 10, size + 10);
}

function isGameOver() {
  for(let i=0; i<tetroid.length; i++) {
    if(board[tetroid[i][0]][tetroid[i][1]] > 0) {
      return true;
    }
  }
  return false;
}

function clearBoard() {
  for(let i=0; i<20; i++) {
    for(let j=0; j<10; j++) {
      board[i][j] = 0;
    }
  }
}

function saveTetroid() {
  for(let i=0; i<tetroid.length; i++) {
    board[tetroid[i][0]][tetroid[i][1]] = tetroidType+1;
  }
}

function moveTetroid(direction) {
  /*
    -1 - left
    0 - down
    1 - right
  */

  switch(direction) {
    case -1:
      for(let i=0; i<tetroid.length; i++) {
        tetroid[i][1]--;
      }
      break;
    case 0:
      for(let i=0; i<tetroid.length; i++) {
        tetroid[i][0]++;
      }
      break;
    case 1:
      for(let i=0; i<tetroid.length; i++) {
        tetroid[i][1]++;
      }
      break;
  }
}

function canBeMoved(direction) {
  /*
    -1 - left
    0 - down
    1 - right
  */

  switch(direction) {
    case -1:
      for(let i=0; i<tetroid.length; i++) {
        if(tetroid[i][1] === 0) {
          return false;
        } else if(board[tetroid[i][0]][tetroid[i][1]-1] > 0) {
          return false;
        }
      }
      break;
    case 0:
      for(let i=0; i<tetroid.length; i++) {
        if(tetroid[i][0] === 19) {
          return false;
        } else if(board[tetroid[i][0]+1][tetroid[i][1]] > 0) {
          return false;
        }
      }
      break;
    case 1:
      for(let i=0; i<tetroid.length; i++) {
        if(tetroid[i][1] === 9) {
          return false;
        } else if(board[tetroid[i][0]][tetroid[i][1]+1] > 0) {
          return false;
        }
      }
      break;
  }

  return true;
}

function createTetroid() {
  let type = Math.floor(Math.random() * 7);
  let result = [];

  switch(type) {
    case 0:
      result[0] = [0, 3];
      result[1] = [0, 4];
      result[2] = [1, 4];
      result[3] = [1, 5];
      break;
    case 1:
      result[0] = [1, 3];
      result[1] = [1, 4];
      result[2] = [0, 4];
      result[3] = [0, 5];
      break;
    case 2:
      result[0] = [0, 4];
      result[1] = [1, 4];
      result[2] = [2, 4];
      result[3] = [2, 5];
      break;
    case 3:
      result[0] = [0, 5];
      result[1] = [1, 5];
      result[2] = [2, 5];
      result[3] = [2, 4];
      break;
    case 4:
      result[0] = [0, 3];
      result[1] = [0, 4];
      result[2] = [1, 4];
      result[3] = [0, 5];
      break;
    case 5:
      result[0] = [0, 4];
      result[1] = [0, 5];
      result[2] = [1, 4];
      result[3] = [1, 5];
      break;
    case 6:
      result[0] = [0, 3];
      result[1] = [0, 4];
      result[2] = [0, 5];
      result[3] = [0, 6];
      break;
  }

  tetroid = result;
  tetroidType = type;
}
