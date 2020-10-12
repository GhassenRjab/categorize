# categorize

This library categorizes arrays. It organizes array elements into categories.

##  Installation

Using npm

```sh
npm install categorize
```

Using yarn

```sh
yarn add categorize
```

## Example

You can import the library using CommonsJS

```js
const { categorize } = require('categorize');
```

Or using ES modules

```js
import { categorize } from 'categorize';
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
  { name: "cats", filter: ({ type }) => type === "Cat" },
  { name: "dogs", filter: ({ type }) => type === "Dog" },
  { name: "birds", filter: ({ type }) => type === "Bird" },
];
const animalsCategorized = await categorize(animals, categories);
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
  ]
}
```
With this format, you can use array destructuring to have you elements categorized inside their own variables, like this:
```js
const { cats, dogs } = await categorize(animals, categories);
```
The category's name will be used to contain the array elements. And the category's filter will be used to filter out these array elements.

## Documentation

You can use the async version of categorize wich is called `categorize` (used in the example above), or the sync version which is called `categorizeSync`.

```js
const { categorizeSync } = require('categorize');
// animals and categories definitions here
const { cats, dogs } = categorizeSync(animals, categories);
```

Both functions accepts the same parameters, which are:

- The **array** that will be categorized;
- The **categories** array, each category needs to have:
    - A unique **name** that will be used to contain the categorized elements;
    - A **filter** that will be used to test against the array elements to determine to what category they belong.

This library uses `yup` to validate the parameters passed to categorize.
It will throw a `yup`'s `ValidationError` if the parameters are not well passed.
All validation tests can be found [here](src/lib/validation.test.js) 
