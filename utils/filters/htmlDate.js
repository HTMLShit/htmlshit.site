module.exports = function createDate(value) {
  const dateObject = new Date(value);

  return dateObject.toISOString();
};
