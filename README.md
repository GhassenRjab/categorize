# categorize

[![Codecov Coverage](https://img.shields.io/codecov/c/github/GhassenRjab/categorize/main.svg)](https://codecov.io/gh/GhassenRjab/categorize/)

This library categorizes arrays. It organizes array elements into categories.

## Installation

Using npm

```sh
npm install categorize
```

Using yarn

```sh
yarn add categorize
```

## Example

You can import the library using CommonJS

```js
const categorize = require('categorize');
```

Or using ES Modules

```js
import categorize from 'categorize';
```

Or directly throught the CDN

```html
<script src="https://unpkg.com/categorize@3.1.2/dist/main.umd.js" crossorigin></script>
```

Here is an example of how to use it:

```js
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
```

`animalsCategorized` will contain this object:

```json
{
  "cats": [
    { "name": "Bechbech", "type": "Cat" },
    { "name": "Machmouch", "type": "Cat" }
  ],
  "dogs": [
    { "name": "Spencer", "type": "Dog" },
    { "name": "Tyzon", "type": "Dog" },
    { "name": "Pablo", "type": "Dog" },
    { "name": "Luna", "type": "Dog" }
  ],
  "Spencer": [{ "name": "Spencer", "type": "Dog" }]
}
```

With this format, you can use object destructuring to have you elements categorized inside their own variables, like this:

```js
const { cats, dogs } = categorize(animals, categories);
```

The category's name will be used to contain the array elements. And the category's filter will be used to filter them out.

## Documentation

`categorize` function accepts the same parameters, which are:

- The **array** that will be categorized;
- The **categories** array, each category needs to have:
  - A unique **name** that will be used to contain the categorized elements;
  - A **filter** that will be used to test against the array elements to determine to what category they belong.

These library parameters passed to categorize are validated before starting any computation.
The function will throw a `TypeError` if the parameters are not well passed.
All validation tests can be found [here](src/lib/validate.test.js).
