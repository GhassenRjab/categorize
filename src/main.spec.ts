import { expect, test } from "@jest/globals";
import { categorize } from "./main";
import antelopes from "../fixtures/antelopes.json";

test("categorize array items", () => {
  const categories = [
    {
      name: "twisted",
      filter: ({ horns }: { horns: string }) => horns === "Twisted",
    },
    {
      name: "straight",
      filter: ({ horns }: { horns: string }) => horns === "Straight",
    },
    {
      name: "spiky",
      filter: ({ horns }: { horns: string }) => horns === "Spiky",
    },
  ] as const;
  const antelopesCategorized = categorize(antelopes, categories);
  expect(Object.keys(antelopesCategorized)).toEqual([
    "twisted",
    "straight",
    "spiky",
  ]);
  // twisted category should be an array
  expect(antelopesCategorized.twisted).toBeInstanceOf(Array);
  // there are 5 antelopes with twisted horns
  expect(antelopesCategorized.twisted!.length).toBe(5);
  // every antelope in the twisted category should have twisted horns
  antelopesCategorized.twisted!.forEach((animal) => {
    expect(animal.horns).toBe("Twisted");
  });
  // straight category should be an array
  expect(antelopesCategorized.straight).toBeInstanceOf(Array);
  // there are 4 antelopes with straight horns
  expect(antelopesCategorized.straight!.length).toBe(4);
  // every antelope in the straight category should have straight horns
  antelopesCategorized.straight!.forEach((animal) => {
    expect(animal.horns).toBe("Straight");
  });
  // spiky category should be an array
  expect(antelopesCategorized.spiky).toBeInstanceOf(Array);
  // there are 3 antelopes with spiky horns
  expect(antelopesCategorized.spiky!.length).toBe(3);
  // every antelope in the spiky category should have spiky horns
  antelopesCategorized.spiky!.forEach((animal) => {
    expect(animal.horns).toBe("Spiky");
  });
});

test("result should contain only found categories", () => {
  const categories = [
    {
      name: "twisted",
      filter: ({ horns }: { horns: string }) => horns === "Twisted",
    },
    {
      name: "flat",
      filter: ({ horns }: { horns: string }) => horns === "Flat",
    },
  ] as const;
  const antelopesCategorized = categorize(antelopes, categories);
  // there are no antelopes with flat horns
  expect(Object.keys(antelopesCategorized)).toEqual(["twisted"]);
});

test("result should be empty if no categories are provided", () => {
  const antelopesCategorized = categorize(antelopes, []);
  expect(Object.keys(antelopesCategorized)).toEqual([]);
});

test("result should be empty if no items are provided", () => {
  const categories = [
    {
      name: "twisted",
      filter: ({ horns }: { horns: string }) => horns === "Twisted",
    },
    {
      name: "flat",
      filter: ({ horns }: { horns: string }) => horns === "Flat",
    },
  ] as const;
  const antelopesCategorized = categorize([], categories);
  expect(Object.keys(antelopesCategorized)).toEqual([]);
});

test("result should be empty if no items and no categories are provided", () => {
  const antelopesCategorized = categorize([], []);
  expect(Object.keys(antelopesCategorized)).toEqual([]);
});

test("an item can be in multiple categories", () => {
  const categories = [
    {
      name: "twisted",
      filter: ({ horns }: { horns: string }) => horns === "Twisted",
    },
    {
      name: "africa",
      filter: ({ continent }: { continent: string }) => continent === "Africa",
    },
  ] as const;
  const antelopesCategorized = categorize(antelopes, categories, {
    singleCategoryMatch: false,
  });
  expect(Object.keys(antelopesCategorized)).toEqual(["twisted", "africa"]);
  // there are 5 antelopes with twisted horns
  expect(antelopesCategorized.twisted!.length).toBe(5);
  // there are 20 antelopes from Africa
  expect(antelopesCategorized.africa!.length).toBe(20);
  // there are 4 antelopes (Addax, Bushbuck, Greater kudu and Hartebeest) with twisted horns from Africa
  expect(
    antelopesCategorized
      .twisted!.filter(({ continent }) => continent === "Africa")
      .map(({ name }) => name),
  ).toEqual(["Addax", "Bushbuck", "Greater kudu", "Hartebeest"]);
  // Addax, Bushbuck, Greater kudu and Hartebeest are from Africa
  expect(
    antelopesCategorized
      .africa!.filter(({ horns }) => horns === "Twisted")
      .map(({ name }) => name),
  ).toEqual(["Addax", "Bushbuck", "Greater kudu", "Hartebeest"]);
});
