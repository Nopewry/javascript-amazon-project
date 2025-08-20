import formatMoney from "../util/moneyFormat.js";
import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOption.js";
import { getProduct } from "../../data/products.js";

export function paymentSummary() {
    let quantity = 0 ;
    
    cart.forEach(cartItem => {
        // console.log(cartItem);
        const productId = cartItem.productId;
        const macthingProduct = getProduct(productId);
        quantity += Number(cartItem.quantity);
        // console.log(quantity);
          
    });
    
    document.querySelector('.return-to-home-link').innerHTML = `${quantity} ${quantity > 1 ? 'items' : 'item'}`

    const html = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${quantity}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `
    
    document.querySelector('.js-payment-summary').innerHTML = html

}
