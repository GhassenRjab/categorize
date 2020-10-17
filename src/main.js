const validate = require("./lib/validate");

module.exports = (array, categories) => {
  validate(array, categories);
  return array.reduce((result, item) => {
    categories.forEach(({ name, filter }) => {
      if (filter(item)) {
        if (!result[name]) {
          result[name] = [];
        }
        result[name].push(item);
      }
    });
    return result;
  }, {});
};
