import categorize from "./main";

test("can categorize an array", () => {
  const animals = [
    { name: "Bechbech", type: "Cat" },
    { name: "Machmouch", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Tyzon", type: "Dog" },
    { name: "Pablo", type: "Dog" },
    { name: "Luna", type: "Dog" },
  ];
  const categories = {
    cats: (animal) => animal.type === "Cat",
    dogs: ({ type }) => type === "Dog",
    Spencer: ({ type, name }) => type === "Dog" && name === "Spencer",
  };
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
  const categories = {
    cats: (animal) => animal.type === "Cat",
    dogs: "Dog",
    Spencer: ({ type, name }) => type === "Dog" && name === "Spencer",
  };
  expect(() => {
    categorize(animals, categories);
  }).toThrow(new TypeError("dogs category's filter must be a function"));
});
