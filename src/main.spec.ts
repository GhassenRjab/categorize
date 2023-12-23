import { expect, test } from "@jest/globals";
import { categorize } from "./main";

type Animal = {
  name: string;
  type: string;
};

test("can categorize an array", () => {
  const animals: Animal[] = [
    { name: "Bechbech", type: "Cat" },
    { name: "Machmouch", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Tyzon", type: "Dog" },
    { name: "Pablo", type: "Dog" },
    { name: "Luna", type: "Dog" },
  ];
  const categories = [
    { name: "cats", filter: (animal: Animal) => animal.type === "Cat" },
    { name: "dogs", filter: ({ type }: Animal) => type === "Dog" },
    {
      name: "Spencer",
      filter: ({ type, name }: Animal) => type === "Dog" && name === "Spencer",
    },
  ] as const;
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

test("result should contain only found categories", () => {
  const animals: Animal[] = [
    { name: "Bechbech", type: "Cat" },
    { name: "Machmouch", type: "Cat" },
  ];
  const categories = [
    { name: "cats", filter: (animal: Animal) => animal.type === "Cat" },
    { name: "dogs", filter: ({ type }: Animal) => type === "Dog" },
  ] as const;
  const animalsCategorized = categorize(animals, categories);
  expect(animalsCategorized).toEqual({
    cats: [
      { name: "Bechbech", type: "Cat" },
      { name: "Machmouch", type: "Cat" },
    ],
  });
});
