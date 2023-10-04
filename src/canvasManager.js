
import { CELL_SIZE, GRID_SPACE } from "./constants.js";

const gameCanvas = document.getElementById('game');
const gameContext = gameCanvas.getContext('2d');

gameCanvas.width = window.innerWidth * 0.99;
gameCanvas.height = window.innerHeight * 0.8;

const drawBackground = () => {
    gameContext.fillStyle = "#000";
    gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);    
}

const drawCells = (grid) => {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            gameContext.fillStyle = cell == 1 ? "#000" : "#ffb000";
            gameContext.fillRect(cellIndex * (CELL_SIZE + GRID_SPACE), rowIndex * (CELL_SIZE + GRID_SPACE), CELL_SIZE, CELL_SIZE);
        });
    });
}

const drawCell = (row, col, value) => {
    gameContext.fillStyle = value == 1 ? "#000" : "#ffb000";
    gameContext.fillRect(col * (CELL_SIZE + GRID_SPACE), row * (CELL_SIZE + GRID_SPACE), CELL_SIZE, CELL_SIZE);
}

export { gameCanvas, gameContext, drawCells, drawBackground, drawCell }