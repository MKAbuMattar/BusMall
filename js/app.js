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

const attemptSection = document.getElementById('attempt-section');

const imgSection = document.getElementById('img-section');
const leftImg = document.getElementById('left-img');
const centerImg = document.getElementById('center-img');
const rightImg = document.getElementById('right-img');

const btnScore = document.getElementById('btn-score');

const productList = document.getElementById('product-list');

const chartSection = document.getElementById('chart-section');

let ctx = document.getElementById('myChart').getContext('2d');

let leftIndex;
let centerIndex;
let rightIndex;

let attempts = 25;
let totAttempt = 0;

let dbAttempt = Number(localStorage.getItem('totAttempt'));

if (dbAttempt !== 0) {
  totAttempt = dbAttempt;
  console.log(totAttempt);
  renderAttemptCount();
}

let views = [];
let votes = [];

let temp = [];

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

function settingItem() {
  let data = JSON.stringify(Product.all);
  localStorage.setItem('Product', data);
  localStorage.setItem('totAttempt', totAttempt);
}

function render() {

  leftIndex = Number(randomNumber(0, Product.all.length - 1));
  centerIndex = Number(randomNumber(0, Product.all.length - 1));
  rightIndex = Number(randomNumber(0, Product.all.length - 1));

  if (leftIndex === centerIndex || centerIndex === rightIndex || leftIndex === rightIndex) {
    // console.log(`${leftIndex},${centerIndex},${rightIndex}`);
    render();
  } else if (temp.includes(leftIndex)) {
    // console.log(`leftIndex: ${temp} == ${leftIndex}`);
    render();
  } else if (temp.includes(centerIndex)) {
    // console.log(`centerIndex: ${temp} == ${centerIndex}`);
    render();
  } else if (temp.includes(rightIndex)) {
    // console.log(`rightIndex: ${temp} == ${rightIndex}`);
    render();
  } else {
    temp = [];

    leftImg.src = Product.all[leftIndex].path;
    leftImg.alt = Product.all[leftIndex].name;
    leftImg.title = Product.all[leftIndex].name;
    temp.push(Number(leftIndex));

    centerImg.src = Product.all[centerIndex].path;
    centerImg.alt = Product.all[centerIndex].name;
    centerImg.title = Product.all[centerIndex].name;
    temp.push(Number(centerIndex));

    rightImg.src = Product.all[rightIndex].path;
    rightImg.alt = Product.all[rightIndex].name;
    rightImg.title = Product.all[rightIndex].name;
    temp.push(Number(rightIndex));

    // console.log(`${temp}\n`);
  }
}

imgSection.addEventListener('click', swapImg);

function swapImg(event) {
  if (totAttempt < attempts) {
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
    Product.all[leftIndex].views++;
    Product.all[centerIndex].views++;
    Product.all[rightIndex].views++;

    totAttempt++;
    settingItem();
    renderAttemptCount();
    render();
  } else {
    // btnScore.classList.remove('hide');
    imgSection.removeEventListener('click', swapImg);
  }
}

btnScore.addEventListener('click', showProductList);

function showProductList() {
  showHiedProductList();
  // btnScore.removeEventListener('click', showProductList);
}

function gettingItem() {
  let stringObj = localStorage.getItem('Product');
  let normalObj = JSON.parse(stringObj);

  if (normalObj !== null) {
    Product.all = normalObj;
  }

  renderProductList();
  chartJS();
}

function renderProductList() {
  const h2El = document.createElement('h2');
  productList.appendChild(h2El);
  h2El.setAttribute('class', 'row center');
  h2El.textContent = 'Product List';
  h2El.id = 'product-List-h2';

  const ulEl = document.createElement('ul');
  productList.appendChild(ulEl);
  ulEl.id = 'product-List-ul';

  for (let i = 0; i < names.length; i++) {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].views} times.`;
    views.push(Product.all[i].views);
    votes.push(Product.all[i].votes);
  }
}

function showHiedProductList() {

  let idProductListH2 = document.getElementById('product-List-h2');
  let idProductListUl = document.getElementById('product-List-ul');

  if (!idProductListH2 || !idProductListUl) {
    gettingItem();
  }
  else {
    idProductListH2.remove();
    idProductListUl.remove();
  }


  if (chartSection.classList.contains('hide')) {
    chartSection.classList.remove('hide');
  } else {
    chartSection.classList.add('hide');
  }

}

function renderAttemptCount() {
  let idAttemptCountH2 = document.getElementById('attempt-count-h2');

  if (idAttemptCountH2 !== null) {
    idAttemptCountH2.remove();
  }
  const h2El = document.createElement('h2');
  attemptSection.appendChild(h2El);
  h2El.setAttribute('class', 'row center');
  h2El.id = 'attempt-count-h2';
  h2El.textContent = `Attempt Count ${totAttempt}/${attempts}`;

}

function chartJS() {

  for (let i = 0; i < names.length; i++) {
    views.push(Product.all[i].views);
    votes.push(Product.all[i].votes);
  }

  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: names,
      datasets: [{
        label: 'Product views',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: views
      }, {
        label: 'Product votes',
        backgroundColor: 'rgb(170, 86, 86)',
        borderColor: 'rgb(170, 86, 86)',
        data: votes
      }]
    },

    // Configuration options go here
    options: {}
  });
}

render();
