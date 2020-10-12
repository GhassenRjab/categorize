const { ValidationError } = require("yup");
const argsSchema = require("./validation");

test("arguments are validated", () => {
  const args = {
    array: [
      { name: "Bechbech", type: "Cat" },
      { name: "Spencer", type: "Dog" },
      { name: "Taxi", type: "Bird" },
    ],
    categories: [{ name: "cats", filter: ({ type }) => type === "Cat" }],
  };
  const validatedArgs = argsSchema.validateSync(args);
  expect(validatedArgs).toEqual(args);
});

test("array is required", () => {
  const args = {
    categories: [{ name: "cats", filter: ({ type }) => type === "Cat" }],
  };
  expect(() => {
    argsSchema.validateSync(args);
  }).toThrow(new ValidationError("array is a required field"));
});

test("array must be an array", () => {
  const args = {
    array: "categorize",
    categories: [{ name: "cats", filter: ({ type }) => type === "Cat" }],
  };
  expect(() => {
    argsSchema.validateSync(args);
  }).toThrow(
    new ValidationError(`array must be a \`array\` type, but the final value was: \`null\` (cast from the value \`"categorize"\`).
 If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``)
  );
});

test("categories are required", () => {
  const args = {
    array: [
      { name: "Bechbech", type: "Cat" },
      { name: "Spencer", type: "Dog" },
      { name: "Taxi", type: "Bird" },
    ],
  };
  expect(() => {
    argsSchema.validateSync(args);
  }).toThrow(new ValidationError("categories is a required field"));
});

test("categories must be an array", () => {
  const args = {
    array: [
      { name: "Bechbech", type: "Cat" },
      { name: "Spencer", type: "Dog" },
      { name: "Taxi", type: "Bird" },
    ],
    categories: "cats",
  };
  expect(() => {
    argsSchema.validateSync(args);
  }).toThrow(
    new ValidationError(`categories must be a \`array\` type, but the final value was: \`null\` (cast from the value \`"cats"\`).
 If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``)
  );
});

test("each category must be contain a name field", () => {
  const args = {
    array: [
      { name: "Bechbech", type: "Cat" },
      { name: "Spencer", type: "Dog" },
      { name: "Taxi", type: "Bird" },
    ],
    categories: [{ filter: ({ type }) => type === "Cat" }],
  };
  expect(() => {
    argsSchema.validateSync(args);
  }).toThrow(new ValidationError("categories[0].name is a required field"));
});

test("a category name can't be empty", () => {
  const args = {
    array: [
      { name: "Bechbech", type: "Cat" },
      { name: "Spencer", type: "Dog" },
      { name: "Taxi", type: "Bird" },
    ],
    categories: [{ name: "", filter: ({ type }) => type === "Cat" }],
  };
  expect(() => {
    argsSchema.validateSync(args);
  }).toThrow(
    new ValidationError("categories[0].name must be at least 1 characters")
  );
});

test("each category must be contain a filter field", () => {
  const args = {
    array: [
      { name: "Bechbech", type: "Cat" },
      { name: "Spencer", type: "Dog" },
      { name: "Taxi", type: "Bird" },
    ],
    categories: [{ name: "cats" }],
  };
  expect(() => {
    argsSchema.validateSync(args);
  }).toThrow(new ValidationError("categories[0].filter is a required field"));
});

test("a category filter must be a function", () => {
  const args = {
    array: [
      { name: "Bechbech", type: "Cat" },
      { name: "Spencer", type: "Dog" },
      { name: "Taxi", type: "Bird" },
    ],
    categories: [{ name: "cats", filter: "Cat" }],
  };
  expect(() => {
    argsSchema.validateSync(args);
  }).toThrow(new ValidationError("categories[0].filter must be a function"));
});

test("categories must have unique names", () => {
  const args = {
    array: [
      { name: "Bechbech", type: "Cat" },
      { name: "Spencer", type: "Dog" },
      { name: "Taxi", type: "Bird" },
    ],
    categories: [
      { name: "cats", filter: ({ type }) => type === "Cat" },
      { name: "cats", filter: ({ type }) => type === "Dog" },
    ],
  };
  expect(() => {
    argsSchema.validateSync(args);
  }).toThrow(new ValidationError("categories must have unique names"));
});
