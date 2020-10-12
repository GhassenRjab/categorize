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
      { name: "Taxi", type: "Bird" },
      { name: "Brad Pitt", type: "Bird" },
      { name: "Angelina Jolie", type: "Bird" },
    ];
    const categories = [
      { name: "cats", filter: ({ type }) => type === "Cat" },
      { name: "dogs", filter: ({ type }) => type === "Dog" },
      { name: "birds", filter: ({ type }) => type === "Bird" },
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
      birds: [
        { name: "Taxi", type: "Bird" },
        { name: "Brad Pitt", type: "Bird" },
        { name: "Angelina Jolie", type: "Bird" },
      ],
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
      { name: "Taxi", type: "Bird" },
      { name: "Brad Pitt", type: "Bird" },
      { name: "Angelina Jolie", type: "Bird" },
    ];
    const categories = [
      { name: "cats", filter: ({ type }) => type === "Cat" },
      { name: "dogs", filter: ({ type }) => type === "Dog" },
      { name: "birds", filter: ({ type }) => type === "Bird" },
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
      birds: [
        { name: "Taxi", type: "Bird" },
        { name: "Brad Pitt", type: "Bird" },
        { name: "Angelina Jolie", type: "Bird" },
      ],
    });
  });
});
