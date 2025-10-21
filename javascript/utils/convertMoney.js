export function convertMoney(money){
    return `$${(money/100).toFixed(2)}`
}