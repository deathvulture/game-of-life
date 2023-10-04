import { auxGrid, insertPrefab, updateCell, clearGrid } from './gridManager.js';
import { CELL_SIZE, GRID_SPACE } from './constants.js';
import prefabs from './prefabs.js';
import { gameCanvas } from './canvasManager.js';



const startButton = document.getElementById('Start');
const nextButton = document.getElementById('Next');
const printButton = document.getElementById('PrintGrid');
const stampButton = document.getElementById('Stamp');
const clearButton = document.getElementById('Clear');

const selectPrefabs = document.getElementById('prefabs');

const epochsText = document.getElementById('epochs');

//Fill the select with the prefabs
Object.keys(prefabs).forEach(prefab => {
    const option = document.createElement('option');
    option.value = prefab;
    option.innerText = prefab;
    selectPrefabs.appendChild(option);
});


//Functionality for editing the cells on the grid with mouse click
let isMouseDown = false;
let lastCell = {x:undefined, y:undefined};
let erasing = undefined;
let stamping = false;

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

const handleMouseEvent = (event) => {
    const [col, row] = getCellFromMousePosition(event.clientX, event.clientY);

    if (stamping) {
        insertPrefab(prefabs[selectPrefabs.value].split('x').map(Number),[col, row]);
        stamping = false;
        return;
    }

    if (lastCell.x == col && lastCell.y == row) {
        return;
    }

    if (erasing == undefined) {
        erasing = auxGrid[row][col] == 1 ? true : false;
    }

    lastCell.x = col;
    lastCell.y = row;

    if (auxGrid[row][col] == 1 && erasing) {
        updateCell(row, col, 0);
    } else if(auxGrid[row][col] == 0 && !erasing) {
        updateCell(row, col, 1);
    }
}


const getCellFromMousePosition = (mouseX, mouseY) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = mouseX - rect.left;
    const y = mouseY - rect.top;
    // Calculate the cell coordinates based on the click position
    const cellSize = CELL_SIZE + GRID_SPACE;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    return [col, row];
}

const updateEpochs = (quantity) => {
    epochsText.innerHTML = `Epochs: ${quantity}`;
}

printButton.onclick = () => {
    //print to console an array with the cells with 1s from the auxGrid
    const cells = [];
    auxGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 1) {
                cells.push(rowIndex);
                cells.push(colIndex);
            }
        });
    });
    console.log(cells.join("x"));
}

clearButton.onclick = () => {
    clearGrid();
}

stampButton.onclick = () => {
    stamping = true;
}


export { startButton, nextButton,printButton, updateEpochs};