const padding = 40;
let size;
let board = [];
let tetroid = [];

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
      board[i][j] = Math.floor(Math.random()*8);
      // board[i][j] = 0;
    }
  }

  createCanvas(size, size);
}

function draw() {
  frameRate(30);
  background(0);
  drawBoard(board);
}

function drawBoard(b) {
  translate(3, 3);
  strokeWeight(1);
  stroke(0);
  fill(0);
  let s = (size - 6) / 20;
  for(let i=0; i<20; i++) {
    for(let j=0; j<10; j++) {
      switch(b[i][j]) {
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

function createTrtroid() {
  let type = Math.floor(Math.random() * 7);
}
