module.exports = (array, categories) => {
  if (!array) {
    throw new TypeError("array is required");
  }
  if (!Array.isArray(array)) {
    throw new TypeError("array must be an array");
  }
  if (!categories) {
    throw new TypeError("categories are required");
  }
  if (!Array.isArray(categories)) {
    throw new TypeError("categories must be an array");
  }
  const uniqueCategoryNames = new Set();
  categories.forEach(({ name, filter }, index) => {
    if (name === undefined) {
      throw new TypeError(`categories[${index}].name is a required field`);
    }
    if (name === "") {
      throw new TypeError(
        `categories[${index}].name must be at least 1 characters`
      );
    }
    if (!filter) {
      throw new TypeError(`categories[${index}].filter is a required field`);
    }
    if (!(filter instanceof Function)) {
      throw new TypeError(`categories[${index}].filter must be a function`);
    }
    uniqueCategoryNames.add(name);
  });
  if (uniqueCategoryNames.size !== categories.length) {
    throw new TypeError("categories must have unique names");
  }
  return true;
};
