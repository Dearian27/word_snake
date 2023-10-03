const canvas = document.getElementById('canvas');

const size = 8;
const cellSize = 20;
const gap = 2;

const containerSize = cellSize * size + gap * (size-1);
canvas.style.width = `${containerSize}px`; 
canvas.style.height = `${containerSize}px`;
canvas.style.backgroundColor = 'black';

const cells = [];

for(let y = 0; y < size; y++) {
  for(let x = 0; x < size; x++) {
    const tile = document.createElement 
    
    cells[y][x] = 1;
  }
}

