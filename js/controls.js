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