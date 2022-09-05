import moment from "moment";
export  default function listedData(value) {
  let referenceDate = new Date();
  referenceDate.setDate(referenceDate.getDate() - 7);
  const timestamp = value.filter(item => new Date(moment(item.timestamp, "DD-MM-YYYY hh:mm:ss").format()) > new Date(referenceDate))
  return timestamp
}