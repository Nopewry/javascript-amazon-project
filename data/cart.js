// create cart variable
// #######################################################################
export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "2",
  },
];
// #######################################################################

// add to cart function
// #######################################################################
export function add_To_Cart(productId, productQuantity, choice = 1) {
  let matchingProduct = "";
  // console.log(productQuantity);

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });

  if (matchingProduct) {
    if (choice === 1) {
      matchingProduct.quantity += productQuantity;
    } else if (choice === 2) {
      matchingProduct.quantity = productQuantity;
    } else {
      return 0;
    }
  } else {
    cart.push({
      productId,
      quantity: productQuantity,
      deliveryOptionId: "1",
    });
  }

  save_To_Storage();
}
// #######################################################################

// save value from cart to localstorage
// #######################################################################
function save_To_Storage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// #######################################################################

// update quantity in header
// #######################################################################
export function update_Cart_Quantity_Head() {
  let allQuantity = 0;
  cart.forEach((cartItem) => {
    allQuantity += cartItem.quantity;
  });

  return allQuantity;
}
// #######################################################################

// delete item in cart
// #######################################################################
export function delete_Cart_Item(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  // console.log(newCart);
  // console.log(cart);

  cart = newCart;
  // console.log(cart);
  save_To_Storage();
}
// #######################################################################

// update delivery option
// #######################################################################
export function update_Delivery_Option(productId, newDeliveryOptionId) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });
//   console.log(`${JSON.stringify(matchingProduct)} 1`);
  matchingProduct.deliveryOptionId = newDeliveryOptionId;

//   console.log(`${JSON.stringify(matchingProduct)} 2`);

  save_To_Storage();
}

// #######################################################################
