const form = document.getElementById('item-form');
const inputItem = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const logo = document.getElementById('image');
const filterBox = document.getElementById('form-imput-filter');
const formButton = form.querySelector('button');
let editMode = false;

function loadFromLocalStorage() {
  let itemsFromStorage = getItemsFromLocalStorage();
  if (itemsFromStorage.length > 0) {
    itemsFromStorage.forEach((item) => addItemToDom(item));
  }
  checkUi();
}
function addItem(e) {
  e.preventDefault();
  let input = inputItem.value;
  if (input === '') {
    alert('Please input some value');
    return;
  }
  if (editMode) {
    const itemToEdit = itemList.querySelector('.text-orange-400');
    removeItemFromLocalStorage(itemToEdit);
    itemToEdit.remove();
    editMode = false;
  } else {
    if (checkIfItemExists(input)) {
      alert('Item already exists');
      return;
    }
  }

  //add new  Item to doms
  addItemToDom(input);
  //add to local storage
  addTolocalStorage(input);
  //check the ui
  checkUi();
  inputItem.value = '';
  console.log('success');
}

function addTolocalStorage(item) {
  let itemsFromStorage = getItemsFromLocalStorage();

  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromLocalStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
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

function addItemToDom(item) {
  const listItem = document.createElement('li');
  listItem.className = 'flex w-full justify-between';
  const textNode = document.createTextNode(item);
  listItem.appendChild(textNode);
  const button = createButton('rounded-md text-red-700');
  listItem.appendChild(button);
  itemList.appendChild(listItem);
  return;
}
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('text-red-700')) {
    const item = e.target.parentElement.parentElement;
    removeItem(item);
  } else {
    setItemsToEdit(e.target);
    console.log(1);
  }
}

function setItemsToEdit(item) {
  editMode = true;
  itemList
    .querySelectorAll('li')
    .forEach((item) => item.classList.remove('text-orange-400'));
  item.classList.add('text-orange-400');
  formButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formButton.classList.add('bg-green-500');
  inputItem.value = item.textContent.trim();
}
function removeItem(item) {
  if (confirm('Are you sure to delete?')) {
    item.remove();
    removeItemFromLocalStorage(item);
    checkUi();
  }
}

function removeItemFromLocalStorage(item) {
  const itemValue = item.textContent;

  let itemFromStorage = getItemsFromLocalStorage();

  itemFromStorage = itemFromStorage.filter((i) => i !== itemValue);
  localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function removeAllItems() {
  //this is a bit slow(not sure about it)
  // itemList.innerHTML = '';
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  //clearing all items from local storage
  localStorage.removeItem('items');
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

function checkFilterAndClear() {
  if (itemList.getElementsByTagName('li').length === 0) {
    clearElement('form-imput-filter', true);
    clearElement('clear', true);
  } else {
    clearElement('form-imput-filter', false);
    clearElement('clear', false);
  }
  formButton.innerHTML = '<i class="fa-solid fa-pen"></i> Add Item';
  formButton.classList.remove('bg-green-500');
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromLocalStorage();
  return itemsFromStorage.includes(item);
}

function checkUi() {
  checkFilterAndClear();
}

function init() {
  form.addEventListener('submit', addItem);
  itemList.addEventListener('click', onClickItem);
  clearButton.addEventListener('click', removeAllItems);
  filterBox.addEventListener('input', filterElemets);
  document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

  checkUi();
}
init();
