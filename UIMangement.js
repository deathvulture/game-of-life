import { killCell, birthCell, auxGrid } from './gridManagement.js';
import { CELL_SIZE, GRID_SPACE } from './constants.js';

const startButton = document.getElementById('Start');
const nextButton = document.getElementById('Next');
const pauseButton = document.getElementById('Pause');
const epochsText = document.getElementById('epochs');
const gameCanvas = document.getElementById('game');
const gameContext = gameCanvas.getContext('2d');



//Functionality for editing the cells on the grid with mouse click
let isMouseDown = false;
let lastCell = {x:undefined, y:undefined};
let erasing = undefined;

gameCanvas.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    handleMouseEvent(event);
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
    lastCell = {x:undefined, y:undefined};
    erasing = undefined;
});

gameCanvas.addEventListener("mousemove", (event) => {
    if (isMouseDown) {
        handleMouseEvent(event);
    }
});

export const handleMouseEvent = (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate the cell coordinates based on the click position
    const cellSize = CELL_SIZE + GRID_SPACE;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (lastCell.x == col && lastCell.y == row) {
        return;
    }

    if (erasing == undefined) {
        erasing = auxGrid[row][col] == 1 ? true : false;
    }

    lastCell.x = col;
    lastCell.y = row;
    if (auxGrid[row][col] == 1 && erasing) {
        killCell(row, col);
        return;
    }
    
    if(auxGrid[row][col] == 0 && !erasing) {
        birthCell(row, col);
        return;
    }
}

export { startButton, nextButton, pauseButton, epochsText, gameCanvas, gameContext };