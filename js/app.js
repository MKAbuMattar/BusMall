'use strict';

const names = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];

const imgSection = document.getElementById('img-section');
const leftImg = document.getElementById('left-img');
const centerImg = document.getElementById('center-img');
const rightImg = document.getElementById('right-img');

const btnScore = document.getElementById('btn-score');

const productList = document.getElementById('product-list');

let leftIndex;
let centerIndex;
let rightIndex;

let numVote = 25;
let totnumVote = 0;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Product(name) {
  this.name = name;
  this.path = (name === 'sweep') ? `./assets/${name}.png` : ((name === 'usb') ? `./assets/${name}.gif` : `./assets/${name}.jpg`); //oneline if/elseif/else
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}
Product.all = [];

for (let i = 0; i < names.length; i++) {
  new Product(names[i]);
}

function render() {
  leftIndex = randomNumber(0, Product.all.length - 1);
  centerIndex = randomNumber(0, Product.all.length - 1);
  rightIndex = randomNumber(0, Product.all.length - 1);

  if (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex) {
    render();
  }
  else {
    leftImg.src = Product.all[leftIndex].path;
    leftImg.alt = Product.all[leftIndex].name;
    leftImg.title = Product.all[leftIndex].name;
    Product.all[leftIndex].views++;

    centerImg.src = Product.all[centerIndex].path;
    centerImg.alt = Product.all[centerIndex].name;
    centerImg.title = Product.all[centerIndex].name;
    Product.all[centerIndex].views++;

    rightImg.src = Product.all[rightIndex].path;
    rightImg.alt = Product.all[rightIndex].name;
    rightImg.title = Product.all[rightIndex].name;
    Product.all[rightIndex].views++;
  }
}

imgSection.addEventListener('click', swapImg);

function swapImg(event) {
  if (event.target.id !== 'images-section') {
    if (event.target.id === leftImg.id) {
      Product.all[leftIndex].votes++;
    }
    else if (event.target.id === centerImg.id) {
      Product.all[centerIndex].votes++;
    }
    else {
      Product.all[rightIndex].votes++;
    }
  }

  totnumVote++;

  if (totnumVote === numVote) {
    btnScore.classList.remove('hide');
  }

  render();
}

btnScore.addEventListener('click', showProductList);

function showProductList() {
  removeProductList();
  const h2El = document.createElement('h2');
  productList.appendChild(h2El);
  h2El.setAttribute('class', 'row center');
  h2El.textContent = 'Product List';
  h2El.id = 'product-list-title';
  const ulEl = document.createElement('ul');
  ulEl.id = 'product-list-item';
  productList.appendChild(ulEl);
  for (let i = 0; i < names.length; i++) {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].views} times.`;
  }
}

function removeProductList() {
  const idItem = document.getElementById('product-list-item');
  const idTitle = document.getElementById('product-list-title');
  if (idItem !== null) {
    idItem.remove();
  }
  if (idTitle !== null) {
    idTitle.remove();
  }
}

render();
