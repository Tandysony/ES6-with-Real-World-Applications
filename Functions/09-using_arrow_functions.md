# Using Arrow Functions

Regular functions can be either **function declarations** or **function expressions**, however **_arrow functions are always expressions_**. In fact, their full name is "arrow function expressions", so they can only be used where an expression is valid. This includes being:

* stored in a variable,
* passed as an argument to a function,
* and stored in an object's property.

One confusing syntax is when an arrow function is stored in a variable.

```js
const greet = name => `Hello ${name}!`; // with template literals
```

In the code above, the arrow function is stored in the greet variable and you'd call it like this:

```js
greet("Asser");
```

> **Returns:** Hello Asser!

## Parentheses and arrow function parameters

You might have noticed the arrow function from the `greet()` function looks like this:

```js
name => `Hello ${name}!`;
```

If you recall, the parameter list appears before the arrow function's arrow (i.e. `=>`). If there's **only one parameter** in the list, then you can write it just like the example above. But, if there are **two or more items** in the parameter list, or if there are **zero items** in the list, then you need to wrap the list in parentheses:

```js
// empty parameter list requires parentheses
const sayHi = () => console.log("Hello ES6/ES2015!");
sayHi();
```

> **Prints:** Hello ES6/ES2015!

```js
// multiple parameters requires parentheses
const orderIceCream = (flavor, cone) =>
  console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);

orderIceCream("chocolate", "waffle");
```

> **Prints:** Here's your chocolate ice cream in a waffle cone.

## Quiz 1

Which of the following choices have correctly formatted arrow functions?

```js
// option 1
setTimeout(() => {
  console.log("Starting the test");
  test.start();
}, 2000);

// option 2
setTimeout(_ => {
  console.log("Starting the test");
  test.start();
}, 2000);

// option 3
const vowels = "aeiou".split("");
const bigVowels = vowels.map(letter => letter.toUpperCase());

// option 4
const vowels = "aeiou".split("");
const bigVowels = vowels.map(letter => letter.toUpperCase());
```

Actually, each one of these is correct. If there's no parameter to the function, you just use a pair of empty parentheses like option 1. Alternatively, some developers choose to _use an underscore as their single parameter_. The underscore never gets used, so it's `undefined` inside the function, but it's _a common technique_.

The only difference between options 3 and 4 is the use of the parentheses around `letter`. Typically, if there's only one parameter, then no parentheses are used, but it's not wrong.

## Concise and block body syntax

All of the arrow functions we've been looking at have only had a single expression as the function body:

```js
const upperizedNames = ["Farrin", "Kagure", "Asser"].map(name =>
  name.toUpperCase()
);
```

This format of the function body is called the "_concise body syntax_". The concise syntax:

* has no curly braces surrounding the function body
* and automatically returns the expression.

If you need more than just a single line of code in your arrow function's body, then you can use the "_block body syntax_".

```js
const upperizedNames = ["Farrin", "Kagure", "Asser"].map(name => {
  name = name.toUpperCase();
  return `${name} has ${name.length} characters in their name`;
});
```

Important things to keep in mind with the _block syntax_:

* it **uses curly braces** to wrap the function body
* and a `return` statement **needs to be used** to actually return something from the function.

## Quiz 2

Using your knowledge of how arrow functions work with automatic returns and curly braces, which of the following choices have correctly formatted arrow functions?

```js
// option 1
const colors = ["red", "blue", "green", "yellow", "orange", "black"];

const crazyColors = colors.map(color => {
  const jumble = color.split("").reverse();
  return jumble.joint("") + "!";
});

// option 2
const colors = ["red", "blue", "green", "yellow", "orange", "black"];

const crazyColors = colors.map(color => {
  color.split("").reverse().join("") + "!";
});

// option 3
const colors = ["red", "blue", "green", "yellow", "orange", "black"];

const crazyColors = colors.map(color =>
  return color.split("").reverse().join("") + "!");

// option 4
const colors = ["red", "blue", "green", "yellow", "orange", "black"];

const crazyColors = colors.map(color =>
  color.split("").reverse().join("") + "!");
```

Option 1 is correct. Because the arrow function **uses curly braces**, there **has to be a `return`** in there somewhere for something to actually be returned.

Option 2 is not correct because it **has curly braces and no return**. This function runs, but nothing gets returned to `crazyColors`.

Option 3 **doesn't have curly braces**. This means it needs to be in the concise syntax and automatically return the expression so it should not have a return keyword, so this one isn't correct.

Option 4 is correct. This is the most common way you'll see arrow functions written—as one-liners that automatically return.

## Sumup

So arrow functions are awesome!

* The syntax is a lot shorter,
* it's easier to write and read short, single-line functions,
* and they automatically return when using the **concise body syntax**!

> **WARNING:** Everything's not all ponies and rainbows though, and there are definitely times when you might _not_ want to use an arrow function. So before you wipe from your memory how to write a traditional function, check out these implications:
>
> * there's a gotcha with the `this` keyword in arrow functions
>   * go to the next lesson to find out the details!
> * arrow functions are only _expressions_
>   * there's no such thing as an arrow function declaration

## Quiz 3

Convert the function passed to the `map()` method into an arrow function.

```js
// convert to an arrow function
const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(square) {
  return square * square;
});

console.log(...squares);
```

THe arrow function way:

```js
// Using arrow function
const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(square => square * square);

console.log(...squares);
```

> **Prints:** 1 4 9 16 25 36 49 64 81 100
