const { validate, ValidationError } = require("./lib/validation");

const categorize = (array, categories) => {
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

exports.categorize = async (array, categories) => categorize(array, categories);

exports.categorizeSync = (array, categories) => categorize(array, categories);

exports.ValidationError = ValidationError;
