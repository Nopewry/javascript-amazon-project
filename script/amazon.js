// console.log(products);

const productGrid = document.querySelector('.products-grid')

let HTML = '';

products.forEach((product) => {
    // console.log(element);
    HTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = "${
            product.id
          }">
            Add to Cart
          </button>
        </div>
    `
})

productGrid.innerHTML = HTML
document.querySelectorAll('.js-add-to-cart-button').forEach(product => {
  product.addEventListener('click', () => {
    const productId = product.dataset.productId
    // console.log(productId);

    let macthingItem ;
    cart.forEach(item => {
      if (productId === item.productId){
        macthingItem = item
      }
    })
    if (macthingItem) {
      macthingItem.quantity++;
    }else{
      cart.push({
        productId,
        quantity: 1
      })
    }

    // console.log(cart);
    
    let cartQuntity = 0;

    cart.forEach(item => {
      cartQuntity += item.quantity;
    })

    document.querySelector('.js-cart-quantity').innerHTML = cartQuntity

  })
  
})



























// // // console.log(productsHTML);

// document.querySelector(".js-products-grid").innerHTML = productsHTML;

// document.querySelectorAll(".js-add-to-cart").forEach((button) => {
//   button.addEventListener("click", () => {
//     // console.log('Added');
//     // console.log(button.dataset);
//     // // in .dataset mean get a data attribute
//     // // data attribute is data-(name) like data-product-id
//     // console.log(button.dataset.productId);
//     const productId = button.dataset.productId;

//     let macthingItem;

//     cart.forEach((item) => {
//       if (productId === item.productId) {
//         macthingItem = item;
//       }
//     });

//     if (macthingItem) {
//       macthingItem.quantity++;
//     } else {
//       cart.push({
//         productId,
//         quantity: 1,
//       });
//     }

//     let cartQuntity = 0;

//     cart.forEach((item) => {
//         cartQuntity += item.quantity
//     })

//     document.querySelector('.js-cart-quantity').innerHTML = cartQuntity

//     // console.log(cart);
//     // console.log(cartQuntity);
//   });
// });
