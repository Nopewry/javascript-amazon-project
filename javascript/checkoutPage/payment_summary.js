// import file
// #######################################################################
import { cart, update_Cart_Quantity_Head } from "../../data/cart.js";
import { get_Matching_Product } from "../../data/products.js";
import { convertMoney } from "../utils/convertMoney.js";
import { get_Delivery_Option } from "../../data/delivery.js";
// #######################################################################

// payment_Summary function
// #######################################################################
export function payment_Summary() {

// price calulation
// #######################################################################

  // product price 
  // #######################################################################
  let matchingProduct;
  let matchingDeliveryOption;
  let allProductPrice = 0;
  let shippingPrice = 0;

  cart.forEach((cartItem) => {
    matchingProduct = get_Matching_Product(cartItem.productId)
    matchingDeliveryOption = get_Delivery_Option(cartItem.deliveryOptionId)

    allProductPrice += matchingProduct.priceCents * cartItem.quantity
    shippingPrice += matchingDeliveryOption.priceCents
    // console.log(matchingDeliveryOption);
    
  });
  // #######################################################################

  // price section
  // #######################################################################
  // const shippingPrice = 499;
  const priceBeforeTax = allProductPrice + shippingPrice;
  const Tax = priceBeforeTax * 0.1;
  const totalPrice = priceBeforeTax + Tax;
  // #######################################################################
// #######################################################################

// HTML
// #######################################################################
  const HTML = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${update_Cart_Quantity_Head()}):</div>
        <div class="payment-summary-money">${convertMoney(allProductPrice)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${convertMoney(shippingPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${convertMoney(priceBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${convertMoney(Tax)}</div>
        </div>

        <div class="payment-summary-row total-row ">
        <div>Order total:</div>
        <div class="payment-summary-money">${convertMoney(totalPrice)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;
// #######################################################################
  document.querySelector(".js-payment-summary").innerHTML = HTML;
}
// #######################################################################