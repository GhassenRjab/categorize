const yup = require("yup");

module.exports = yup.object().shape({
  array: yup.array().required(),
  categories: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().min(1).required(),
        filter: yup
          .mixed()
          .required()
          .test({
            name: "function",
            exclusive: true,
            message: "${path} must be a function",
            test: (filter) => filter instanceof Function,
          }),
      })
    )
    .required()
    .test({
      name: "unique-category-names",
      exclusive: true,
      message: "${path} must have unique names",
      test: (categories) => {
        if (!categories) {
          return;
        }
        const names = categories.map(({ name }) => name);
        return names.length === [...new Set(names)].length;
      },
    }),
});
