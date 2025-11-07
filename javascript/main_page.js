import { products } from "../data/products.js";
import { convertStar } from "./utils/convertStar.js";
import { convertMoney } from "./utils/convertMoney.js";
import { cart, add_To_Cart } from "../data/cart.js";

const main_container = document.querySelector('.js-products-grid');

let HTML = ''

products.forEach((product) => {
    // console.log(product.name);
    HTML += `
    <div class="product-container js-product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${convertStar(product.rating.stars)}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        ${convertMoney(product.priceCents)}
        </div>

        <div class="product-quantity-container">
        <select class="js-product-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
        </button>
    </div>
    `
})

main_container.innerHTML = HTML

const cartQuantity = document.querySelector('.js-cart-quantity')

function updateCartQuantityHead() {
    let allQuantity = 0;
    cart.forEach((item) => {
      allQuantity += item.quantity
    })
    cartQuantity.innerHTML = allQuantity
    // console.log(allQuantity);
}




document.querySelectorAll('.js-add-to-cart').forEach((addButton) => {
  addButton.addEventListener('click', () => {
    
    const productId = addButton.dataset.productId
    const quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value)
    console.log(typeof(quantity));
    // console.log(productId);
    add_To_Cart(productId, quantity)
    console.log(JSON.parse(localStorage.getItem('cart')));

    updateCartQuantityHead()
    
  })
})

updateCartQuantityHead()

// console.log(`product ${products}`);