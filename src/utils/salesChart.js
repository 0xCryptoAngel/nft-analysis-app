export  default function salesData(value) {
  let referenceDate = new Date();
    referenceDate.setMonth(referenceDate.getMonth() - 1);
    var sum = 0;
    value.data.items?.forEach(function(num) { sum += num.event_price });
    let average = 3 * sum / value.data.items.length;
    let filter = value.data.items?.filter(item => item.event_price < average && new Date(referenceDate) < new Date(item.event_date))
  return  filter.reverse()
}