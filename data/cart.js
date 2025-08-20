export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
}];


export function addToCart(productId, quantityElement) {
  const quantity = quantityElement ? quantityElement : 1
    let macthingItem ;
    cart.forEach((item) => {
      if (productId === item.productId){
        macthingItem = item
      }
      // console.log(item);
    })
    if (macthingItem) {
      macthingItem.quantity += quantity;
    }else{
      cart.push({
        productId,
        quantity
      })
    }

  saveToLocalStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((item) => {
    if(item.productId !== productId){
      newCart.push(item)
    }
  });
  cart = newCart
  saveToLocalStorage()
}

export function updateaQuantity(productId, newQuantity) {
  cart.forEach((item) => {
    if(item.productId === productId){
      item.quantity = newQuantity;
    };
  });

  saveToLocalStorage()
}

export function updateDeliveryOption(productId, newDeliveryOption){
  // console.log('ad');
  
  let macthingItem

  cart.forEach(cartItem => {
    if(cartItem.productId === productId){
      macthingItem = cart
    }
  });
  macthingItem.deliveryOptionId = deliveryOptionId
  
  saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    // console.log(localStorage.getItem('cart'));
}