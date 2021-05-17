const listID = 'task-list';
const listItems = document.getElementById(listID);
const inputUser = document.getElementById('task-input');
const inputUserHour = document.getElementById('hour-input');
const buttonItems = document.getElementById('create-task');
const counter = document.getElementById('counter');
counter.innerHTML = 0;

window.onload = counterHours;

function buttonCreateItem () {
  
  const list = document.createElement('li');
  list.className = 'list-item';
  list.innerHTML = `${inputUser.value} | Time to do: <span>${inputUserHour.value}</span>h`
  
  listItems.appendChild(list);
  
  inputUser.value = '';
  inputUserHour.value = '';
  counterHours();
}

buttonItems.addEventListener('click', buttonCreateItem);

function buttonUp() {
  for (let index = 0; index < itemSelect.length; index += 1) {
    if (itemSelect[index].previousElementSibling != null) {
      const item = itemSelect[index];
      listItems.insertBefore(item, item.previousSibling);
    }
  }
}
const moveUp = document.getElementById('move-up');
moveUp.addEventListener('click', buttonUp);


function buttonDown() {
  for (let index = 0; index < itemSelect.length; index += 1) {
    if (itemSelect[index].nextElementSibling != null) {
      const item = itemSelect[index];
      listItems.insertBefore(item.nextSibling, item);
    }
  }
}
const moveDown = document.getElementById('move-down');
moveDown.addEventListener('click', buttonDown)

function counterHours() {
  const fullList = document.querySelectorAll('.list-item');
  let sumHours = 0;
  fullList.forEach(item => {
    const hour = item.querySelector('span').textContent;
    sumHours += Number(hour);
  }) 
  counter.innerHTML = sumHours;
}

const addAndRemoveSelect = (event) => {
  const list = document.querySelectorAll('.list-item');
  for (let index = 0; index < list.length; index += 1) {
    list[index].classList.remove('selected');
  } 
  event.target.classList.add('selected');
}

listItems.addEventListener('click', addAndRemoveSelect);

const finished = (event) => {
  if (event.target.classList.contains('completed') === true) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed')
  }
}

listItems.addEventListener('dblclick', finished);

const  buttonClear = () => {
  const items = document.querySelectorAll('.list-item');

  for (let index = 0; index < items.length; index += 1) {
    items[index].parentNode.removeChild(items[index]);
  }
  counterHours();
}
const buttonClearAll = document.getElementById('clear-all');
buttonClearAll.addEventListener('click', buttonClear)


function buttonFinished() {
  const finishedItems = document.querySelectorAll('.completed');

  for (let index = 0; index < finishedItems.length; index += 1) {
    finishedItems[index].parentNode.removeChild(finishedItems[index]);
  }
  counterHours();
}
const buttoncompleted = document.getElementById('remove-completed');
buttoncompleted.addEventListener('click', buttonFinished)


function buttonSave() {
  const saveButton = document.getElementById('save-all');

  saveButton.addEventListener('click', () => {
    localStorage.setItem(listID, listItems.innerHTML);
  });
  const saved = localStorage.getItem(listID);
  listItems.innerHTML = saved;
}

buttonSave();

const itemSelect = document.getElementsByClassName('selected');
function selectedRemover() {
  for (let index = 0; index < itemSelect.length; index += 1) {
    const classItem = itemSelect[index].className;
    if (classItem.indexOf('selected') > -1) {
        itemSelect[index].parentNode.removeChild(itemSelect[index]);
      }
  }
    counterHours();
}
const removeSelect = document.getElementById('remove-selected');
removeSelect.addEventListener('click', selectedRemover)
