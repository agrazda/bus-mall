"use strict";
console.log("hello world");

//Constructor for products

//---------------------Global Variables-------------------------//
// dom references
const voteSelectionElem = document.getElementById("vote_selection");
const leftImageElem = document.getElementById("left_image");
const leftImageh2Elem = document.getElementById("left_image_h2");
const centerImageElem = document.getElementById("center_image");
const centerImageh2Elem = document.getElementById("center_image_h2");
const rightImageElem = document.getElementById("right_image");
const rightImageh2Elem = document.getElementById("right_image_h2");
const ulElem = document.getElementById("image-clicks");

let currentLeft = null;
let currentRight = null;
let currentCenter = null;

let rounds = 20;

//--------------------Constructor Functions----------------------//
function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.votes = 0;
  this.views = 0;
}

Product.allProducts = [];

// ---------------------Prototype Methods------------------------//
// renders a single image/name
Product.prototype.renderProduct =function(img, h2) {
    img.src = this.imgPath;
    img.alt = this.name;
    h2.textContent = this.name;
    this.views++;
}

//---------------------Standard Global Functions----------------//

//pick 3 unique images, no repeats
function picksThreeProducts(){
    const doNotUse =[currentRight, currentLeft, currentCenter];
    while (doNotUse.includes(currentLeft)){
        let leftIndex = Math.floor(Math.random()* Product.allProducts.length);
        currentLeft = Product.allProducts[leftIndex];
    }
    doNotUse.push(currentLeft)

    while (doNotUse.includes(currentRight)){
        let rightIndex = Math.floor(Math.random()* Product.allProducts.length);
        currentRight = Product.allProducts[rightIndex];
    }
    doNotUse.push(currentRight)

    while (doNotUse.includes(currentCenter)){
        let centerIndex = Math.floor(Math.random()* Product.allProducts.length);
        currentCenter = Product.allProducts[centerIndex];
    }
    doNotUse.push(currentCenter)
    console.log(doNotUse)
}


//render 3 images
function renderThreeProducts(){
    currentCenter.renderProduct(centerImageElem, centerImageh2Elem);
    currentLeft.renderProduct(leftImageElem, leftImageh2Elem);
    currentRight.renderProduct(rightImageElem, rightImageh2Elem);
}
//render results
//we need li's product name and product clicks
function renderResults(){
    ulElem.textContent = '';

    for (let product of Product.allProducts) {
        let liElem = document.createElement('li');
        liElem.textContent = `${product.name}: ${product.votes}: ${product.views}`;
        ulElem.appendChild(liElem);
    }
}



//click handler

function handleClick(e) {
    // e.preventDefault(); <--DO I NEED THIS?
    const target = e.target.id;
    if (target==='left_image' || target === 'right_image' || target === 'center_image') {
        //updatevoterounds
        rounds--;
              //determine their choise and update the votes on the
        if (target === 'left_image') {
            currentLeft.votes++;
        }
        if (target === 'right_image') {
            currentRight.votes++;
        }
        if (target === 'center_image') {
            currentCenter.votes++;
        }

        picksThreeProducts();
        renderThreeProducts();
    }
        if (rounds === 0) {
        voteSelectionElem.removeEventListener('click', handleClick);
        renderResults();
        }
}
// function renderButton


//--------------------------Listeners---------------------------//
//listener on the container for pictures
voteSelectionElem.addEventListener('click', handleClick);

//-----------------------Call Functions-------------------------//

Product.allProducts.push(new Product("bag", "./img/assets/bag.jpg"));
Product.allProducts.push(new Product("banana", "./img/assets/banana.jpg"));
Product.allProducts.push(new Product("bathroom", "./img/assets/bathroom.jpg"));
Product.allProducts.push(new Product("boots", "./img/assets/boots.jpg"));
Product.allProducts.push(new Product("breakfast", "./img/assets/breakfast.jpg"));
Product.allProducts.push(new Product("bubblegum", "./img/assets/bubblegum.jpg"));
Product.allProducts.push(new Product("chair", "./img/assets/chair.jpg"));
Product.allProducts.push(new Product("cthulhu", "./img/assets/cthulhu.jpg"));
Product.allProducts.push(new Product("dog-duck", "./img/assets/dog-duck.jpg"));
Product.allProducts.push(new Product("dragon", "./img/assets/dragon.jpg"));
Product.allProducts.push(new Product("pen", "./img/assets/pen.jpg"));
Product.allProducts.push(new Product("pet-sweep", "./img/assets/pet-sweep.jpg"));
Product.allProducts.push(new Product("scissors", "./img/assets/scissors.jpg"));
Product.allProducts.push(new Product("shark", "./img/assets/shark.jpg"));
Product.allProducts.push(new Product("sweep", "./img/assets/sweep.png"));
Product.allProducts.push(new Product("tauntaun", "./img/assets/tauntaun.jpg"));
Product.allProducts.push(new Product("unicorn", "./img/assets/unicorn.jpg"));
Product.allProducts.push(new Product("water can", "./img/assets/water-can.jpg"));
Product.allProducts.push(new Product("wine-glass", "./img/assets/wine-glass.jpg"));

picksThreeProducts();
renderThreeProducts();
console.log(Product.allProducts);


//---------------------chart-------------------------------//
         
function makeProductChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    let name = [];
    let votes = [];
    for (let product of Product.allProduct) {
        name.push(Product.name)
        votes.push(Product.votes)
        }
}   



const data = [1,2,3,4,5,6];
const labelColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelColors,
        datasets: [{
            label: '# of Votes',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    
    }
});

makeProductChart ();