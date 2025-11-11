// import file
// #######################################################################
import {
  update_Cart_Quantity_Head,
  cart,
  delete_Cart_Item,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { convertMoney } from "../utils/convertMoney.js";
// import { payment_Summary } from "./payment_summary.js";
// #######################################################################

export function order_Summary() {
  // create HTML
  // #######################################################################
  const itemCheckoutContainer = document.querySelector(".js-order-summary");
  // order_Summary()
  let HTML = "";
  cart.forEach((cartItem) => {
    let matchingProduct;
    // console.log(cartItem.productId);

    products.forEach((product) => {
      // matchingProduct = cartItem.productId === product.id ? product : '';
      if (cartItem.productId === product.id) {
        matchingProduct = product;
        // console.log(matchingProduct);
      }
    });
    HTML += `
    
    <div class="cart-item-container js-cart-item-container-${
      cartItem.productId
    }">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${convertMoney(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-button"
                data-product-id = ${cartItem.productId}>
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title ">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
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
                    name="delivery-option-${cartItem.productId}">
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
                    name="delivery-option-${cartItem.productId}">
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

  itemCheckoutContainer.innerHTML += HTML;
  // #######################################################################

  //update cart quantity in header
  // #######################################################################
  function update_Quantity() {
    document.querySelector(".js-item-quantity").innerHTML =
      update_Cart_Quantity_Head();
  }
  // #######################################################################

  // delete button
  // #######################################################################
  document.querySelectorAll(".js-delete-button").forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const productId = deleteButton.dataset.productId;
      // console.log(deleteButton);
      // console.log(productId);
      delete_Cart_Item(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      update_Quantity();
    });
  });
  // #######################################################################

  // order_Summary()
  update_Quantity();
}
// order_Summary()
// payment_Summary();
