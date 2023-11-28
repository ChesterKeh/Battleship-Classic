//* Variables //
let boardSize = 5; // preset to 3 first at the start.
let playerTurn = true; // to keep track of whose turn it is
let computerTurn = false;

const playerBoard = document.getElementById("playerBoard");
const computerBoard = document.getElementById("computerBoard");

const smallShips = document.getElementById("smlShip");
const mediumShip = document.getElementById("midShip");
const theBigShip = document.getElementById("bigShip");

//* Variables //

//* ship placement first [fixed] *//
const smlShips = [
  { row: 1, col: 2 },
  { row: 3, col: 0 },
];

const midShips = [
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 0, col: 3 },
  { row: 2, col: 2 },
  { row: 2, col: 3 },
  { row: 2, col: 4 },
];

const bigShips = [
  { row: 4, col: 0 },
  { row: 4, col: 1 },
  { row: 4, col: 2 },
  { row: 4, col: 3 },
  { row: 4, col: 4 },
];


//* ship placement first [fixed] *//

//! Function to generate random ship positions //
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
//! Function to generate random ship positions //

// Function to draw the grid
//referance from https://jsfiddle.net/pf4gbm4L/
function drawGrid(cells, container, shipPositions) {
  container.innerHTML = "";

  const cellSize = 200 / cells -1 ;

  for (let i = 0; i < cells; i++) {
    let row = document.createElement("div");
    row.classList.add("rowa");

    for (let j = 0; j < cells; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cella");

      cell.style.width = cellSize + "px";
      cell.style.height = cellSize + "px";
      cell.appendChild(document.createTextNode("\u00A0"));

      // cell.setAttribute("width", "100%");
      // cell.setAttribute("height", "100%");

      //putting the ships down [fixed]
      const isSmlShipPosition = smlShips.some(
        (pos) => pos.row === i && pos.col === j
      );

      const isMidShipPosition = midShips.some(
        (pos) => pos.row === i && pos.col === j
      );

      const isBigShipPosition = bigShips.some(
        (pos) => pos.row === i && pos.col === j
      );

      if (isSmlShipPosition) {
        cell.classList.add("smlShip");
      }

      if (isMidShipPosition) {
        cell.classList.add("midShip");
      }
      if (isBigShipPosition) {
        cell.classList.add("bigShip");
      }

      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

// Event listener for grid size change
document.getElementById("selectGrid").addEventListener("change", function () {
  boardSize = parseInt(this.value, 10);

  // Generate new random ship positions for player and computer

  drawGrid(boardSize, playerBoard, smlShips, midShips, bigShips);
  drawGrid(boardSize, computerBoard, smlShips, midShips, bigShips);

  playerTurn = true;
});

// Initial draw
drawGrid(boardSize, playerBoard, smlShips, midShips, bigShips);
drawGrid(boardSize, computerBoard, smlShips, midShips, bigShips);
