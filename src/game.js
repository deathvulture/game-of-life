import { drawCells, drawBackground, gameCanvas, gameContext } from './canvasManager.js';
import { UPDATE_INTERVAL, CELL_SIZE } from './constants.js';
import { updateGrid, auxGrid, updateGridFromAux } from './gridManager.js';
import {startButton, nextButton, updateEpochs } from './UIManager.js';

let isPaused = false;

//button actions
nextButton.onclick = () => {
    if (epochs == 0) updateGridFromAux();
    drawBackground();
    drawCells(auxGrid);
    updateGrid();
    epochs++;
    updateEpochs(epochs);
}

startButton.onclick = () => {
    if (epochs == 0) updateGridFromAux();
    if (elapsedTime == 0) {
        update(0);
        startButton.innerHTML = "Stop";
        return;
    }
    
    if (isPaused) {
        isPaused = false;
        startButton.innerHTML = "Stop";
    } else {
        isPaused = true;
        startButton.innerHTML = "Start";
    }
}

//Iterations
let epochs = 0;

//Initialize the time variables
let newLoopStart = 0;
let elapsedTime = 0;


const update = (timeFromStart) => {
    elapsedTime = timeFromStart - newLoopStart;
    if (elapsedTime > UPDATE_INTERVAL && !isPaused){
        newLoopStart = timeFromStart;
        elapsedTime = 0;
        drawBackground();
        drawCells(auxGrid);
        updateGrid();
        epochs++;
        updateEpochs(epochs);
    }
    window.requestAnimationFrame(update);
}

drawCells(auxGrid);