const form = document.getElementById('item-form');
const inputItem = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const logo = document.getElementById('image');
const filterBox = document.getElementById('form-imput-filter');

function addItem(e) {
  e.preventDefault();
  let input = inputItem.value;
  if (input === '') {
    alert('Please input some value');
    return;
  }
  itemList.appendChild(createListItem(input));
  //check the ui
  checkUi();
  inputItem.value = '';
  console.log('success');
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const crossItem = document.createElement('i');
  crossItem.className = classes;
  return crossItem;
}

function createListItem(item) {
  const listItem = document.createElement('li');
  listItem.className = 'flex w-full justify-between';
  const textNode = document.createTextNode(item);
  listItem.appendChild(textNode);
  const button = createButton('rounded-md text-red-700');
  listItem.appendChild(button);
  return listItem;
}
function removeItem(e) {
  if (e.target.parentElement.classList.contains('text-red-700')) {
    const button = e.target.parentElement;
    const li = button.parentElement;
    console.log(li);
    if (confirm('Are you sure to delete?')) {
      itemList.removeChild(li);
      checkUi();
    }
  }
}

function removeAllItems() {
  //this is a bit slow(not sure about it)
  // itemList.innerHTML = '';
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUi();
}

function clearElement(id, clear) {
  const element = document.getElementById(id);
  if (clear) {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
}

function filterElemets(e) {
  const li = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  li.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUi() {
  if (itemList.getElementsByTagName('li').length === 0) {
    clearElement('form-imput-filter', true);
    clearElement('clear', true);
  } else {
    clearElement('form-imput-filter', false);
    clearElement('clear', false);
  }
}

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', removeAllItems);
filterBox.addEventListener('input', filterElemets);

checkUi();
