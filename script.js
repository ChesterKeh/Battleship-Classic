//* Variables //
let boardSize = 3; // preset to 3 first at the start.
let playerTurn = true; // to keep track of whose turn it is

const playerBoard = document.getElementById("playerBoard");
const computerBoard = document.getElementById("computerBoard");

// Function to generate random ship positions
function generateRandomShipPositions() {
  const positions = [];
  for (let i = 0; i < 3; i++) {
    // For simplicity, assuming ships are of size 1x1
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    positions.push({ row, col });
  }
  return positions;
}

// Generate random ship positions for player and computer
const playerShipPositions = generateRandomShipPositions();
const computerShipPositions = generateRandomShipPositions();

// Function to draw the grid
function drawGrid(cells, container, shipPositions) {
  container.innerHTML = "";

  const cellSize = 195 / cells;

  for (let i = 0; i < cells; i++) {
    let row = document.createElement("div");
    row.classList.add("rowa");

    for (let j = 0; j < cells; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cella");
      cell.style.width = cellSize + "px";
      cell.style.height = cellSize + "px";
      cell.appendChild(document.createTextNode("\u00A0"));

      // Add event listener for each cell to handle clicks
      cell.addEventListener("click", function () {
        if (playerTurn) {
          handlePlayerClick(this, shipPositions);
        }
        // You can add computer's turn logic here if needed
      });

      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

// Function to handle player clicks
function handlePlayerClick(cell, shipPositions) {
  const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);

  // Check if the clicked cell is part of a ship
  const isHit = isCellPartOfShip(cellIndex, shipPositions);

  // Add visual cues for hits and misses
  if (isHit) {
    cell.classList.add("hit");
  } else {
    cell.classList.add("miss");
  }

  // Switch to the computer's turn
  playerTurn = false;
  setTimeout(handleComputerTurn, 1000);
}
function handleComputerTurn() {
  const randomCellIndex = Math.floor(Math.random() * (boardSize * boardSize));
  const randomCell = playerBoard.children[randomCellIndex];

  const isHit = isCellPartOfShip(randomCellIndex, playerShipPositions);
  if (isHit) {
    randomCell.classList.add("hit");
  } else {
    randomCell.classList.add("miss");
  }
  playerTurn = true;
}

// Function to check if the clicked cell is part of a ship
function isCellPartOfShip(cellIndex, shipPositions) {
  const cellRow = Math.floor(cellIndex / boardSize);
  const cellCol = cellIndex % boardSize;

  return shipPositions.some(
    (position) => position.row === cellRow && position.col === cellCol
  );
}

// Event listener for grid size change
document.getElementById("selectGrid").addEventListener("change", function () {
  boardSize = parseInt(this.value, 10);

  // Generate new random ship positions for player and computer
  const newPlayerShipPositions = generateRandomShipPositions();
  const newComputerShipPositions = generateRandomShipPositions();

  drawGrid(boardSize, playerBoard, newPlayerShipPositions);
  drawGrid(boardSize, computerBoard, newComputerShipPositions);

  playerTurn = true;
});

// Initial draw
drawGrid(boardSize, playerBoard, playerShipPositions);
drawGrid(boardSize, computerBoard, computerShipPositions);
