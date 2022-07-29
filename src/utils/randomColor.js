export  default function randomColor() {
  const colorType = ['#5F9EA0',	'#4682B4', '#B0C4DE', '#ADD8E6', '#B0E0E6',	'#87CEFA', '#87CEEB', '#6495ED',  '#00BFFF', '#1E90FF',	'#4169E1',	'#0000FF',	'#0000CD',	'#00008B',	'#000080', '#191970'];
  return  colorType[Math.floor(Math.random() * 16)]
}