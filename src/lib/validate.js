export default (array, categories) => {
  if (!array) {
    throw new TypeError("array is required");
  }
  if (!Array.isArray(array)) {
    throw new TypeError("array must be an array");
  }
  if (!categories) {
    throw new TypeError("categories are required");
  }
  if (!(categories instanceof Object)) {
    throw new TypeError("categories must be an object");
  }
  Object.entries(categories).forEach(([name, filter]) => {
    if (!(filter instanceof Function)) {
      throw new TypeError(`${name} category's filter must be a function`);
    }
  });
  return true;
};
