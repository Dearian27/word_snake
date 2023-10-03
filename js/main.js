const canvas = document.getElementById('canvas');
const wordHTML = document.getElementById('word');

const word = 'CONCAT';
const letters = [];
const apples = [];
let currentLetter = 0;

for(let i=0; i<word.length; i++) {
  const letter = document.createElement('div');
  letter.classList.add('letter');
  letter.innerHTML = word[i];
  letters[i] = letter;
  wordHTML.appendChild(letter);
}

const size = 10;
const cellSize = 30;
const gap = 5;

const containerSize = cellSize * size + gap * (size-1);
canvas.style.width = `${containerSize}px`; 
canvas.style.height = `${containerSize}px`;
// canvas.style.backgroundColor = 'black';

const cells = [];
const objects = [];
for(let y = 0; y < size; y++) {
  objects[y] = [];
}


window.addEventListener('resize', () => {});

const createBlock = (x, y) => {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.style.height = `${cellSize}px`;
  tile.style.width = `${cellSize}px`;
  tile.style.top = `${cellSize * y + gap * y}px`;
  tile.style.left = `${cellSize * x + gap * x}px`;
  canvas.appendChild(tile);
  return tile;
}
const updateSnake = () => {
  for(s of snake) {
    if(!s.block) {
      const tile = createBlock(s.x, s.y);
      tile.style.backgroundColor = 'white';
      s.block = tile;
    } else {
      s.block.style.top = `${cellSize * s.y + gap * s.y}px`;
      s.block.style.left = `${cellSize * s.x + gap * s.x}px`;
    }
  }
}
const moveSnake = () => {
  let x = 0;
  let y = 0;
  switch(controls.current) {
    case "up": y = -1; break;
    case "down": y = 1; break;
    case "left": x = -1; break;
    case "right": x = 1; break;
  }

  //TODO (snake.length-1 / 20) * x SNAKE BODY COLORING
  cells[snake[snake.length-1].y][snake[snake.length-1].x].classList.add('shadow');
  
  for(let i = snake.length - 1; i >= 1; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  snake[0].y += y;
  snake[0].x += x;

  controls.direction = controls.current;
}
const letterCheck = () => {
  for(let i = 0; i < apples.length; i++) {
    if(snake[0].x == apples[i].x && snake[0].y == apples[i].y) {
      if(word[currentLetter] == apples[i].block.innerHTML) {
        letters[currentLetter].classList.add('active');
        currentLetter++;
        canvas.removeChild(apples[i].block);
        apples.splice(i, 1);
      } else {
        updateSnake();
        alive = false;
      }
    }
  }
}
const checkDeath = () => {
  if(snake[0].x < 0 || snake[0].x >= size || snake[0].y < 0 || snake[0].y >= size) {
    alive = false;
    return;
  }
  for(let i = 1; i < snake.length - 1; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      alive = false;
      return;
    }
  }
}

const snake = [{x: 5, y: 0, block: null}, {x: 4, y: 0, block: null}, {x: 3, y: 0, block: null}, {x: 2, y: 0, block: null}, {x: 1, y: 0, block: null}, {x: 0, y: 0, block: null}];
let alive = true;

for(let y = 0; y < size; y++) {
  cells[y] = [];
  for(let x = 0; x < size; x++) {
    const tile = createBlock(x, y);
    cells[y][x] = tile;
  }
}


const generateApples = () => {
  for(let i = 0; i < word.length; i++) {
    const rand = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)]
    const tile = createBlock(rand[0], rand[1]);
    tile.classList.add('apple');
    tile.innerHTML = word[i];
    apples[i] = {x: rand[0], y: rand[1], block: tile};
  }
}
generateApples();





const animate = () => {
  if(alive)moveSnake();
  letterCheck();
  checkDeath();
  if(alive)updateSnake();

  setTimeout(() => {
    animate();
  }, 300);
}
animate();