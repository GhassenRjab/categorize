import validate from "./lib/validate";

export default (array, categories) => {
  validate(array, categories);
  return array.reduce((result, item) => {
    Object.entries(categories).forEach(([name, filter]) => {
      if (filter(item)) {
        (result[name] ??= []).push(item);
      }
    });
    return result;
  }, {});
};
