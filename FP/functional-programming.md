# Functional Programming

**Functional programming** (**FP**) is the process of building software by composing **pure functions**, avoiding **shared state**, **mutable data**, and **side-effects**. Functional programming is **declarative** rather than **imperative**, and application state flows through pure functions. Contrast with object oriented programming, where application state is usually shared and collocated with methods in objects.

Functional programming is a **programming paradigm**. Other examples of programming paradigms include object _oriented programming_ and _procedural programming_. Functional code tends to be **more concise, more predictable, and easier to test** than imperative or object oriented code.

## Basic Concepts in FP

As stated above, some basic concepts should be understood first:

- Pure functions
- Function composition
- Avoid shared state
- Avoid mutating state
- Avoid side effects

### 1. Pure function

A **function** is a process which takes some input, called **arguments**, and produces some output called a **return value**. Functions may serve the following purposes:

- **Mapping**: Produce some output based on given inputs. A function maps input values to output values.

- **Procedures**: A function may be called to perform a sequence of steps. The sequence is known as a procedure, and programming in this style is known as procedural programming.

- **I/O**: Some functions exist to communicate with other parts of the system, such as the screen, storage, system logs, or network.

**_Pure functions are all about mapping_**. A function will take the inputs and return the corresponding output. E.g.:

```js
const double = x => x * 2;
console.log(double(5)); // 10
```

So, `console.log( double(5) );` is the same as `console.log(10);`

This is true because `double()` is a **pure function**, but if `double()` had side-effects, such as saving the value to disk or logging to the console, you couldn’t simply replace `double(5)` with `10` without changing the meaning.

`Math.random()` is **not** pure function because it always returns new value on each call.

If you want referential transparency, you need to use pure functions.
A pure function is a function which:

- Given the same input, will always return the same output.
- Produces no side effects.

Pure functions have many beneficial properties, and form the foundation of functional programming. Pure functions are

- completely independent of outside state, and as such, they are immune to entire classes of bugs that have to do with shared mutable state.

- extremely independent — easy to move around, refactor, and reorganize in your code, making your programs more flexible and adaptable to future changes.

- Their independent nature also makes them great candidates for parallel processing across many CPUs, and across entire distributed computing clusters, which makes them essential for many types of scientific and resource-intensive computing tasks.

### 2. Function Composition

Function composition is the process of combining two or more functions in order to produce a new function or perform some computation. For example, the composition `f . g` (the dot means “composed with”) is equivalent to `f(g(x))` in JavaScript. It evaluates from the **inside out — right to left**. In other words, the evaluation order is:

    1. `x`
    2. `g`
    3. `f`

Let’s look at this more closely in code. Imagine you want to convert user’s full names to URL slugs to give each of your users a profile page. In order to do that, you need to walk through a series of steps:

    1. split the name into an array on spaces
    2. map the name to lower case
    3. join with dashes
    4. encode the URI component

Here’s a simple implementation:

```js
const toSlug = input =>
  encodeURIComponent(
    input
      .split(" ")
      .map(str => str.toLowerCase())
      .join("-")
  );
```

Not bad… but what if I told you it could be more readable?

Imagine each of these operations had a corresponding composable function. This could be written as:

```js
const toSlug = input =>
  encodeURIComponent(join("-")(map(toLowerCase)(split(" ")(input))));

console.log(toSlug("JS Cheerleader")); // 'js-cheerleader'
```

This looks even harder to read than our first attempt, but hang in there, this is going somewhere.

In order to accomplish this, we’re using composable forms of common utilities like `split()`, `join()` and `map()`. Here are the implementations:

```js
const curry = fn => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const join = curry((str, arr) => arr.join(str));

const toLowerCase = str => str.toLowerCase();

const split = curry((splitOn, str) => str.split(splitOn));
```

With the exception of `toLowerCase()`, production-tested versions of all of these functions are available from `Lodash/fp`. You can import them like this:

```js
import { curry, map, join, split } from "lodash/fp";
```

### 3. Shared State

**Shared state** is any variable, object, or memory space that exists in a shared scope, or as the property of an object being passed between scopes. A shared scope can include global scope or closure scopes. Often, in object oriented programming, objects are shared between scopes by adding properties to other objects.

**Shared state** are timing dependent:

```js
// With shared state, the order in which function calls are made
// changes the result of the function calls.
const x = {
  val: 2
};

const x1 = () => (x.val += 1);

const x2 = () => (x.val *= 2);

x1();
x2();

console.log(x.val); // 6

// This example is exactly equivalent to the above, except...
const y = {
  val: 2
};

const y1 = () => (y.val += 1);

const y2 = () => (y.val *= 2);

// ...the order of the function calls is reversed...
y2();
y1();

// ... which changes the resulting value:
console.log(y.val); // 5
```

A change in one function, or the timing of a function call won’t ripple out and break other parts of the program.

```js
const x = {
  val: 2
};

const x1 = x => Object.assign({}, x, { val: x.val + 1 });

const x2 = x => Object.assign({}, x, { val: x.val * 2 });

console.log(x1(x2(x)).val); // 5

const y = {
  val: 2
};

// Since there are no dependencies on outside variables,
// we don't need different functions to operate on different
// variables.

// this space intentionally left blank

// Because the functions don't mutate, you can call these
// functions as many times as you want, in any order,
// without changing the result of other function calls.
x2(y);
x1(y);

console.log(x1(x2(y)).val); // 5
```

In the example above, we use `Object.assign()` and pass in an empty object as the first parameter to copy the properties of `x` instead of mutating it in place.

> **Remove function call timing dependency, and you eliminate an entire class of potential bugs.**

## References

- [Master the JavaScript Interview: What is Functional Programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
