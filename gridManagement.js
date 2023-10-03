import { GRID_HEIGHT, GRID_WIDTH, CELL_SIZE, GRID_SPACE } from "./constants.js";
import { gameCanvas, gameContext } from "./UIMangement.js";

let grid = new Array(GRID_HEIGHT).fill().map(() => new Array(GRID_WIDTH).fill(0));
let auxGrid = new Array(GRID_HEIGHT).fill().map(() => new Array(GRID_WIDTH).fill(0));


auxGrid[52][50] = 1;
auxGrid[52][51] = 1;
auxGrid[52][52] = 1;
auxGrid[52][54] = 1;
auxGrid[53][50] = 1;
auxGrid[54][53] = 1;
auxGrid[54][54] = 1;
auxGrid[55][51] = 1;
auxGrid[55][52] = 1;
auxGrid[55][54] = 1;
auxGrid[56][50] = 1;
auxGrid[56][52] = 1;
auxGrid[56][54] = 1;

grid  = auxGrid.map(row => row.slice());

const updateGrid = () =>{
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            const neighbors = checkNeighbors(rowIndex, cellIndex);
            //Death by solitud or overpopulation
            if (cell == 1 && (neighbors < 2 || neighbors > 3)) {
                killCell(rowIndex, cellIndex);
            } 
            //Birth by reproduction
            else if (cell == 0 && neighbors == 3){
                birthCell(rowIndex, cellIndex);
            }
        });
    });
    grid = auxGrid.map(row => row.slice());
}

const killCell = (row, col) =>{
    gameContext.fillStyle = "#ffb000";
    gameContext.fillRect(col * (CELL_SIZE + GRID_SPACE), row * (CELL_SIZE + GRID_SPACE), CELL_SIZE, CELL_SIZE);
    auxGrid[row][col] = 0;
}

const birthCell = (row, col) =>{
    gameContext.fillStyle = "#000";
    gameContext.fillRect(col * (CELL_SIZE + GRID_SPACE), row * (CELL_SIZE + GRID_SPACE), CELL_SIZE, CELL_SIZE);
    auxGrid[row][col] = 1;
}

const initialDraw = () =>{
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            gameContext.fillStyle = cell == 1 ? "#000" : "#ffb000";
            gameContext.fillRect(cellIndex * (CELL_SIZE + GRID_SPACE), rowIndex * (CELL_SIZE + GRID_SPACE), CELL_SIZE, CELL_SIZE);
            
        });
    });
}

const checkNeighbors = (row, col) => {
    let count = 0;
    for (let i = row -1; i < row + 2; i++) {
        if (i >= 0 && i + 1 < GRID_HEIGHT) {
            if (col - 1 >= 0 && grid[i][col -1] == 1) {
                count++;
            }
            
            if (i != row && grid[i][col] == 1) {
                count++;
            }

            if (col + 1 < GRID_WIDTH && grid[i][col + 1] == 1) {
                count++;
            }
        }
    }
    return count;
}


export { updateGrid, initialDraw, killCell, birthCell, grid, auxGrid };