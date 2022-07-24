export  default function formatPeriod(period) {
  let seconds = Number(period);
  var d = Math.floor(seconds / (60*24));
  var h = Math.floor(seconds % (60*24) / 60);
  var m = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + "D" : "";
  var hDisplay = h > 0 ? h + "H" : "";
  var mDisplay = m > 0 ? m + "M" : "";
  
  return dDisplay + hDisplay + mDisplay;
}