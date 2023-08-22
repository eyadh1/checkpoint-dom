//selecting DOM elements
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
// opzning the shopping cart
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
});
//closing the shopping cart
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
});
//array pf products
let products = [
    {
        id: 1,
        name: 'T-shirt',
        image: '1.png',
        price: 20 
    },
    {
        id: 2,
        name: 'Sweatpants',
        image: 'sweatpants.png',
        price: 30 
    },
    {
        id: 3,
        name: 'Baseball cap',
        image: '3.PNG',
        price: 10 
    },
    {
        id: 4,
        name: 'Shoes',
        image: '4.PNG',
        price: 50 
    },
    {
        id: 5,
        name: 'jeans',
        image: '5.PNG',
        price: 40
    },
    {
        id: 6,
        name: 'Chicago bulls jersey',
        image: '6.PNG',
        price: 60
    },
];
//array to store selected items
let listCards  = [];
//create a function for adding cards in html page using loop and if else statements
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}DT</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
// create a function that will add the item into card array when clicked on button
initApp();
//create a function to remove an element from the cart
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
//Function to reload and update the cart
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
         // Updating the total price and quantity
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
             // Creating a new card item
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} DT</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
// Function to change the quantity of an item in the cart
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}