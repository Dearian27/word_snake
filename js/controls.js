const controls = {
  direction: 'right', 
  current: 'right', 
}
document.onkeydown = (event) => {
  switch(event.keyCode) {
    case 87: if(controls.direction !== 'down') controls.current = 'up'; break; // W
    case 38: if(controls.direction !== 'down') controls.current = 'up'; break; // W
    case 83: if(controls.direction !== 'up') controls.current = 'down'; break; // S
    case 40: if(controls.direction !== 'up') controls.current = 'down'; break; // S
    case 65: if(controls.direction !== 'right') controls.current = 'left'; break; // A
    case 37: if(controls.direction !== 'right') controls.current = 'left'; break; // A
    case 68: if(controls.direction !== 'left') controls.current = 'right'; break; // D
    case 39: if(controls.direction !== 'left') controls.current = 'right'; break; // D
  }
}

let startX, startY, endX, endY;

window.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});


const deltaX = 0;
const deltaY = 0;
window.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Забороніть прокрутку сторінки при свайпі
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Опрацювання зміни координат пальця для керування грою
    // Наприклад, зміна напрямку руху гравця у грі Змійка
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        controls.current = 'right';
        // Свайп вправо
      } else {
        controls.current = 'left';
        // Свайп вліво
      }
    } else {
      if (deltaY > 0) {
        controls.current = 'down';
        // Свайп вниз
      } else {
        controls.current = 'up';
          // Свайп вгору
      }
    }
});