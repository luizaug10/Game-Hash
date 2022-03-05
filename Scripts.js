const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remomve("shoe-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "EMPATE!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O VENCEU!"
      : "X VENCEU!";
  }

  winningMessage.classList.add("show-winnig-message");
};

const checkForwin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = (currentPlayer) => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.remove("circle");
  } else {
    board.classList.add("x");
  }
};

const swapturns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  //COLOCAR A MARCA (X OU CIRCULO)
  const classToAdd = iscircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  //VERIFICAR POR VITÓRIA
  const isWin = checkForWin(classToAdd);

  //VERIFICAR POR EMPATE
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    //MUDAR SÍMBOLO
    swapturns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
