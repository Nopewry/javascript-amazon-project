import {
  cart,
  removeFromCart,
  updateaQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatMoney from "../util/moneyFormat.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOption.js";
import { paymentSummary } from "./payment.js";

export function renderOderSummary() {
  let checkoutHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const macthingProduct = getProduct(productId);
    // console.log(macthingProduct);
    checkoutHTML += `
        <div class="cart-item-container js-cart-item-container-${
          macthingProduct.id
        }">
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
                    Quantity: <span class="quantity-label js-quantity-label-${
                      macthingProduct.id
                    }">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link"
                  data-product-id=${macthingProduct.id}>
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${
                    macthingProduct.id
                  }">
                  <span class="save-quantity-link link-primary js-save-link"
                  data-product-id=${macthingProduct.id}>
                    Save
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
                ${deliveryOptionsHTML(macthingProduct, cartItem)}
              </div>
            </div>
        </div>
    `;
  });

  function deliveryOptionsHTML(macthingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM DD");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatMoney(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id = ${macthingProduct.id}
        data-product-delivery-option = ${deliveryOption.id}>
          <input type="radio"
          ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${macthingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = checkoutHTML;

  document
    .querySelectorAll(".js-delete-quantity-link")
    .forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        const { productId } = deleteButton.dataset;
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        removeFromCart(productId);
      });
    });

  document
    .querySelectorAll(".js-update-quantity-link")
    .forEach((updateButton) => {
      updateButton.addEventListener("click", () => {
        const { productId } = updateButton.dataset;
        const div = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = " ";
        div.classList.add("is-editing");
      });
    });

  document.querySelectorAll(".js-save-link").forEach((saveButton) => {
    const { productId } = saveButton.dataset;
    saveButton.addEventListener("click", () => {
      // const { productId } = saveButton.dataset;
      saveNewQuantity(productId);
    });
    document.querySelector(`.js-quantity-input-${productId}`).addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        saveNewQuantity(productId)
      }
    })
  });

  function saveNewQuantity(productId) {
      // const { productId } = saveButton.dataset;
      const div = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      let newQuantity = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );
      console.log(newQuantity);
      if (newQuantity < 1) {
        newQuantity = 1;
      }
      updateaQuantity(productId, newQuantity);
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

      paymentSummary();

      div.classList.remove("is-editing");
  }

  document.querySelectorAll(".js-delivery-option").forEach((Element) => {
    Element.addEventListener("click", () => {
      console.log('asd');
      
      const { productId, productDeliveryOption } = Element.dataset;
            console.log(productId);
            console.log(productDeliveryOption);
      updateDeliveryOption(productId, productDeliveryOption);
      renderOderSummary();
    });
  });
}
