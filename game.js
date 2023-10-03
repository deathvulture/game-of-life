import { UPDATE_INTERVAL } from './constants.js';
import { initialDraw, updateGrid } from './gridManagement.js';
import {startButton, nextButton, pauseButton,epochsText, gameCanvas} from './UIMangement.js';

let isPaused = false;

//button actions
nextButton.onclick = () => updateGrid();
pauseButton.onclick = () => {
    isPaused = !isPaused;
}
startButton.onclick = () => update(0);

//Set the canvas size
gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight * 0.8;

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
        updateGrid();
        epochs++;
        epochsText.innerHTML = `Epochs: ${epochs}`;
    }
    window.requestAnimationFrame(update);
}


initialDraw();