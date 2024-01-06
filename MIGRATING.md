# Migration guides

## From v3 to v4

Two new breaking changes have been introduced with v4

### Named exports

We no use named exports. Hence `categorize` needs to be imported with this syntax

CommonJS syntax

```js
const { categorize } = require("categorize");
```

ESM syntax

```js
import { categorize } from "categorize";
```

### A new options parameter

By default an item is matched only with the first category. If your categories can host items from other categories you should set `singleCategoryMatch` to `false` in the third and optional parameter `options`

```js
const result = categorize(items, categories, { singleCategoryMatch: false })
```

## From v2 to v3

No migrations needed with this version. We just added `rollup` as build tool and added the browser build in our examples.

## From v1 to v2

The first version of `categorize` used `yup` to validate users' input. With this, the library had two ways to categorize arrays:

- a synchronous way using `categorizeSync` function;
- and an asynchronous way using `categorize` function.

With the second version, we removed `yup` library in order to become a zero-dependency library and did the validation manually.

With this change we only have one way to categorize which is the sychronous way. So we removed the `categorizeSync` function and changed the `categorize` function to become a synchronous one.

### Usage from v1

```js
// asynchronous way
const asyncResult = await categorize(animals, categories);
// synchronous way
const syncResult = categorizeSync(animals, categories);
```

### Usage from v2

```js
const result = categorize(animals, categories);
```
