export  default function formatData(address) {
  let data = `${address.slice(0, -34)}...${address.substring(36)}`
  return data
}