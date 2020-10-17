const categorize = require("./main");

test("can categorize an array", () => {
  const animals = [
    { name: "Bechbech", type: "Cat" },
    { name: "Machmouch", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Tyzon", type: "Dog" },
    { name: "Pablo", type: "Dog" },
    { name: "Luna", type: "Dog" },
  ];
  const categories = [
    { name: "cats", filter: (animal) => animal.type === "Cat" },
    { name: "dogs", filter: ({ type }) => type === "Dog" },
    {
      name: "Spencer",
      filter: ({ type, name }) => type === "Dog" && name === "Spencer",
    },
  ];
  const animalsCategorized = categorize(animals, categories);
  expect(animalsCategorized).toEqual({
    cats: [
      { name: "Bechbech", type: "Cat" },
      { name: "Machmouch", type: "Cat" },
    ],
    dogs: [
      { name: "Spencer", type: "Dog" },
      { name: "Tyzon", type: "Dog" },
      { name: "Pablo", type: "Dog" },
      { name: "Luna", type: "Dog" },
    ],
    Spencer: [{ name: "Spencer", type: "Dog" }],
  });
});

test("should throw an erroray", () => {
  const animals = [
    { name: "Bechbech", type: "Cat" },
    { name: "Machmouch", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Tyzon", type: "Dog" },
    { name: "Pablo", type: "Dog" },
    { name: "Luna", type: "Dog" },
  ];
  const categories = [
    { name: "cats", filter: (animal) => animal.type === "Cat" },
    { name: "dogs", filter: "Dog" },
    {
      name: "Spencer",
      filter: ({ type, name }) => type === "Dog" && name === "Spencer",
    },
  ];
  expect(() => {
    categorize(animals, categories);
  }).toThrow(new TypeError("categories[1].filter must be a function"));
});
