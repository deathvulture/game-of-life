import { CELL_SIZE, GRID_SPACE } from "./constants.js";
import { drawCells, drawCell, gameCanvas } from "./canvasManager.js";

const columns = Math.floor(gameCanvas.width / (CELL_SIZE + GRID_SPACE));
const rows = Math.floor(gameCanvas.height / (CELL_SIZE + GRID_SPACE));

let grid = new Array(rows).fill().map(() => new Array(columns).fill(0));
let auxGrid = new Array(rows).fill().map(() => new Array(columns).fill(0));

const updateGrid = () =>{
    
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            const neighbors = checkNeighbors(rowIndex, cellIndex);
            //Death by solitud or overpopulation
            if (cell == 1 && (neighbors < 2 || neighbors > 3)) {
                updateCell(rowIndex, cellIndex, 0);
            } 
            //Birth by reproduction
            else if (cell == 0 && neighbors == 3){
                updateCell(rowIndex, cellIndex, 1);
            }
        });
    });
    updateGridFromAux();
}

const updateGridFromAux = () =>{
    grid = auxGrid.map(row => row.slice());
}

const updateCell = (row, col, value) =>{
    drawCell(row, col, value);
    auxGrid[row][col] = value;
}

const checkNeighbors = (row, col) => {
    let count = 0;
    for (let i = row -1; i < row + 2; i++) {
        if (i >= 0 && i + 1 < rows) {
            if (col - 1 >= 0 && grid[i][col -1] == 1) {
                count++;
            }
            
            if (i != row && grid[i][col] == 1) {
                count++;
            }

            if (col + 1 < columns && grid[i][col + 1] == 1) {
                count++;
            }
        }
    }
    return count;
}

const insertPrefab = (cells, offSet = [0,0]) => {
    for (let i = 0; i < cells.length; i++){
        if (cells[i] + offSet[1] < rows && cells[i+1] + offSet[0] < columns) {
            updateCell(cells[i] + offSet[1], cells[i+1] + offSet[0], 1);
        }
        i++;    
    }
}

const clearGrid = () => {
    grid = new Array(rows).fill().map(() => new Array(columns).fill(0));
    auxGrid = new Array(rows).fill().map(() => new Array(columns).fill(0));
    drawCells(grid);
}

export { updateGrid, updateCell, grid, auxGrid, insertPrefab, clearGrid, updateGridFromAux };