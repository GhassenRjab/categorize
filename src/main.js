const { validate, ValidationError } = require("./lib/validation");

exports.categorize = (array, categories) => {
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

exports.ValidationError = ValidationError;
