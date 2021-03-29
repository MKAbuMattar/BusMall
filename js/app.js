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

// const btnScore = document.getElementById('btn-score');

// const productList = document.getElementById('product-list');

let ctx = document.getElementById('myChart').getContext('2d');

let leftIndex;
let centerIndex;
let rightIndex;

let numVote = 25;
let totnumVote = 0;

let views = [];
let votes = [];

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
  leftIndex = Number(randomNumber(0, Product.all.length - 1));
  centerIndex = Number(randomNumber(0, Product.all.length - 1));
  rightIndex = Number(randomNumber(0, Product.all.length - 1));

  // console.log(`leftIndex = ${leftIndex}\ncenterIndex = ${centerIndex}\nrightIndex = ${rightIndex}\n`);

  let tempLeftIndex;
  let tempCenterIndex;
  let tempRightIndex;


  if ((leftIndex === centerIndex || centerIndex === rightIndex || leftIndex === rightIndex) ||
    tempLeftIndex === leftIndex || tempLeftIndex === centerIndex || tempLeftIndex === rightIndex ||
    tempRightIndex === leftIndex || tempRightIndex === centerIndex || tempRightIndex === rightIndex ||
    tempCenterIndex === leftIndex || tempCenterIndex === centerIndex || tempCenterIndex === rightIndex) {
    render();
    // console.log(`tempLeftIndex = ${tempLeftIndex}\ntempCenterIndex = ${tempCenterIndex}\ntempRightIndex = ${tempRightIndex}\n`);
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

    tempLeftIndex = leftIndex;
    tempCenterIndex = centerIndex;
    tempRightIndex = rightIndex;

    // console.log(`tempLeftIndex = ${tempLeftIndex}\ntempCenterIndex = ${tempCenterIndex}\ntempRightIndex = ${tempRightIndex}\n`);
  }
}

imgSection.addEventListener('click', swapImg);

function swapImg(event) {
  if (totnumVote < numVote) {
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
    render();
  } else {
    // btnScore.classList.remove('hide');

    for (let i = 0; i < names.length; i++) {
      views.push(Product.all[i].views);
      votes.push(Product.all[i].votes);
    }

    chartJS();
    imgSection.removeEventListener('click', swapImg);
  }
}

// btnScore.addEventListener('click', showProductList);

// function showProductList() {

//   const h2El = document.createElement('h2');
//   productList.appendChild(h2El);
//   h2El.setAttribute('class', 'row center');
//   h2El.textContent = 'Product List';

//   const ulEl = document.createElement('ul');
//   productList.appendChild(ulEl);

//   for (let i = 0; i < names.length; i++) {
//     const liEl = document.createElement('li');
//     ulEl.appendChild(liEl);
//     liEl.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].views} times.`;

//     views.push(Product.all[i].views);
//     votes.push(Product.all[i].votes);
//   }

//   btnScore.removeEventListener('click', showProductList);
// }

function chartJS() {

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
