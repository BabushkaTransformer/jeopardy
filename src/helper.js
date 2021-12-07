export const getDataNow = () => {
  return new Date().toLocaleString();
}

export const superTrim = (str) => {
  return str.toLowerCase().replace(/\s/g, '');
}
