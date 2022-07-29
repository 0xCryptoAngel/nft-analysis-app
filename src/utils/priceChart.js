import moment from "moment";
export  default function priceChart(value) {
  let months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  if(value.length < 18) {
    const startDate = moment(value, "DD-MM-YYYY hh:mm:ss");  
    console.log("startDate", startDate.format())
    return months[startDate.month()] + " " + startDate.dates()
  } else {
    let date = new Date(value)
    return  months[date.getMonth()] + " " + date.getDate()
  }
}