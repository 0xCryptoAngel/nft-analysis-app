export  default function salesData(value) {
  let referenceDate = new Date();
    referenceDate.setMonth(referenceDate.getMonth() - 1);
    var sum = 0;
    sales.data.items?.forEach(function(num) { sum += num.event_price });
    let average = sum / sales.data.items.length;
    let filter = sales.data.items?.filter(item => item.event_price < average && new Date(referenceDate) < new Date(item.event_date))
    setSalesData(filter.reverse())
  return  colorType[Math.floor(Math.random() * 16)]
}