const argsSchema = require("./lib/validation");

const categorize = (array, categories) =>
  array.reduce((result, animal) => {
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

exports.categorize = async (arrayArg, categoriesArg) => {
  const { array, categories } = await argsSchema.validate({
    array: arrayArg,
    categories: categoriesArg,
  });
  return categorize(array, categories);
};

exports.categorizeSync = (arrayArg, categoriesArg) => {
  const { array, categories } = argsSchema.validateSync({
    array: arrayArg,
    categories: categoriesArg,
  });
  return categorize(array, categories);
};
