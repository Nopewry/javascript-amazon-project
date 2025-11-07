// import { products } from "../data/products.js";
import { convertStar } from "./utils/convertStar.js";
import { convertMoney } from "./utils/convertMoney.js";

const { getProducts } = require("./database/getProduct.js");
const products = await getProducts();
async function showProducts() {
  const products = await getProducts();
  console.log(products);
}

showProducts();


// const main_container = document.querySelector('.js-products-grid');

// let HTML = ''

// products.forEach((product) => {
//     // console.log(product.name);
//     HTML += `
//     <div class="product-container js-product-container">
//         <div class="product-image-container">
//         <img class="product-image"
//             src="${product.image}">
//         </div>

//         <div class="product-name limit-text-to-2-lines">
//         ${product.name}
//         </div>

//         <div class="product-rating-container">
//         <img class="product-rating-stars"
//             src="images/ratings/rating-${convertStar(product.rating_stars)}.png">
//         <div class="product-rating-count link-primary">
//             ${product.rating_count}
//         </div>
//         </div>

//         <div class="product-price">
//         ${convertMoney(product.priceCents)}
//         </div>

//         <div class="product-quantity-container">
//         <select>
//             <option selected value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//             <option value="6">6</option>
//             <option value="7">7</option>
//             <option value="8">8</option>
//             <option value="9">9</option>
//             <option value="10">10</option>
//         </select>
//         </div>

//         <div class="product-spacer"></div>

//         <div class="added-to-cart">
//         <img src="images/icons/checkmark.png">
//         Added
//         </div>

//         <button class="add-to-cart-button button-primary js-add-to-cart-button">
//         Add to Cart
//         </button>
//     </div>
//     `
// })

// main_container.innerHTML = HTML

// document.querySelectorAll('.js-add-to-cart-button').forEach((addToCart) => {
//     addToCart.addEventListener('click', () => {
//         // console.log(addToCart);

//     })
// })

// // console.log(`product ${products}`);



