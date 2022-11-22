`use strict`;

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

//we can use a goat constructor
//clicks
//views
//src/products picture details
//name

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


let products = [product1,product2,product3,product4,product5,product6,product7,product8,product9,product10,product11,product12,product13,product14,product15,product16,product17,product18];

// get random goat index
function getRandomIndex() {
  // possible return values: 0, 1, 2
  return Math.floor(Math.random() * products.length)
}

// render function: invoke function on page load, I want to load 2 random goats
function renderProducts() {
  productNumber = [];
  
  
    while(productNumber.length < 3){
    let randomIndex = getRandomIndex();
    console.log(`------------randomIndex${randomIndex}`)
    // while unique numbers does not include the the random generated number inside nums, then push it
    if(!productNumber.includes(products[randomIndex])){
    productNumber.push(products[randomIndex]);    
    }
  // Otherwise loop until length is 3
  }
  console.log(productNumber);
  
  let index1 = productNumber.shift();
  console.log(index1);
  let index2 = productNumber.shift();
  console.log(index2);
  let index3 = productNumber.shift();
  console.log(index3);

  

  // index1 = getRandomIndex();
  // index2 = getRandomIndex();
  // index3 = getRandomIndex();
  // This prevents the same images from appearing

  // Build while loop for all 3 things********************

  
  // while (index1 === index2) {
  //   index2 = getRandomIndex();
  // }

  // let firstProduct = products[index1];
  // let secondProduct = products[index2];
  // let thirdProduct = products[index3];

  // DOM manipulation
  // This replaces the src for the image with the img src from the goat variable
  image1.src = index1.src;
  image1.alt = index1.name;
  image1.title = index1.name
  image1.id = index1;

  image2.src = index2.src;
  image2.alt = index2.name;
  image2.title = index2.name;
  image2.id = index2;

  image3.src = index3.src;
  image3.alt = index3.name;
  image3.title = index3.name;
  image3.id = index3;

  // increment views
  index1.views++;
  index2.views++;
  index3.views++;
}

// Event handler
// what happens when a user clicks a goat?
//  increment goats .clicks
// render 2 new goats
function handleProductClick(event) {
  clicks++;
  // the event object knows about the event and the element targeted


  // how to increment the correct goat's .clicks
  // Option 1 using For Loop***************************************
  // if goat[i].alt = event.target.alt, then increment clicks
  // for(let i = 0; i < goats.length; i++){
  //   if (goats[i].name == event.target.alt){
  //     goats[i].clicks++;
  //   }
  // }
  //Option2 **************************
  //use global index variables
  if (products[index1].name = event.target.alt){
    products[index1].clicks++;
  }
  if (products[index2].name = event.target.alt){
    products[index2].clicks++;
  }
  if (products[index3].name = event.target.alt){
    products[index3].clicks++;
  }

  // Option 3, using ID***************************
  products[event.target.id].clicks++;
  if (clicks >24){
    image1.removeEventListener(`click`, handleProductClick);
    image2.removeEventListener(`click`, handleProductClick);
    image3.removeEventListener(`click`, handleProductClick);
  }
  console.log(products);
  renderProducts();
}

function viewResults(event){
  let ul = document.querySelector(`ul`);
  // Make one li for each goat inside goats[]
  for(let i = 0; i < products.length; i++){
    let li = document.createElement(`li`);
    li.innerText = `${products[i].name} was viewed ${products[i].views} times and was clicked on ${products[i].clicks} times.`;
    ul.appendChild(li);
  }
  // Not a great way to remove this item
  // resultsButton.removeEventListener(`click`, viewResults);
}

// On page load
image1.addEventListener(`click`, handleProductClick);
image2.addEventListener(`click`, handleProductClick);
image3.addEventListener(`click`, handleProductClick);
resultsButton.addEventListener(`click`, viewResults);
renderProducts();