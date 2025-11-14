// import file
// #######################################################################
import {
  update_Cart_Quantity_Head,
  cart,
  delete_Cart_Item,
  add_To_Cart
} from "../../data/cart.js";
import { products, get_Matching_Product } from "../../data/products.js";
import { convertMoney } from "../utils/convertMoney.js";
import { payment_Summary } from "./payment_summary.js";
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

    matchingProduct = get_Matching_Product(cartItem.productId);
    // console.log(matchingProduct);

    // products.forEach((product) => {
    //   // matchingProduct = cartItem.productId === product.id ? product : '';
    //   if (cartItem.productId === product.id) {
    //     matchingProduct = product;
    //     // console.log(matchingProduct);
    //   }
    // });
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

                        Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${
                          cartItem.quantity
                        }</span>

                        <input type="text" class="input-new-quantity none-visible js-input-new-quantity-${cartItem.productId}">

                    </span>

                    <span class="update-quantity-link link-primary js-update-button js-update-button-${cartItem.productId}"
                    data-product-id=${cartItem.productId}>
                        Update
                    </span>

                    <span class="ok-quantity-link link-primary none-visible js-ok-button js-ok-button-${cartItem.productId} "
                    data-product-id=${cartItem.productId}>
                        OK
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

  itemCheckoutContainer.innerHTML = HTML;
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
      //call payment_Summary to update price
      payment_Summary();
    });
  });
  // #######################################################################

// update button  
// #######################################################################
  document.querySelectorAll(".js-update-button").forEach((updateButton) => {
    updateButton.addEventListener("click", () => {
        const productId = updateButton.dataset.productId;
        // console.log(productId);
        // const updateInput = document.querySelector(`.js-input-new-quantity-${productId}`)
        // const quantity = document.querySelector(`.js-quantity-label-${productId}`)

        // show input quantity
        document.querySelector(`.js-input-new-quantity-${productId}`).style.display = 'inline';

        // hide old quantity
        document.querySelector(`.js-quantity-label-${productId}`).style.display = 'none';

        // hide update button
        updateButton.style.display = 'none';

        // show ok button
        document.querySelector(`.js-ok-button-${productId}`).style.display = 'inline';
        // document.querySelector(`.js-ok-button`).style.display = 'inline';
        
    });
  });
// #######################################################################

// ok button
// #######################################################################
  document.querySelectorAll(`.js-ok-button`).forEach((okButton) => {
    const productId = okButton.dataset.productId;
    const newQuantity =  document.querySelector(`.js-input-new-quantity-${productId}`);

    function update_New_Quantity() {
        
        let newQuantityValue = Number(newQuantity.value);
        // console.log(typeof(newQuantityValue));

        //if new quantity is null make them to 1 
        if (newQuantityValue <= 0 || Number.isNaN(newQuantityValue) || !newQuantityValue) {
            newQuantityValue = 1
        }
        // add_To_Cart(id of product, quantity, choice)
        // choice = 1 → increase the existing quantity
        // choice = 2 → set the quantity to the given value (overwrite)
        add_To_Cart(productId, Number(newQuantityValue), 2);
        // console.log(newQuantityValue);

        

        document.querySelector(`.js-quantity-label-${productId}`).style.display = 'inline';

        document.querySelector(`.js-update-button-${productId}`).style.display = 'inline';

        document.querySelector(`.js-ok-button-${productId}`).style.display = 'none';

        newQuantity.style.display = 'none'
        
        order_Summary()
    }

    okButton.addEventListener('click', () => {
        
        update_New_Quantity()
        
    })

    newQuantity.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            update_New_Quantity()
        }
    })

  })
// #######################################################################


  update_Quantity();
}
