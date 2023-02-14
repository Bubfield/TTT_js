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

/*this function deals not only with the user making their move on click, 
but also covers the computer making its move as well based 
on the if statement of activePlayer.name === "The Computer"*/
function executeMove(square) {
  if (!board[square]) {
    board[square] = activePlayer.mark;
    //openSquares is used to help the computer make valid moves
    openSquares = openSquares.filter((el) => el - 1 !== Number(square));
    if (checkForWin()) {
      gamestatus = `${activePlayer.name} won!`;
      return;
    }
    //next line checks for draw
    if (!board.filter((square) => !square).length) {
      gamestatus = "Draw!";
      return;
    }
    //next line switches who is active player/player turn
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    invalidMove = false;
    if (activePlayer.name === "The Computer") {
      let randomIndex = Math.floor(Math.random() * openSquares.length);
      /*the setTimeout is meant to give the impression that the
      computer is thinking about which move to make before it makes it,
      instead of letting it instantaneously make its move*/
      setTimeout(() => {
        executeMove(openSquares[randomIndex] - 1);
      }, 2000);
    }
  } else {
    invalidMove = true;
  }
}

function setUserName(name) {
  players[0].name = name;
}

function setMarks(mark) {
  players[0].mark = mark;
  if (mark === "X") {
    players[1].mark = "O";
    activePlayer = players[0];
  } else {
    players[1].mark = "X";
    activePlayer = players[1];
  }
}

//this function determines if the computer should make the first move
function checkAIMakeFirstMove() {
  if (activePlayer.name === "The Computer") {
    let randomIndex = Math.floor(Math.random() * openSquares.length);
    setTimeout(() => {
      executeMove(openSquares[randomIndex] - 1);
    }, 2000);
  }
}

function restartRnd_STATE() {
  board = new Array(9).fill("");
  openSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  activePlayer = players[0].mark === "X" ? players[0] : players[1];
  gamestatus = "Active";
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
}

//UI DOM section
const boardContainer = document.getElementById("board-container");
const gameStatusText = document.getElementById("gamestatus");
const playerTurnText = document.getElementById("player-turn");
const invalidMoveText = document.getElementById("invalid-move");
const enterBtn = document.getElementById("entername-btn");
const XorODiv = document.getElementById("XorO-div");
const startBtn = document.getElementById("start-button");
const startScreenContainer = document.getElementById("startscreen-container");
const activeGameContainer = document.getElementById("activegame-container");
const whatIsNameDiv = document.getElementById("whatisname-div");
const hello = document.getElementById("hello");
const youChoseMark = document.getElementById("you-chose-mark");
const nameInput = document.getElementById("name");
const restartBtnsContainer = document.getElementById("restart-btns-container");
const restartRnd = document.getElementById("restart-round");
const restart = document.getElementById("restart");

function updateActivePlayer() {
  playerTurnText.textContent = `${activePlayer.name}'s turn...`;
}

function updateGameStatus() {
  gameStatusText.textContent = `GameStatus: ${gamestatus}`;
}

function updateBoardFromState() {
  //next line clears board before it is generated
  boardContainer.textContent = "";
  board.forEach((square, index) => {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("board-square");
    squareDiv.setAttribute("id", index);
    squareDiv.textContent = square;
    boardContainer.appendChild(squareDiv);
  });
}

function updateInvalidMove() {
  if (invalidMove) {
    invalidMoveText.textContent =
      "Invalid move! Please select an empty square!";
  } else {
    invalidMoveText.textContent = "";
  }
}

function updateRestartBtns() {
  if (gamestatus !== "Active") {
    restartBtnsContainer.style.display = "flex";
  }
}

function updateStateAfterMove() {
  updateActivePlayer();
  updateBoardFromState();
  updateGameStatus();
  updateRestartBtns();
  updateInvalidMove();
}

boardContainer.addEventListener("click", (e) => {
  if (gamestatus === "Active" && activePlayer.name === players[0].name) {
    executeMove(e.target.id);
    updateStateAfterMove();
    /*next few lines update "move state" after the computer makes its move
    the setTimeout is because the computer makes its move after two seconds
    so because of that we can't update state until two seconds has elapsed
    and the computer has actually made its move*/
    setTimeout(() => {
      updateStateAfterMove();
    }, 2000);
  }
});

enterBtn.addEventListener("click", () => {
  if (nameInput.value) {
    setUserName(nameInput.value);
    whatIsNameDiv.style.display = "none";
    hello.textContent = `Hello ${players[0].name}!`;
    XorODiv.style.display = "block";
  }
});

XorODiv.addEventListener("click", (e) => {
  setMarks(e.target.id);
  startBtn.style.display = "inline-block";
  youChoseMark.textContent = `You chose ${e.target.id}!`;
});

startBtn.addEventListener("click", () => {
  startScreenContainer.style.display = "none";
  activeGameContainer.style.display = "flex";
  updateActivePlayer();
  updateBoardFromState();
  updateGameStatus();
  checkAIMakeFirstMove();
  setTimeout(() => {
    updateStateAfterMove();
  }, 2000);
});

restartRnd.addEventListener("click", () => {
  restartRnd_STATE();
  updateActivePlayer();
  updateBoardFromState();
  updateGameStatus();
  restartBtnsContainer.style.display = "none";
  checkAIMakeFirstMove();
  setTimeout(() => {
    updateStateAfterMove();
  }, 2000);
});

restart.addEventListener("click", () => {
  restart_STATE();
  startScreenContainer.style.display = "block";
  activeGameContainer.style.display = "none";
  whatIsNameDiv.style.display = "block";
  XorODiv.style.display = "none";
  startBtn.style.display = "none";
  hello.textContent = "";
  youChoseMark.textContent = "";
  nameInput.value = "";
  restartBtnsContainer.style.display = "none";
});
