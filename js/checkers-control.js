const playingField = document.querySelector(".playing-field");
let player = true;
const checker = document.querySelectorAll("li div");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnChangeColor = document.querySelector(".change-color");
const bodyColor = document.querySelector(".color");

btnChangeColor.addEventListener("click", () => {
  const color = (document.body.style.background = `${getRandomHexColor()}`);
  bodyColor.textContent = color;
});

function addColorCheckerboard(arr) {
  let num = 0;
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      if (num % 2 === 0) {
        playingField.innerHTML += `<li class ="checkerboard-white"></li>`;
      } else {
        let checkerClass = "";
        if (arr[y][x] === 1) {
          checkerClass = "checker-black";
        } else if (arr[y][x] === 2) {
          checkerClass = "checker-white";
        }
        playingField.innerHTML += `<li class ="checkerboard-black"><div class="${checkerClass}"></div></li>`;
      }
      num += 1;
    }
    num += 1;
  }
}

function createMap() {
  const board = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ];
  addColorCheckerboard(board);
}

createMap();

const squares = document.querySelectorAll(".playing-field li");
let line;
let column;
const board1 = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
];

function showsCoordinatesSelectedChecker() {
  squares.forEach((square, index) => {
    square.addEventListener("click", () => {
      console.log(`${index % 8}, ${Math.floor(index / 8)}`);
      line = parseInt(`${index % 8}`);
      column = parseInt(` ${Math.floor(index / 8)}`);

      console.log(addPossibleMovesForBlackChecker(line, column));
      moveActiveChecker(line, column);
    });
  });
}
showsCoordinatesSelectedChecker();

function selectsActiveСhecker() {
  playingField.addEventListener("click", ({ target }) => {
    if (target.nodeName !== "DIV") {
      return;
    }

    const activeSquares = document.querySelector(".pressed-square");

    if (activeSquares) {
      activeSquares.classList.remove("pressed-square");
    }
    target.parentNode.classList.add("pressed-square");
  });
}

selectsActiveСhecker();

function addPossibleMovesForBlackChecker(x, y) {
  const moves = [];
  if (board1[y + 1] && board1[y + 1][x - 1] === 0) {
    moves.push({ x: x - 1, y: y + 1 });
  }
  if (board1[y + 1] && board1[y + 1][x + 1] === 0) {
    moves.push({ x: x + 1, y: y + 1 });
  }
  if (
    board1[y + 2] &&
    board1[y + 2][x - 2] === 0 &&
    board1[y + 1][x - 1] === 2
  ) {
    moves.push({ x: x - 2, y: y + 2 });
  }
  if (
    board1[y + 2] &&
    board1[y + 2][x + 2] === 0 &&
    board1[y + 1][x + 1] === 2
  ) {
    moves.push({ x: x + 2, y: y + 2 });
  }
  return moves;
}

function moveActiveChecker(x, y) {
  const activeSquare = document.querySelector(".pressed-square");
  if (!activeSquare) {
    return;
  }

  const checker = activeSquare.querySelector("li div");
  const targetSquare = squares[y * 8 + x];
  const targetCell = board1[x][y];

  if (targetCell !== 0) {
    return;
  }

  targetSquare.appendChild(checker);
  activeSquare.classList.remove("pressed-square");

  board1[y][x] = board1[column][line];
  board1[column][line] = 0;
}
