// Split cells into equal columns.
const grid = document.querySelector('.grid');
function drawColumn(cells) {
  const column = document.createElement('div');
  column.className = 'column';
  column.appendChild(cells);
  grid.appendChild(column);
}

// If a grid already exists, delete it.
function checkGridNotAlreadyDrawn() {
  if (document.querySelector('.cell')) {
    const drawnColumns = document.querySelectorAll('.column');
    for (const drawnColumn of drawnColumns) {
      grid.removeChild(drawnColumn);
    }
  }
}

// On submit, draw a grid with the desired dimensions.
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const xAmount = document.querySelector('#x-amount').value;
  const yAmount = document.querySelector('#y-amount').value;
  drawGrid(xAmount, yAmount);
});

// If a grid doesn't already exist, draw a grid of colourable cells with its 
// dimensions defined by user input.
let selectedColour = 'black';
function drawGrid(xAmount, yAmount) {
  checkGridNotAlreadyDrawn();
  const cells = document.createDocumentFragment();
  for (let i = 0; i <= xAmount * yAmount; i++) {
    if (i > 0 && i % yAmount === 0) {
      drawColumn(cells);
    }
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('mouseover', (e) => {
      if (e.buttons === 1) {
        cell.style = `background-color: ${selectedColour};`;
      }
    });
    cells.appendChild(cell);
  }
}

// Draw a default 150x150 grid on page load.
window.addEventListener('load', () => {
  drawGrid(150, 150);
});

// Prevent cells from being draggable.
document.addEventListener('dragstart', (e) => {
  if (e.target.parentNode.localName === 'div') {
    e.preventDefault();
  }
});

// TODO: make colours selected look held down and fix broken fill and clear
// Change between the fill, clear, and transparent and colour modes when the 
// appropriate button is selected.
const buttons = document.querySelectorAll('button');
const cells = document.querySelectorAll('.cell');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.getAttribute('id') === 'fill') {
      cells.forEach((cell) => {
        cell.style = `background-color: ${selectedColour};`;
    });
    } else if (button.getAttribute('id') === 'clear') {
      cells.forEach((cell) => {
        cell.style.removeProperty('background-color');
    });
    } else {
      selectedColour = button.getAttribute('id');
    }
  });
});