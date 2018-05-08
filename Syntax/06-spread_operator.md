# Spread Operator

The **spread operator**, written with three consecutive dots ( `...` ), is new in ES6 and gives you the ability to expand, or **_spread_**, [iterable objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators) into multiple elements.

Let’s take a look at a few examples to see how it works.

```js
const books = [
  "Don Quixote",
  "The Hobbit",
  "Alice in Wonderland",
  "Tale of Two Cities"
];
console.log(...books);
```

> **Prints:** Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities

```js
const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
```

> **Prints:** 2 3 5 7 11 13 17 19 23 29

If you look at the output from the examples, notice that both the _array_ and _set_ have been expanded into their individual elements. So how is this useful?

> NOTE: Sets are a new built-in object in ES6 that we’ll cover in more detail later.

## Combining arrays with concat

One example of when the spread operator can be useful is _when combining arrays_.

If you’ve ever needed to combine multiple arrays, prior to the spread operator, you were forced to use the Array’s `concat()` method.

```js
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = fruits.concat(vegetables);
console.log(produce);
```

> **Prints:** ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]

This isn’t terrible, but wouldn’t it be nice if there was a shorthand way to write this code?

```js
const product = [fruits, vegetables];
console.log(product);
```

> **Prints:** [Array[3], Array[3]]

Unfortunately, that doesn’t work.

Instead of combining both arrays, this code actually adds the `fruits` array at the first index and the `vegetables` array at the second index of the `product` array.

Now use the spread operator:

```js
/*
 * Instructions: Use the spread operator to combine the `fruits` and `vegetables` arrays into the `produce` array.
 */

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

const product = [...fruits, ...vegetables];

console.log(product);
```

> **Prints:** ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]
