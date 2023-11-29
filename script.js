// //* Variables //
// let boardSize = 5; // preset to 3 first at the start.
// let playerTurn = true; // to keep track of whose turn it is
// let computerTurn = false;

// const playerBoard = document.getElementById("playerBoard");
// const computerBoard = document.getElementById("computerBoard");

// const smallShips = document.getElementById("smlShip");
// const mediumShip = document.getElementById("midShip");
// const theBigShip = document.getElementById("bigShip");

// //* Variables //

// //* ship placement first [fixed] *//
// const smlShips = [
//   { row: 1, col: 2 },
//   { row: 3, col: 0 },
// ];

// const midShips = [
//   { row: 0, col: 1 },
//   { row: 0, col: 2 },
//   { row: 0, col: 3 },
//   { row: 2, col: 2 },
//   { row: 2, col: 3 },
//   { row: 2, col: 4 },
// ];

// const bigShips = [
//   { row: 4, col: 0 },
//   { row: 4, col: 1 },
//   { row: 4, col: 2 },
//   { row: 4, col: 3 },
//   { row: 4, col: 4 },
// ];

// //* ship placement first [fixed] *//

// //! Function to generate random ship positions //
// function generateRandomShipPositions() {
//   const positions = [];
//   for (let i = 0; i < 3; i++) {
//     // For simplicity, assuming ships are of size 1x1
//     const row = Math.floor(Math.random() * boardSize);
//     const col = Math.floor(Math.random() * boardSize);
//     positions.push({ row, col });
//   }
//   return positions;
// }
// //! Function to generate random ship positions //

// // Function to draw the grid
// //referance from https://jsfiddle.net/pf4gbm4L/
// function drawGrid(cells, container, playerShips, computerShips) {
//   playercontainer.innerHTML = "";
//   computerContainer.innerHTML ="";

//   const cellSize = 200 / cells - 1;

//   for (let i = 0; i < cells; i++) {
//     let row = document.createElement("div");
//     row.classList.add("rowa");

//     for (let j = 0; j < cells; j++) {
//       let cell = document.createElement("div");
//       cell.classList.add("cella");

//       cell.style.width = cellSize + "px";
//       cell.style.height = cellSize + "px";
//       cell.appendChild(document.createTextNode("\u00A0"));

//       // cell.setAttribute("width", "100%");
//       // cell.setAttribute("height", "100%");

//       //putting the ships down [fixed]
//       const isSmlShipPosition = smlShips.some(
//         (pos) => pos.row === i && pos.col === j
//       );

//       const isMidShipPosition = midShips.some(
//         (pos) => pos.row === i && pos.col === j
//       );

//       const isBigShipPosition = bigShips.some(
//         (pos) => pos.row === i && pos.col === j
//       );

//       if (isSmlShipPosition) {
//         cell.classList.add("smlShip");
//       }

//       if (isMidShipPosition) {
//         cell.classList.add("midShip");
//       }
//       if (isBigShipPosition) {
//         cell.classList.add("bigShip");
//       }

//       row.appendChild(cell);
//     }
//     container.appendChild(row);
//   }
// }

// // Interaction with grid

// // Event listener for grid size change
// document.getElementById("selectGrid").addEventListener("change", function () {
//   boardSize = parseInt(this.value, 10);

//   // Generate new random ship positions for player and computer

//   drawGrid(boardSize, playerBoard, smlShips, midShips, bigShips);
//   drawGrid(boardSize, computerBoard, smlShips, midShips, bigShips);

//   playerTurn = true;
// });

// // Initial draw
// drawGrid(boardSize, playerBoard, smlShips, midShips, bigShips);
// drawGrid(boardSize, computerBoard, smlShips, midShips, bigShips);

//! Attempt number 1 ^//

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




function resetBoard(grid, clearShips = true) {
  const cells = grid.querySelectorAll('.boardCell');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '';
    if (!cell.classList.contains('taken')) {
    }
    if (clearShips) {
      cell.classList.remove('smallShips', 'mediumShips', 'bigShips');
      cell.removeAttribute('data-ship-piece');
    }
  });
}

function startGame() {
  gameOver = false;
  resetBoard(playerGrid);
  resetBoard(computerGrid);
  document.getElementById("computerBoard").addEventListener("click", PlayerClick);
}

// Added the event listener for playerGrid outside of startGame
startButton.addEventListener('click', startGame);
