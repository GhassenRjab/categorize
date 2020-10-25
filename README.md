# categorize

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
const categories = {
  cats: (animal) => animal.type === "Cat",
  dogs: ({ type }) => type === "Dog",
  Spencer: ({ type, name }) => type === "Dog" && name === "Spencer",
};
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

The category's key will be used to contain the array elements. And the category's value, which is the filter function, will be used to filter them out.

## Documentation

`categorize` function accepts two parameters, which are:

- The **array** that will be categorized;
- The **categories** object, each entry represents a name and a filter:
  - The **name**, which corresponds to the key, will be used to contain the categorized elements;
  - The **filter**, which corresponds to the value, will be used to test against the array elements to determine to what category they belong.

These library parameters passed to categorize are validated before starting any computation.
The function will throw a `TypeError` if the parameters are not well passed.
All validation tests can be found [here](src/lib/validate.test.js).

The library is exported to three different environments:

- Node.js through the main.cjs.js (CommonJS) file;
- Bundlers through the main.esm.js (ES Modules) file;
- Browsers through the main.umd.js (UMD) file.
