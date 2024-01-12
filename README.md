# categorize

[![Codecov Coverage](https://img.shields.io/codecov/c/github/GhassenRjab/categorize/main.svg)](https://codecov.io/gh/GhassenRjab/categorize/)

`categorize` is a utility library that let's us organize array items with a single pass through the array. Which can be more efficient for large datasets.

`categorize` is useful in scenarios where we need to categorize items based on certain criteria or filters. Here are some use cases where it can be helpful:

- **Filtering and Organizing Data**: If we have a collection of items and we want to organize them into different categories based on specific criteria, `categorize` allows us to do that efficiently;

- **Data Analysis**: In data analysis scenarios, we might have a dataset and want to categorize items based on different attributes or conditions. `categorize` provides a clean and flexible way to perform such categorization;

- **User Interface**: In frontend development, we might use `categorize` to categorize and display data in a user interface. For example, we could categorize products based on their type, price range, or availability.

- **Dynamic Grouping**: `categorize` allows us to dynamically define categories with custom filters, providing flexibility in how we categorize our data.

## Installation

Using npm

```sh
npm install categorize
```

## Example

You can import the library using CommonJS

```js
const { categorize } = require("categorize");
```

Or using ES Modules

```js
import { categorize } from "categorize";
```

Here is an example of how to use it:

```typescript
const antelopes = [
  { name: "Addax", continent: "Africa", horns: "Twisted" },
  { name: "Arabian oryx", continent: "Asia", horns: "Straight" },
  { name: "Bay duiker", continent: "Africa", horns: "Spiky" },
  { name: "Blackbuck", continent: "Asia", horns: "Twisted" },
  { name: "Bongo", continent: "Africa", horns: "Spiraled" },
  { name: "Bushbuck", continent: "Africa", horns: "Twisted" },
];
const categories = [
  { name: "africa", filter: (antelope) => animal.continent === "Africa" },
  { name: "asia", filter: ({ continent }) => continent === "Asia" },
  { name: "twisted", filter: ({ horns }) => horns === "Asia" },
] as const; // as const is important to infer the result's type
const antelopesCategorized = categorize(animals, categories);
```

Thanks to TypeScript the result is typed!

![Result is typed!](/assets/typed-result.jpeg "Result is typed!")

`antelopesCategorized` will contain this object:

```json
{
  "africa": [
    { "name": "Addax", "continent": "Africa", "horns": "Twisted" },
    { "name": "Bay duiker", "continent": "Africa", "horns": "Spiky" },
    { "name": "Bongo", "continent": "Africa", "horns": "Spiraled" },
    { "name": "Bushbuck", "continent": "Africa", "horns": "Twisted" }
  ],
  "asia": [
    { "name": "Arabian oryx", "continent": "Asia", "horns": "Straight" },
    { "name": "Blackbuck", "continent": "Asia", "horns": "Twisted" }
  ]
}
```

With this format, you can use object destructuring to have you items categorized inside their own variables, like this:

```js
const { africa, asia } = categorize(animals, categories);
```

The category's name will be used to contain the array items. And the category's filter will be used to filter them out.

By default an item will match the first category only. If you want to make an item match multiple categories you need to set `singleCategoryMatch` to `false` in the `options` parameter.

```typescript
const antelopes = [
  { name: "Addax", continent: "Africa", horns: "Twisted" },
  { name: "Arabian oryx", continent: "Asia", horns: "Straight" },
  { name: "Bay duiker", continent: "Africa", horns: "Spiky" },
  { name: "Blackbuck", continent: "Asia", horns: "Twisted" },
  { name: "Bongo", continent: "Africa", horns: "Spiraled" },
  { name: "Bushbuck", continent: "Africa", horns: "Twisted" },
];
const categories = [
  { name: "africa", filter: (antelope) => animal.continent === "Africa" },
  { name: "asia", filter: ({ continent }) => continent === "Asia" },
  { name: "twisted", filter: ({ horns }) => horns === "Twisted" },
] as const; // as const is important to infer the result's type
const antelopesCategorized = categorize(animals, categories, {
  singleCategoryMatch: false,
});
```

`antelopesCategorized` will contain this object:

```json
{
  "africa": [
    { "name": "Addax", "continent": "Africa", "horns": "Twisted" },
    { "name": "Bay duiker", "continent": "Africa", "horns": "Spiky" },
    { "name": "Bongo", "continent": "Africa", "horns": "Spiraled" },
    { "name": "Bushbuck", "continent": "Africa", "horns": "Twisted" }
  ],
  "asia": [
    { "name": "Arabian oryx", "continent": "Asia", "horns": "Straight" },
    { "name": "Blackbuck", "continent": "Asia", "horns": "Twisted" }
  ],
  "twisted": [
    { "name": "Addax", "continent": "Africa", "horns": "Twisted" },
    { "name": "Bushbuck", "continent": "Africa", "horns": "Twisted" },
    { "name": "Blackbuck", "continent": "Asia", "horns": "Twisted" }
  ]
}
```

If you don't set `singleCategoryMatch` to `false`, `twisted` category wouldn't be added to the result as all antelopes with twisted horns will be matched to the continents' categories first.

## Documentation

`categorize` function accepts these parameters:

- The **array** that will be categorized;
- The **categories** array, each category needs to have:
  - A unique **name** that will be used to contain the categorized items;
  - A **filter** that will be used to test against the array items to determine to which category they belong.
- The optional **options** parameters. With it we can pass:
  - **singleCategoryMatch** option which allow us to tell categorize if want an item to match a single category (`true`) or more (`false`). By default it's set to `true`.
