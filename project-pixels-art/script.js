const colorPalette = document.getElementById('color-palette');
const colors = document.querySelectorAll('.color');
const pixelBoard = document.getElementById('pixel-board');
const pixelBase = document.getElementsByClassName('pixel-base');
const buttonLocal = document.getElementById('button');

let n = 5;

function createInput() {
  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.min = '1';
  input.id = 'board-size';

  buttonLocal.appendChild(input);
}
createInput();

function createButtonIput(nameButtonInput) {
  const buttonInput = document.createElement('button');
  buttonInput.id = 'generate-board';
  buttonInput.innerText = nameButtonInput;

  buttonLocal.appendChild(buttonInput);
}

createButtonIput('VQV');

function submit() {
  const buttonInput = document.getElementById('generate-board');
  buttonInput.addEventListener('click', () => {
    const userInput = document.getElementById('board-size').value;
    if (userInput < '0') {
      alert('Board inválido!');
    } else if (userInput < 5) {
      n = 5;
    } else if (userInput >= 51) { removeBox();
      n = 50;
      createLine();
      createBox();
    } else {
      removeBox();
      n = userInput;
      createLine();
      createBox();
    }
  });
}

submit();

function removeBox() {
  const pixel = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].parentNode.removeChild(pixel[index]);
  }
}

function createLine() {
  for (let indexLine = 0; indexLine < n; indexLine += 1) {
    const divLine = document.createElement('div');
    divLine.classList.add('pixel-base');
    pixelBoard.appendChild(divLine);
  }
}
createLine();

function createBox() {
  for (let index = 0; index < n; index += 1) {
    for (let indexCollumn = 0; indexCollumn < n; indexCollumn += 1) {
      const divCollumn = document.createElement('div');
      divCollumn.classList.add('pixel');

      pixelBase[index].appendChild(divCollumn);
    }
  }
}
createBox();

function selectColor() {
  for (let index = 0; index < colors.length; index += 1) {
    const block = colors[index].id;

    if (block === 'black') {
      colors[index].classList.add('selected');
    }
  }
}
selectColor();

function changeSelectColor() {
  colorPalette.addEventListener('click', (event) => {
    for (let index = 0; index < colors.length; index += 1) {
      const block = colors[index].className;
      if (block.indexOf('selected') >= 0) {
        colors[index].classList.remove('selected');
      }
    } event.target.classList.add('selected');
  });
}
changeSelectColor();

// ref:https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle:

function toPaint() {
  pixelBoard.addEventListener('click', (event) => {
    const selected = document.querySelector('.selected');
    const styles = window.getComputedStyle(selected);
    const colorPixel = styles.getPropertyValue('background-color');

    const localPixel = event.target;
    if (localPixel.id === 'pixel-board') {
      return;
    }
    if (localPixel.style.backgroundColor === colorPixel) {
      localPixel.style.backgroundColor = 'white';
    } else localPixel.style.backgroundColor = colorPixel;
  });
}

toPaint();

function createButtonClear(buttonName) {
  const clearBoard = document.createElement('button');
  clearBoard.id = 'clear-board';
  clearBoard.innerText = buttonName;

  buttonLocal.appendChild(clearBoard);

  clearBoard.addEventListener('click', (event) => {
    const pixel = document.querySelectorAll('.pixel');

    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = 'white';
    }
  });
}
createButtonClear('Limpar');

function randomColors() {
  const r = parseInt(Math.random() * 255);
  const g = parseInt(Math.random() * 255);
  const b = parseInt(Math.random() * 255);

  return `rgb(${r},${g},${b})`;
}

window.onload = function () {
  const color2 = document.getElementById('blue');
  const color3 = document.getElementById('yellow');
  const color4 = document.getElementById('rose');

  color2.style.backgroundColor = randomColors();
  color3.style.backgroundColor = randomColors();
  color4.style.backgroundColor = randomColors();
};
