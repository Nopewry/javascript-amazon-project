export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 5,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}]

export function get_Delivery_Option(deliveryOptionId = 1) {
    let deliveryOption;
    deliveryOptions.forEach((delivery) => {
        if(deliveryOptionId === delivery.id){
            deliveryOption = delivery
        }
    });
    return deliveryOption;
}