export  default function formatData(address) {
  let data = `${address.slice(0, -36)}...${address.substring(38)}`
  return data
}