import moment from "moment";
export  default function priceChart(value) {
  let months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  const startDate = moment(value, "DD-MM-YYYY hh:mm:ss");   
  console.log("startDate", months[startDate.month()] , startDate.dates());
  return months[startDate.month()] + " " + startDate.dates()
}