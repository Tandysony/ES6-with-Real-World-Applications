# Scopes

A **scope** in JavaScript defines _what variables you have access to_. In JavaScript there are two types of scope:

* Global scope
* Local scope

**JavaScript has function scope: Each function creates a new scope.**

Scope determines the accessibility (visibility) of these variables.

## Global scope

A variable declared outside all functions, becomes **GLOBAL**.

A global variable has **global scope**: All scripts and functions on a web page can access it.

```js
// Global scope
const hello = "Hello JavaScript!"; // <- global variable 'hello'

function sayHello() {
  console.log(hello);
}

sayHello(); // 'Hello JavaScript!'
console.log(hello); // 'Hello JavaScript!'
```

Although you can declare variables in the global scope, _it is advised not to_. This is because there is a chance of **naming collisions**, where two or more variables are named the same. If you declared your variables with const or let, you would receive an error whenever you a name collision happens. This is undesirable.

## Local scope

Variables that are usable _only in a specific part_ of your code are considered to be in a **local scope**. These variables are also called _local variables_.

In JavaScript, there are two kinds of local scope: **function scope** and **block scope**.

### Function scope

Variables declared within a JavaScript function, become **LOCAL** to the function. Local variables have **local scope**: They can only be accessed within the function.

```js
// Local scope
function sayHello() {
  const hello = "Hello JavaScript!"; // <- local variable 'hello'
  console.log(hello);
}

sayHello(); // 'Hello JavaScript!'
console.log(hello); // Error, hello is not defined
```

### Block scope

When you declare a variable with const or let within a curly brace (`{}`), you can access this variable _only within that curly brace_.

In the example below, you can see that hello is scoped to the curly brace:

```js
{
  const hello = "Hello JavaScript!";
  console.log(hello); // 'Hello JavaScript!'
}

console.log(hello); // Error, hello is not defined
```

The block scope is a subset of a function scope since functions need to be declared with curly braces (unless you're using [arrow functions](../Functions/08-arrow_functions.md) with an implicit return).

### Function hoisting and scopes

Functions, when declared with a **function declaration**, _are always hoisted_ to the top of the current scope. So, these two are equivalent:

```js
// This is the same as the one below
sayHello();
function sayHello() {
  console.log("Hello JavaScript!");
}

// This is the same as the code above
function sayHello() {
  console.log("Hello JavaScript!");
}
sayHello();
```

When declared with a **function expression**, _functions are not hoisted_ to the top of the current scope.

```js
sayHello(); // Error, sayHello is not defined

const sayHello = function() {
  console.log(aFunction);
};
```

### Nested scopes

When a function is defined in another function, the _inner function has access to the outer function's variables_. This behavior is called **lexical scoping**.

However, _the outer function does not have access to the inner function's variables_.

```js
function outerFunction() {
  const outer = `I'm the outer function!`;

  function innerFunction() {
    const inner = `I'm the inner function!`;
    console.log(outer); // I'm the outer function!
  }

  console.log(inner); // Error, inner is not defined
}
```
