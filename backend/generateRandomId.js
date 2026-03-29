const generateRandomId = (prefix, length) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return `${prefix}-${Math.floor(Math.random() * (max - min + 1) + min)}`;
};
module.exports = { generateRandomId }
