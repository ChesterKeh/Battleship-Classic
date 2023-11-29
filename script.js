//* Start Variables //
const Gridsize = 10; //10 x 10
const playerGrid = document.getElementById("playerBoard");
const computerGrid = document.getElementById("computerBoard");
const startButton = document.getElementById('startButton');

let gameOver =false 
//Create the fixed size Grid
// function drawBoard(size) {
//   let board = []; //init empty board.
//   for (let i = 0; i < Gridsize; i++) {
//     board[i] = []; // init empty array for each row
//     for (let j = 0; j < Gridsize; j++) {
//       board[i][j] = "o"; // Represent empty cell, with value 'o'
//     }
//   }
//   return board;
// }

function generateGrid(grid, prefix) {
  for (let i = 0; i < Gridsize * Gridsize; i++) {
    const miniBlock = document.createElement("div");
    miniBlock.id = prefix + i;
    miniBlock.classList.add("boardCell");
    grid.append(miniBlock);
  }
}

// generate playerboard
generateGrid(playerGrid, "p");

// generate computerboard
generateGrid(computerGrid, "c");

//Create ships / hit and sunk conditions
class ShipCategory {
  constructor(name, length, hitstatus = 0, color = 'beige') {
    this.name = name;
    this.length = length;
    this.hitstatus = hitstatus;
    this.sunk = false;
    this.color = color;
  }

  hit() {
    if (this.hitstatus === this.length) {
      return;
    } else {
      this.hitstatus++;
    }
  }

  isSunk() {
    if (this.hitstatus === this.length) {
      this.sunk = true;
    } else {
      this.sunk = false;
    }
    return this.sunk;
  }
}

//the ships
const smallShips = new ShipCategory("smallShips" , 2, 0 ,'#99518f');
const mediumShip = new ShipCategory("mediumShips",4, 0, '#325685');
const bigShips = new ShipCategory("bigShips",5, 0, '#5b8a3f');

const newShips = [smallShips, mediumShip, bigShips];
// console.log(newShips);
//To check if it is in the ShipCat

//* Random ship placement on computer board //

function allocateShipPieces(ship, retryCount = 0) {
  const allMiniBlocks = document.querySelectorAll("#computerBoard div");
  const randomStartRow = Math.floor(Math.random() * Gridsize);
  const randomStartCol = Math.floor(Math.random() * (Gridsize - ship.length + 1));

  let noOverlap = true;
  for (let i = 0; i < ship.length && noOverlap; i++) {
    const rowIndex = randomStartRow;
    const colIndex = randomStartCol + i;
    const boardIndex = "#c" + (rowIndex * Gridsize + colIndex);

    if (document.querySelector(boardIndex).classList.contains("taken")) {
      noOverlap = false;
    }
  }

  if (noOverlap) {
    for (let i = 0; i < ship.length; i++) {
      const rowIndex = randomStartRow;
      const colIndex = randomStartCol + i;
      const currentIndex = rowIndex * Gridsize + colIndex;
      allMiniBlocks[currentIndex].classList.add("taken", ship.name);
      allMiniBlocks[currentIndex].setAttribute("data-ship-piece", i + 1);
    }
  } else {
    // Limit the number of retries to 5
    if (retryCount < 5) {
      allocateShipPieces(ship, retryCount + 1);
    }
  }
}


// Call the function for each ship
newShips.forEach(allocateShipPieces);

//! Interaction with board //

//*Ship placement // 
function allocateShipPiecesOnPlayerBoard(ship) {
  const allMiniBlocks = document.querySelectorAll("#playerBoard div");
  const randomStartRow = Math.floor(Math.random() * Gridsize);
  const randomStartCol = Math.floor(Math.random() * (Gridsize - ship.length + 1));

  let noOverlap = true;
  for (let i = 0; i < ship.length && noOverlap; i++) {
    const rowIndex = randomStartRow;
    const colIndex = randomStartCol + i;
    const boardIndex = "#p" + (rowIndex * Gridsize + colIndex);

    if (document.querySelector(boardIndex).classList.contains("taken")) {
      noOverlap = false;
    }
  }

  if (noOverlap) {
    for (let i = 0; i < ship.length; i++) {
      const rowIndex = randomStartRow;
      const colIndex = randomStartCol + i;
      const currentIndex = rowIndex * Gridsize + colIndex;
      allMiniBlocks[currentIndex].classList.add("taken", ship.name);
      allMiniBlocks[currentIndex].setAttribute("data-ship-piece", i + 1);
    }
  } else {
    // Retry placement if there's an overlap, limit the retries to 5
    for (let retryCount = 0; retryCount < 5; retryCount++) {
      allocateShipPiecesOnPlayerBoard(ship);
    }
  }
}

// Call the function for each ship to place on the player's board
newShips.forEach(allocateShipPiecesOnPlayerBoard);


//*Ship placement // 



//* Check box
//?Player click on board
function PlayerClick(event) {
  if (!gameOver) {
    const isComputerCell = event.target.id.startsWith('c');

    if (isComputerCell) {
      event.target.textContent = 'x';
      if (event.target.classList.contains('taken')) {
        event.target.style.backgroundColor = 'blue';
        checkWin(computerGrid);
      }
      computerTurn();
    }
  }
}

function computerTurn() {
  if (!gameOver) {
    const playerCells = document.querySelectorAll("#playerBoard .boardCell");
    const randomIndex = Math.floor(Math.random() * playerCells.length);
    const selectedCell = playerCells[randomIndex];
    const isPlayerShip = selectedCell.classList.contains('taken');

    setTimeout(function () {
      if (selectedCell) {
        selectedCell.textContent = 'x';
        if (isPlayerShip) {
          selectedCell.style.backgroundColor = 'blue';
          checkWin(playerGrid);
        }
      }
    }, 500);
  }
}

function checkWin(grid) {
  const takenCells = grid.querySelectorAll('.taken');
  const allShipsSunk = Array.from(takenCells).every(cell => cell.textContent === 'x');
  const descriptionElement = document.getElementById('description');
  
  if (allShipsSunk) {
    gameOver = true;
    if (grid === computerGrid) {
      descriptionElement.textContent = 'Player wins!';
    } else {
      descriptionElement.textContent = 'Computer wins!';
    }
  }
}



// function resetBoard(grid) {
//   const cells = grid.querySelectorAll('.boardCell');
//   cells.forEach(cell => {
//     cell.textContent = '';
//     cell.style.backgroundColor = '';

//     if (cell.classList.contains('taken')) {
//       // Set the background color for cells that are marked as "taken"
//       cell.style.backgroundColor = ShipCategory.color;
//     }

//     cell.classList.remove('taken', 'smallShips', 'mediumShips', 'bigShips');
//     cell.removeAttribute('data-ship-piece');
//   });
// }



function startGame() {
  gameOver = false;
  
  document.getElementById("computerBoard").addEventListener("click", PlayerClick);
}


// Added the event listener for playerGrid outside of startGame
startButton.addEventListener('click', startGame);
