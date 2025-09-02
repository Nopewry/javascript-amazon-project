import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getDeliveryOptions } from "../../data/deliveryOption.js";
import { cart } from "../../data/cart.js";

export function deliveryDate(productId) {
  let deliveryOption ;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId)
    }
  });
  return getDays(deliveryOption);
}

export function getDays(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();
  while(remainingDays > 0){
    deliveryDate = deliveryDate.add(1, 'days');
    if(!isWeekend(deliveryDate)){
      remainingDays--;
    }
  }
  const dateString = deliveryDate.format("dddd, MMMM DD");
  return dateString;
  }

function isWeekend(date) {
  const dateDay = date.day()
  if(dateDay === 6 || dateDay === 0) return true
}