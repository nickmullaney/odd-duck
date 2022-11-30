`use strict`;

// Global Variables
// query selector is just like a css selector, works the same way
let productContainer = document.querySelector(`section`);
let image1 = document.querySelector(`section img:first-child`);
let image2 = document.querySelector(`section img:nth-child(2)`);
let image3 = document.querySelector(`section img:nth-child(3)`)
let resultsButton = document.getElementById(`results`);

let index1 = 0;
let index2 = 0;
let index3 = 0;
let clicks = 0;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
}

let product1 = new Product(`R2 Bag`, `img/bag.jpg`);
let product2 = new Product(`Banana Slicer`, `img/banana.jpg`);
let product3 = new Product(`Pad Pooper`, `img/bathroom.jpg`);
let product4 = new Product(`Bad Duckies`, `img/boots.jpg`);
let product5 = new Product(`Retro Lonely Breakfast`, `img/breakfast.jpg`);
let product6 = new Product(`Meatball Bubblegum`, `img/bubblegum.jpg`);
let product7 = new Product(`Musical Cha-ouch`, `img/chair.jpg`);
let product8 = new Product(`My First Cthulu, with Sacrifice`, `img/cthulhu.jpg`);
let product9 = new Product(`Doggie Duckerator`, `img/dog-duck.jpg`);
let product10 = new Product(`Utili-Pen`, `img/pen.jpg`);
let product11 = new Product(`Pet Sweep`, `img/pet-sweep.jpg`);
let product12 = new Product(`Pizzizzors`, `img/scissors.jpg`);
let product13 = new Product(`Jaws Sleeping Bag`, `img/shark.jpg`);
let product14 = new Product(`Toddler Swiffer`, `img/sweep.png`);
let product15 = new Product(`Tauntaun Sleeper`, `img/tauntaun.jpg`);
let product16 = new Product(`Unicorn Mean`, `img/unicorn.jpg`);
let product17 = new Product(`Water You Down Can`, `img/water-can.jpg`);
let product18 = new Product(`Dr Evil Wine Glass`, `img/wine-glass.jpg`);

let products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13, product14, product15, product16, product17, product18];


// Local storage to save our products at each click, initialized on click
function saveProducts(){
  // Step 1
  let savedProducts = JSON.stringify(products);
  // Step 2
  localStorage.setItem(`savedProducts`, savedProducts);
}

// Function to load products on page load
function loadProducts(){
  // Step 3
  let getProducts = localStorage.getItem(`savedProducts`);
  if(getProducts){
    products = JSON.parse(getProducts);
    console.log(`products are`, getProducts);
    return getProducts;
  }
  // Step 4
}

function pageLoad(){
  if(!loadProducts){
    return;
  }
  //apply product last
  loadProducts();
}

// get random goat index
function getRandomIndex() {
  // possible return values: 0, 1, 2
  return Math.floor(Math.random() * products.length) // Math.random() ** goats.length returns number between 0-2.9999999. Math.floor() will equal 0,1,2
}

// render function: invoke function on page load, I want to load 3 random products
function renderProducts() {
  productNumber = [];
  // This prevents the same images from appearing
  // Build while loop for all 3 things********************
  while (productNumber.length < 3) {
    let randomIndex = getRandomIndex();
    // while unique numbers does not include the the random generated number inside nums, then push it
    if (!productNumber.includes(randomIndex)) {
      productNumber.push(randomIndex);
    }
  }
  let index1 = productNumber.shift();
  let index2 = productNumber.shift();
  let index3 = productNumber.shift();

  let firstProduct = products[index1];
  let secondProduct = products[index2];
  let thirdProduct = products[index3];
  // DOM manipulation
  // This replaces the src for the image with the img src from the product variable
// Attempted for loop
// for(let i = 1; i < 4; i++){
//   image(i).src = firstProduct.src;
//   image(i).alt = firstProduct.name;
//   image(i).title = firstProduct.name
//   image(i).id = index(i);
// }
  image1.src = firstProduct.src;
  image1.alt = firstProduct.name;
  image1.title = firstProduct.name
  image1.id = index1;

  image2.src = secondProduct.src;
  image2.alt = secondProduct.name;
  image2.title = secondProduct.name;
  image2.id = index2;

  image3.src = thirdProduct.src;
  image3.alt = thirdProduct.name;
  image3.title = thirdProduct.name;
  image3.id = index3;

  // increment views
  firstProduct.views++;
  secondProduct.views++;
  thirdProduct.views++;
}

// Event handler
// what happens when a user clicks a product?
function handleProductClick(event) {
  clicks++;
  saveProducts();
  products[event.target.id].clicks++;
  if (clicks > 24) {
    image1.removeEventListener(`click`, handleProductClick);
    image2.removeEventListener(`click`, handleProductClick);
    image3.removeEventListener(`click`, handleProductClick);
  }
  renderProducts();
}

function viewResults(event) {
  event.preventDefault();
  // Make one li for each goat inside goats[]
  // for (let i = 0; i < products.length; i++) {
  //   let li = document.createElement(`li`);
  //   li.innerText = `${products[i].name} was viewed ${products[i].views} times and was clicked on ${products[i].clicks} times.`;
  //   ul.appendChild(li);
  // }
  generateResults();
  renderChart();
  if(event){
    li.innerText = "";
  }
}

function generateResults(){
  let ul = document.querySelector(`ul`);
  for (let i = 0; i < products.length; i++) {
    let li = document.createElement(`li`);
    li.innerText = `${products[i].name} was viewed ${products[i].views} times and was clicked on ${products[i].clicks} times.`;
    ul.appendChild(li);
  }
}

function renderChart() {
  let productNames = [];
  let productLikes = [];
  let productViews = [];
  for (let i = 0; i < products.length; i++) {
    productNames.push(products[i].name);
    productLikes.push(products[i].clicks);
    productViews.push(products[i].views);
  }

  /* refer to Chart.js > Chart Types > Bar Chart: 
  https://www.chartjs.org/docs/latest/charts/bar.html 
  and refer to Chart.js > Getting Started > Getting Started:
  https://www.chartjs.org/docs/latest/getting-started/ */
  const data = {
    labels: productNames,
    datasets: [{
      label: 'Likes',
      data: productLikes,
      backgroundColor: [
        'rgba(17, 133, 85, 0.8)',
        'rgba(26, 34, 218, 0.8)',
        'rgba(218, 26, 70, 0.8)',
        'rgba(26, 218, 214, 0.8)'
      ],
      borderColor: [
        'rgba(198, 218, 26, 0.8)'
      ],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: [
        'rgba(211, 211, 130, 0.8)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  };
  let delayed;
  const config = {
    type: 'bar',
    data: data,
    options: {
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart, config);
}


// On page load
pageLoad();
image1.addEventListener(`click`, handleProductClick);
image2.addEventListener(`click`, handleProductClick);
image3.addEventListener(`click`, handleProductClick);
resultsButton.addEventListener(`click`, viewResults);
renderProducts();