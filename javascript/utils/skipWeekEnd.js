import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function add_Business_Days(startDate, daysToAdd) {
  let currentDate = dayjs(startDate);
  //   const today = dayjs();
  let businessDaysCount = 0;

  while (businessDaysCount < daysToAdd) {
    currentDate = currentDate.add(1, "day");
    const dayOfWeek = currentDate.day(); // 0 for Sunday, 6 for Saturday

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Not Sunday or Saturday
      businessDaysCount++;
    }
  }
  return currentDate;
}

// // Example usage:
// const today = dayjs();
// const nextBusinessDay = addBusinessDays(today, 1);
// const fiveBusinessDaysLater = addBusinessDays(today, 5);

// console.log(`Today: ${today.format("YYYY-MM-DD dddd")}`);
// console.log(`Next business day: ${nextBusinessDay.format("YYYY-MM-DD dddd")}`);
// console.log(
//   `Five business days later: ${fiveBusinessDaysLater.format("YYYY-MM-DD dddd")}`
// );
