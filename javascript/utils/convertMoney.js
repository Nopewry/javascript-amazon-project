// convert money from cent to dollar
// #######################################################################
export function convertMoney(money){
    return `$${(money/100).toFixed(2)}`
}
// #######################################################################