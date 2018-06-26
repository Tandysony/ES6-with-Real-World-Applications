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

This is true because `double()` is a **pure function**, but if `double()` had side-effects, such as saving the value to disk or logging to the console, you couldn’t simply replace `double(5)` with 10 without changing the meaning.

If you want referential transparency, you need to use pure functions.
A pure function is a function which:

- Given the same input, will always return the same output.
- Produces no side effects.

Pure functions have many beneficial properties, and form the foundation of functional programming. Pure functions are

- completely independent of outside state, and as such, they are immune to entire classes of bugs that have to do with shared mutable state.

- extremely independent — easy to move around, refactor, and reorganize in your code, making your programs more flexible and adaptable to future changes.

- Their independent nature also makes them great candidates for parallel processing across many CPUs, and across entire distributed computing clusters, which makes them essential for many types of scientific and resource-intensive computing tasks.

### Function Composition

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

## References

- [Master the JavaScript Interview: What is Functional Programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
