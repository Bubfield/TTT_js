//state variables
let board = new Array(9).fill("");
let openSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let players = [
  {
    name: "",
    mark: "",
  },
  {
    name: "The Computer",
    mark: "",
  },
];

let activePlayer = players[0];
let gamestatus = "Active";
let invalidMove = false;

//app functions dealing only with state
function checkForWin() {
  function checkRow(num1, num2, num3) {
    let one = board[num1];
    let two = board[num2];
    let three = board[num3];
    return one && two && three && one === two && one === three;
  }
  return (
    checkRow(0, 1, 2) ||
    checkRow(3, 4, 5) ||
    checkRow(6, 7, 8) ||
    checkRow(0, 3, 6) ||
    checkRow(1, 4, 7) ||
    checkRow(2, 5, 8) ||
    checkRow(0, 4, 8) ||
    checkRow(2, 4, 6)
  );
}

/*this function deals not only with the user making making
their move on click, but also covers the computer making its move as well
based on the if statement of activePlayer.name === "The Computer"*/
function executeMove(square) {
  if (!board[square] && gamestatus === "Active") {
    board[square] = activePlayer.mark;
    console.log(board);
    //openSquares is used to help the computer make valid moves
    openSquares = openSquares.filter((el) => el - 1 !== Number(square));
    if (checkForWin()) {
      gamestatus = `${activePlayer.name} won!`;
      console.log(`gamestatus: ${gamestatus}`);
      return;
    }
    //next line checks for draw
    if (!board.filter((square) => !square).length) {
      gamestatus = "Draw!";
      console.log(`gamestatus: ${gamestatus}`);
      return;
    }
    //next line switches who is active player/player turn
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    console.log(`${activePlayer.name}'s turn`);
    invalidMove = false;
    if (activePlayer.name === "The Computer") {
      let randomIndex = Math.floor(Math.random() * openSquares.length);
      setTimeout(() => {
        executeMove(openSquares[randomIndex] - 1);
      }, 2000);
    }
  } else {
    invalidMove = true;
    console.log(
      "Invalid move made! Either you have selected an occupied square or the game is already over and so you cannot make any more moves."
    );
  }
}

function setUserName(name) {
  players[0].name = name;
  console.log(`Hello ${name}!`);
  console.log("Choose: X or O using setMarks(mark) function.");
}

function setMarks(mark) {
  players[0].mark = mark;
  if (mark === "X") {
    players[1].mark = "O";
  } else {
    players[1].mark = "X";
  }
  console.log(`You chose ${mark}!`);
  if (mark === "X") {
    console.log("You go first!");
    activePlayer = players[0];
  } else {
    console.log("The computer goes first!");
    activePlayer = players[1];
  }
  console.log(
    `You're ready to start the game. Just call the doesAIMakeFirstMove() function! 
    If you wish to restart the app, call the restart_STATE() function. 
    If you wish to restart the round, call the restartRnd_STATE() function.`
  );
}

function doesAIMakeFirstMove() {
  if (activePlayer.name === "The Computer") {
    let randomIndex = Math.floor(Math.random() * openSquares.length);
    setTimeout(() => {
      executeMove(openSquares[randomIndex] - 1);
    }, 2000);
  }
  console.log(
    "Game has started! Make your moves by calling the executeMove(square) function!"
  );
}

function restartRnd_STATE() {
  board = new Array(9).fill("");
  openSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  activePlayer = players[0].mark === "X" ? players[0] : players[1];
  gamestatus = "Active";
  doesAIMakeFirstMove();
}

function restart_STATE() {
  board = new Array(9).fill("");
  openSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  players = [
    {
      name: "",
      mark: "",
    },
    {
      name: "The Computer",
      mark: "",
    },
  ];
  activePlayer = players[0];
  gamestatus = "Active";
  loadStartScreen();
}

function loadStartScreen() {
  console.log("Tic Tac Toe!");
  console.log(
    "Note: X makes the first move. You must select X or O, and put in your name before you can start the game."
  );
  console.log(
    "What is your name? Enter it using the setUserName(name) function."
  );
}
loadStartScreen();
