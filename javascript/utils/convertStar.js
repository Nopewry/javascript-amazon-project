export function convertStar(star) {
    let changed_star = star * 10
    return star === 0.5 ? '0' + changed_star : changed_star
}