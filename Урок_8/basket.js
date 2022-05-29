'use strict';

let totalPrice = 0;
let totalPriceObj = document.querySelector('.basketTotalValue');
let productAmount = 0;
let productAmountObj = document.querySelector('.cartIconWrap')?.querySelector('span');
renewProductAmount();

let basketBody = document.querySelector('.basketBody');

document.querySelector('.cartIconWrap')?.addEventListener('click', () => {
    document.querySelector('.basket')?.classList.toggle('hidden');
});

let featuredId = 0;
document.querySelectorAll('.featuredItem')?.forEach(el => {
    el.querySelector('button')?.classList.add('featuredItemButton');
    el.querySelector('.featuredData').insertAdjacentHTML("beforeend", getProductId(++featuredId));
});

document.querySelectorAll('.featuredItemButton')?.forEach(btn => 
    {btn.addEventListener('click', (event) => addToBasket(event));
});

function addToBasket(event) {
    let featuredItem = event.target.closest('.featuredItem');
    let featuredItemObj = new Object();
    featuredItemObj.name = featuredItem.querySelector('.featuredName').textContent;
    featuredItemObj.price = featuredItem.querySelector('.featuredPrice').textContent;
    featuredItemObj.id = featuredItem.querySelector('.featuredId').textContent;

    productAmount++;
    renewProductAmount();

    let productItem = basketBody.querySelector(`tr[id="${featuredItemObj.id}"]`);
    if (!productItem){
        basketBody.insertAdjacentHTML("beforeend", getProductMarkup(featuredItemObj));
    } else {
        productItem.children[1].textContent++;
        let fullPrice = productItem.children[1].textContent * currencyToFloat(productItem.children[2].textContent);
        productItem.children[3].textContent = `$${fullPrice}`;
    }

    totalPrice += +currencyToFloat(featuredItemObj.price);
    renewTotalPrice();
}

function renewProductAmount(){
    if (productAmountObj){
        productAmountObj.textContent = productAmount;
    }   
}

function getProductMarkup(product) {
    return `<tr id="${product.id}">
            <td>${product.name}</td>
            <td>1</td>
            <td>${product.price}</td>
            <td>${product.price}</td>
        </tr>`;
}

function getProductId(id) {
    return `<div class="featuredId hidden">${id}</div>`;
}

function currencyToFloat(val) {
    return val.replace("$", "");
}

function renewTotalPrice(){
    if (totalPriceObj){
        totalPriceObj.textContent = `${totalPrice}`;
    }   
}