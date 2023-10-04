const canvas = document.getElementById('canvas');
const wordHTML = document.getElementById('word');
const modalWin = document.getElementById('modal');
const retryBtn = document.getElementById('retry');
const message = document.getElementById('message');

const words = ['CAT', 'GINGER', 'HELP', 'HELLO'];
let currentWord = 0;
let word = words[0];
let letters = [];
let apples = [];
let currentLetter = 0;

const size = 10;
const cellSize = 50;
const gap = 5;

const containerSize = cellSize * size + gap * (size-1);
canvas.style.width = `${containerSize}px`; 
canvas.style.height = `${containerSize}px`;
const cells = [];


let snake = [{x: 3, y: 0, block: null}, {x: 2, y: 0, block: null}, {x: 1, y: 0, block: null}, {x: 0, y: 0, block: null}];
let alive = true;

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
  const minC = 255;
  const maxC = 200;
  const lerp = (a, b, t) => {
    return a + (b-a) * t;
  }

  for(const [index, s] of snake.entries()) {
    if(!s.block) {
      const tile = createBlock(s.x, s.y);
      let color = lerp(minC, maxC, index/(snake.length-1));
      tile.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
      if(index === 0) {
        tile.classList.add('head');
      }
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
  if(snake[0].y < 0) {
    snake[0].y = size - 1;
  } else if(snake[0].y > size - 1) {
    snake[0].y = 0;
  } else if(snake[0].x < 0) {
    snake[0].x = size - 1;
  } else if(snake[0].x > size - 1) {
    snake[0].x = 0;
  }
  controls.direction = controls.current;
}

const checks = (last) => {
  for(let i = 0; i < apples.length; i++) {
    if(snake[0].x == apples[i].x && snake[0].y == apples[i].y) {
      if(word[currentLetter] == apples[i].block.innerHTML) {
        
        let formerCL = currentLetter;
        let toDelete = apples[i].block;
        toDelete.classList.add('moving');
        toDelete.style.left = '50%';
        toDelete.style.top = '0px';
        letters[formerCL].classList.add('active');
        setTimeout(() => {
          canvas.removeChild(toDelete);
        }, 2000)
        
        currentLetter++;
        apples.splice(i, 1);
        snake.push({x: last.x, y: last.y});
        return;
      } else {
        updateSnake();
        alive = false;
      }
    }
  }
  checkDeath();
}
const checkDeath = () => {
  // if(snake[0].x < 0 || snake[0].x >= size || snake[0].y < 0 || snake[0].y >= size) {
  //   alive = false;
  //   return;
  // } //BORDERS
  for(let i = 1; i < snake.length - 1; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      alive = false;
      return;
    }
  }
}

for(let y = 0; y < size; y++) {
  cells[y] = [];
  for(let x = 0; x < size; x++) {
    const tile = createBlock(x, y);
    cells[y][x] = tile;
  }
}

const generateApples = () => {
  for(let i = 0; i < word.length; i++) {
    let rand = [Math.floor(Math.random() * size), Math.floor(Math.random() * (size-1) + 1)];
    let ok = false;
    if(i != 0) {
      while(!ok) {
        ok = true;
        rand = [Math.floor(Math.random() * size), Math.floor(Math.random() * (size-1) + 1)];
        for(let i = 0; i < apples.length; i++) {
          if(rand[0] === apples[i].x && rand[1] === apples[i].y) {
            ok = false;
          }
        }
        if(ok) break;
      }
    }
    
    const tile = createBlock(rand[0], rand[1]);
    tile.classList.add('apple');
    tile.innerHTML = word[i];
    apples[i] = {x: rand[0], y: rand[1], block: tile};
  }
}

const animate = () => {
  let last = snake[snake.length - 1];
  if(alive)moveSnake();
  checks(last);
  if(alive)updateSnake();
  else showModal(false);
  if(apples.length === 0) {
    showModal(true);
  }

  if(alive) {
    setTimeout(() => {
      animate();
    }, 500);
  }
}

const initGame = () => {
  letters = [];
  apples = [];
  currentLetter = 0;
  word = words[currentWord];
  alive = true;
  snake = [ {x: 2, y: 0, block: null}, {x: 1, y: 0, block: null}, {x: 0, y: 0, block: null}];

  for(let i=0; i<word.length; i++) {
    const letter = document.createElement('div');
    letter.classList.add('letter');
    letter.innerHTML = word[i];
    letters[i] = letter;
    wordHTML.appendChild(letter);
  }
  generateApples();
  animate();
}
initGame();

const showModal = (success) => {
  if(success) {
    alive = false;
    message.innerHTML = 'You win!';
    retryBtn.innerHTML = 'Next';
    currentWord++;
  } else {
    message.innerHTML = 'You lose!';
    retryBtn.innerHTML = 'Try again';
  }
  modalWin.classList.add('open');
  controls.direction = 'right';
  controls.current = 'right';
};
retryBtn.addEventListener('click', () => {
  letters.forEach((letter) => {
    wordHTML.removeChild(letter);
  })
  snake.forEach((snake) => {
    canvas.removeChild(snake.block)
  })
  apples.forEach((apple) => {
    canvas.removeChild(apple.block)
  })
  modalWin.classList.remove('open');
  initGame();
})



