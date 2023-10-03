// Define button properties
const buttonX = 50;
const buttonY = 50;
const buttonWidth = 100;
const buttonHeight = 40;

// Draw the button
function drawButton() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText('Click Me', buttonX + 10, buttonY + 25);
}

// Check if a point is inside the button
function isInsideButton(x, y) {
    return x >= buttonX && x <= buttonX + buttonWidth && y >= buttonY && y <= buttonY + buttonHeight;
}

// Handle mouse click event
canvas.addEventListener('click', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    if (isInsideButton(mouseX, mouseY)) {
        alert('Button clicked!');
    }
});

// Initial drawing
drawButton();