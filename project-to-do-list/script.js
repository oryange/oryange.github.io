const listID = 'lista-tarefas';
const listItems = document.getElementById(listID);

function buttonCreateItem() {
  const button = document.getElementById('criar-tarefa');

  button.addEventListener('click', () => {
    const inputUser = document.getElementById('texto-tarefa');
    const list = document.createElement('li');
    list.className = 'list-item';
    list.innerText = inputUser.value;

    listItems.appendChild(list);

    inputUser.value = '';
  });
}
buttonCreateItem();

function select() {
  listItems.addEventListener('click', (event) => {
    const list = document.querySelectorAll('.list-item');

    for (let index = 0; index < list.length; index += 1) {
      list[index].classList.remove('select');
    } event.target.classList.add('select');
  });
}
select();
const itemSelect = document.getElementsByClassName('select');

function finished() {
  listItems.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('completed') === true) {
      event.target.classList.remove('completed');
    } else {
      event.target.classList.add('completed');
    }
  });
}
finished();

function buttonClear() {
  const button = document.getElementById('apaga-tudo');

  button.addEventListener('click', () => {
    const items = document.querySelectorAll('.list-item');

    for (let index = 0; index < items.length; index += 1) {
      items[index].parentNode.removeChild(items[index]);
    }
  });
}

buttonClear();

function buttonFinished() {
  const buttonF = document.getElementById('remover-finalizados');

  buttonF.addEventListener('click', () => {
    const finishedItems = document.querySelectorAll('.completed');
    for (let index = 0; index < finishedItems.length; index += 1) {
      finishedItems[index].parentNode.removeChild(finishedItems[index]);
    }
  });
}

buttonFinished();

function buttonSave() {
  const saveButton = document.getElementById('salvar-tarefas');

  saveButton.addEventListener('click', () => {
    localStorage.setItem(listID, listItems.innerHTML);
  });
  const saved = localStorage.getItem(listID);
  listItems.innerHTML = saved;
}

buttonSave();

function buttonUp() {
  const moveUp = document.getElementById('mover-cima');

  moveUp.addEventListener('click', () => {
    for (let index = 0; index < itemSelect.length; index += 1) {
      if (itemSelect[index].previousElementSibling != null) {
        const item = itemSelect[index];
        listItems.insertBefore(item, item.previousSibling);
      }
    }
  });
}

buttonUp();

function buttonDown() {
  const moveDown = document.getElementById('mover-baixo');
  moveDown.id = 'mover-baixo';

  moveDown.addEventListener('click', () => {
    for (let index = 0; index < itemSelect.length; index += 1) {
      if (itemSelect[index].nextElementSibling != null) {
        const item = itemSelect[index];
        listItems.insertBefore(item.nextSibling, item);
      }
    }
  });
}

buttonDown();

function buttonRemoveSelect() {
  const removeSelect = document.getElementById('remover-selecionado');

  removeSelect.addEventListener('click', () => {
    for (let index = 0; index < itemSelect.length; index += 1) {
      const classItem = itemSelect[index].className;
      if (classItem === 'select') {
        itemSelect[index].parentNode.removeChild(itemSelect[index]);
      }
    }
  });
}

buttonRemoveSelect();
