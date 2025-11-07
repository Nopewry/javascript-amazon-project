export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
}];

export function add_To_Cart(productId, productQuantity = 1) {
    let matchingProduct = '';
    console.log(productQuantity);
    
    cart.forEach((item) => {
        if (item.productId === productId) {
            matchingProduct = item;
        }
    });

    if (matchingProduct) {
        matchingProduct.quantity += productQuantity
    }
    else{
        cart.push({
            productId,
            quantity : productQuantity,
            deliveryOptionId: '1'
        })
    }

    save_To_Storage()
}

function save_To_Storage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

