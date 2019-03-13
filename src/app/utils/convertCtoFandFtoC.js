export function convertCtoF(temp) {
  return Math.floor((temp * 9) / 5 + 32);
}

export function convertFtoC(temp) {
  return Math.floor(((temp - 32) * 5) / 9);
}
