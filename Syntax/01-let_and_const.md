# Let and Const

There are two new ways to declare variables in ES6: `let` and `const`.

## Keyword `var`

Before ES6, the only way to declare a variable in JavaScript was to use the keyword `var`. To understand why `let` and `const` were added, it’s probably best to look at an example of when using var can get us into trouble.

Take a look at the following code.

```js
function getClothing(isCold) {
  if (isCold) {
    var freezing = "Grab a jacket!";
  } else {
    var hot = "Ware a T-shirt.";
    console.log(freezing);
  }
}

getClothing(false);
```

When running the function `getClothing(false)`, the result will be `undefined`, instead of `ReferenceError: freezing is not defined`. Why? Before answering this question, another concept `Hoisting` should be well understood.

## Hoisting

Hoisting is a result of how JavaScript is interpreted by your browser. Essentially, before any JavaScript code is executed, all variables are "**hoisted**", which means they're raised to the top of the function scope. So at run-time, the `getClothing()` function actually equivalent to

```js
function getClothing(isCold) {
  var freezing, hot; // <<-- hoisting
  if (isCold) {
    freezing = "Grab a jacket!";
  } else {
    hot = "Ware a T-shirt.";
    console.log(freezing);
  }
}

getClothing(false);
```

when you used `var`, variables were either scoped **_globally_** or **_locally to an entire function scope_**. So, you would get `undefined` exception, instead of `ReferenceError`.

## `let` and `const`

Variables declared with `let` and `const` eliminate this specific issue of hoisting because they’re scoped **_to the block_**, not to the function.

If a variable is declared using `let` or `const` inside a block of code (denoted by curly braces `{` `}`), then the variable is stuck in what is known as the `temporal dead zone` until the variable’s declaration is processed. This behavior **_prevents variables from being accessed only until after they’ve been declared_**.

```js
function getClothing(isCold) {
  if (isCold) {
    let freezing = "Grab a jacket!"; // <<-- only available within the if block
  } else {
    let hot = "Ware a T-shirt."; // <<-- only available within the else block
    console.log(freezing);
  }
}

getClothing(false);
```

When running the function `getClothing(false)` this time, the result will be `ReferenceError: freezing is not defined`.

## Rules for using `let` and `const`

`let` and `const` also have some other interesting properties.

* Variables declared with `let` **_can be reassigned_**, but **_can’t be re-declared in the same scope_**.

* Variables declared with `const` **_must be assigned an initial value_**, but **_can’t be re-declared in the same scope_**, and **_can’t be reassigned_**.

Take a look at the following example:

```js
let instructor = "James";
instructor = "Richard";
console.log(instructor);
```

The result will be `Richard`.

## Use cases

The big question is when should you use let and const? The general rule of thumb is as follows:

* use `let` when you plan to reassign new values to a variable, and
* use `const` when you don’t plan on reassigning new values to a variable.

Since `const` is the strictest way to declare a variable, we suggest that you always declare variables with `const` because it'll make your code easier to reason about since you know the identifiers won't change throughout the lifetime of your program. If you find that you need to update a variable or change it, then go back and switch it from `const` to `let`.

That’s pretty straightforward, right? But what about `var`?

## What about var?

Is there any reason to use `var` anymore? **Not really**.

There are some arguments that can be made for using `var` in situations where you want to globally define variables, but this is often considered bad practice and should be avoided. From now on, we suggest **ditching `var`** in place of using `let` and `const`.
