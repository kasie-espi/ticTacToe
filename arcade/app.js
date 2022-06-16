const gameBoard = document.getElementById('boardGrid')
const apple = document.getElementsByClassName('apple');
const snakey = document.getElementsByClassName('snake');
const playAgain = document.getElementById('playAgain')
const btn = document.getElementById("start");

let snake = {
  //bod [y, x]
  bodyOfSnake: [ 
      [2, 2], 
      [3, 2], 
      [4, 2], 
      [5, 2] 
  ],
  nextDirection: [1, 0]
};

let gameState = {
  apple: [[2, 7]],
  snake: snake,
  board: [0, 20],
  score: 0,
  speed: 8,
}

function createBoard() {
  //game pieces - APPLE
  gameState.apple.forEach((coordinate) => {
    let yApple = coordinate[0];
    let xApple = coordinate[1];

    const appleCell = document.createElement("div");
    appleCell.style.gridRowStart = xApple;
    appleCell.style.gridColumnStart = yApple;
    appleCell.classList.add("apple");

    gameBoard.appendChild(appleCell);
  });

  //game piece - SNAKEY SNAKE
  snake.bodyOfSnake.forEach((segment) => {
    let ySnakeBod = segment[0];
    let xSnakeBod = segment[1];

    const snakeCell = document.createElement("div");
    snakeCell.style.gridRowStart = xSnakeBod;
    snakeCell.style.gridColumnStart = ySnakeBod;
    snakeCell.classList.add("snake");
    gameBoard.appendChild(snakeCell);
  });

}
createBoard();

function moveIt() {
  let directionY = snake.nextDirection[0];
  let directionX = snake.nextDirection[1];
  let snakeHead = snake.bodyOfSnake[snake.bodyOfSnake.length - 1];

  let newSnakeHead = [];
  snake.bodyOfSnake.shift();

  if (snakeHead[0] === gameState.apple[0][0] &&
      snakeHead[1] === gameState.apple[0][1]) {
        snake.bodyOfSnake.unshift([gameState.apple[0]]);
        appleRandom();
        gameState.speed += 0.50;
      }
      newSnakeHead.push(snakeHead[0] + directionY);
      newSnakeHead.push(snakeHead[1] + directionX);

      snake.bodyOfSnake.push(newSnakeHead);      
}
moveIt();

function startGame() {
  let position = snake.bodyOfSnake;
  btn.addEventListener("click", function(){
    let slither = setInterval(function(){
       position += 1;
       gameState.snake = position + "px";
   console.log("moveitmoveit");
     }, 100);
   });
}
startGame();


function gameLoss(){
    clearInterval('slither');

}


function appleRandom() {
  let appleRandomY = Math.floor(Math.random() * 20) + 1;
  let appleRandomX = Math.floor(Math.random() * 20) + 1;

  return (gameState.apple[0] = [appleRandomY, appleRandomX]);
}

function hitsWallOrSelf() {
  let snakeHead = snake.bodyOfSnake[snake.bodyOfSnake.length - 1];
  if (
    snakeHead[0] < gameState.board[0] ||
    snakeHead[0] > gameState.board[1] ||
    snakeHead[1] < gameState.board[0] ||
    snakeHead[1] > gameState.board[1]
  ) {
    gameLoss();
  }
  for (let i = 0; i < snake.bodyOfSnake.length - 1; i++) {
    let compArr = [snakeHead];
    if (
      snake.bodyOfSnake[i][0] === compArr[0][0] &&
      snake.bodyOfSnake[i][1] === compArr[0][1]
    ) {
      dieSound.play();
      gameLoss();
    }
  }
}
hitsWallOrSelf();



//arrow key manipulation
const direction = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  enter: "Enter",
};

let lastCoordinate = [0, 0];
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case direction.up:
      if (lastCoordinate[1] !== 0) break;

      snake.nextDirection = [0, -1];
      lastCoordinate = [0, -1];
      break;
    case direction.down:
      if (lastCoordinate[1] !== 0) break;

      snake.nextDirection = [0, 1];
      lastCoordinate = [0, 1];
      break;
    case direction.right:
      if (lastCoordinate[0] !== 0) break;

      snake.nextDirection = [1, 0];
      lastCoordinate = [1, 0];
      break;
    case direction.left:
      if (lastCoordinate[0] !== 0) break;

      snake.nextDirection = [-1, 0];
      lastCoordinate = [-1, 0];
      break;
    case enter:
      startGame(event.key);
      break;
    default:
      snake.nextDirection = snake.nextDirection;
  }
});




