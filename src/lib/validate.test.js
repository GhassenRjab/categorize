import validate from "./validate";

test("arguments are validated", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = { cats: ({ type }) => type === "Cat" };
  const validatedArgs = validate(array, categories);
  expect(validatedArgs).toBe(true);
});

test("array is required", () => {
  const categories = { cats: ({ type }) => type === "Cat" };
  expect(() => {
    validate(undefined, categories);
  }).toThrow(new TypeError("array is required"));
});

test("array must be an array", () => {
  const array = "categorize";
  const categories = { cats: ({ type }) => type === "Cat" };
  expect(() => {
    validate(array, categories);
  }).toThrow(new TypeError("array must be an array"));
});

test("categories are required", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  expect(() => {
    validate(array);
  }).toThrow(new TypeError("categories are required"));
});

test("categories must be an object", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = "cats";
  expect(() => {
    validate(array, categories);
  }).toThrow(new TypeError("categories must be an object"));
});

test("a category filter must be a function", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = { cats: "Cat" };
  expect(() => {
    validate(array, categories);
  }).toThrow(new TypeError("cats category's filter must be a function"));
});
