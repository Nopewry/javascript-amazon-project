import { cart, removeFromCart } from "../data/cart.js";
import { products, getProduct } from "../data/products.js";
import formatMoney from "./util/moneyFormat.js";


let checkoutHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId
  const macthingProduct = getProduct(productId);
  // console.log(macthingProduct);
  checkoutHTML += `
      <div class="cart-item-container js-cart-item-container-${macthingProduct.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${macthingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${macthingProduct.name}
              </div>
              <div class="product-price">
                $${formatMoney(macthingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${macthingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link"
                data-product-id=${macthingProduct.id}>
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link"
                data-product-id=${macthingProduct.id}>
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML += checkoutHTML;


document.querySelectorAll('.js-delete-quantity-link').forEach((deleteButton) => {
  deleteButton.addEventListener('click', () => {
    const {productId} = deleteButton.dataset
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    removeFromCart(productId);
  });
});

document.querySelectorAll('.js-update-quantity-link').forEach((updateButton) => {
  updateButton.addEventListener('click', () => {    
    const {productId} = updateButton.dataset
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = ' ';
    updateButton.innerHTML = 
    `
      <input>
      <span class="link-primary js-comfirm-qauntity">
        Confirm
      </span>
    `
  })
})

document.querySelectorAll('.js-comfirm-qauntity').forEach((confirmButton) =>{
  confirmButton.addEventListener('click', () => {
    console.log("confirm");
  })
})

