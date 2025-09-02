import formatMoney from "../util/moneyFormat.js";
import { cart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOptions } from "../../data/deliveryOption.js";
import { getProduct } from "../../data/products.js";

export function paymentSummary() {
    let totalQuntity = 0;
    let totalPrice = 0;
    let totalDeliveryPrice = 0;
    
    cart.forEach(cartItem => {
        let quantity = 0 ;
        let price = 0 ;
        // console.log(cartItem);
        const productId = cartItem.productId;
        const macthingProduct = getProduct(productId);
        const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);

        // console.log(getDeliveryOptions(deliveryOption));
        
        quantity = Number(cartItem.quantity);
        price = Number(macthingProduct.priceCents)
        totalQuntity += quantity;
        totalPrice += quantity * price
        totalDeliveryPrice += deliveryOption.priceCents
        // console.log(quantity);
        // console.log(price);
        // console.log(totalQuntity);
        // console.log(totalPrice);
        // console.log(totalDeliveryPrice);
          
    });

    const totalExcludeTax = totalPrice + totalDeliveryPrice
    const tax = totalExcludeTax * 0.1
    const tatalIncludeTax = totalExcludeTax + tax
    
    document.querySelector('.return-to-home-link').innerHTML = `${totalQuntity} ${totalQuntity > 1 ? 'items' : 'item'}`

    const html = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${totalQuntity}):</div>
            <div class="payment-summary-money">$${formatMoney(totalPrice)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatMoney(totalDeliveryPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatMoney(totalExcludeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatMoney(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatMoney(tatalIncludeTax)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `
    
    document.querySelector('.js-payment-summary').innerHTML = html
}
