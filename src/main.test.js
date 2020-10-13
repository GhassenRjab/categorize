const { categorize, categorizeSync } = require("./main");

describe("categorize", () => {
  test("can categorize an array", async () => {
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
    const animalsCategorized = await categorize(animals, categories);
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
});

describe("categorizeSync", () => {
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
      { name: "cats", filter: ({ type }) => type === "Cat" },
      { name: "dogs", filter: ({ type }) => type === "Dog" },
    ];
    const animalsCategorized = categorizeSync(animals, categories);
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
    });
  });
});
