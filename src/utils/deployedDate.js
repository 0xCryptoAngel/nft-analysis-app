import moment from "moment";
export  default function areaChartFilter(value) {
  let referenceDate = new Date();
  referenceDate.setMonth(referenceDate.getMonth() - 1);
  const timestamp = value.filter(item => new Date(moment(item.timestamp, "DD-MM-YYYY hh:mm:ss").format()) > new Date(referenceDate))
  return timestamp
}