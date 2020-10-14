const { validate, ValidationError } = require("./lib/validation");

exports.categorize = (array, categories) => {
  validate(array, categories);
  return array.reduce((result, animal) => {
    categories.forEach(({ name, filter }) => {
      if (filter(animal)) {
        if (!result[name]) {
          result[name] = [];
        }
        result[name].push(animal);
      }
    });
    return result;
  }, {});
};

exports.ValidationError = ValidationError;
