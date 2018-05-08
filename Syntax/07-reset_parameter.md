# Reset Parameter

If you can use the spread operator to spread an array into multiple elements, then certainly there should be a way to _bundle multiple elements back into an array
_, right?

In fact, there is! It’s called the **_rest parameter_**, and it’s another new addition in ES6.

## Rest parameter

The **rest parameter**, also written with three consecutive dots ( `...` ), allows you to represent an indefinite number of elements as an array. This can be helpful in a couple of different situations.

One situation is when _assigning the values of an array to variables_. For example,

```js
const order = [20.17, 18.67, 1.5, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
```

> **Prints:** 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]

This code takes the values of the `order` array and assigns them to individual variables using **_destructuring_**. `total`, `subtotal`, and `tax` are assigned the first three values in the array, however, `items` is where you want to pay the most attention.

By using the rest parameter, `items` _is assigned the rest of the values in the array (as an array)_.

## Variadic functions

Another use case for the rest parameter is when you’re working with **variadic functions**. Variadic functions are functions that take an indefinite number of arguments.

For example, let’s say we have a function called `sum()` which calculates the sum of an indefinite amount of numbers. How might the `sum()` function be called during execution?

```js
sum(1, 2);
sum(10, 36, 7, 84, 90, 110);
sum(-23, 3000, 575000);
```

There’s literally an **_endless number of ways_** the `sum()` function could be called. Regardless of the amount of numbers passed to the function, it should always return the total sum of the numbers.

### Using the arguments object

In previous versions of JavaScript, this type of function would be handled using the [arguments object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments). The **arguments object** is an array-like object that is available as a local variable inside all functions. It contains a value for each argument being passed to the function starting at 0 for the first argument, 1 for the second argument, and so on.

If we look at the implementation of our `sum()` function, then you’ll see how the arguments object could be used to handle the variable amount of numbers being passed to it.

```js
function sum() {
  let total = 0;
  for (const argument of arguments) {
    total += argument;
  }
  return total;
}

sum(1, 2, 3, 4, 5);
```

> **Prints:** 15

Now this works fine, but it does have its issues:

1.  If you look at the definition for the `sum()` function, it doesn’t have any parameters.

    * This is misleading because we know the `sum()` function can handle an indefinite amount of arguments.

2.  It can be hard to understand.

    * If you’ve never used the **arguments object** before, then you would most likely look at this code and wonder where the arguments object is even coming from. Did it appear out of thin air? It certainly looks that way.

### Using the rest parameter

Fortunately, with the addition of the rest parameter, you can rewrite the sum() function to read more clearly.

```js
function sum(...nums) {
  let total = 0;
  for (const num of nums) {
    total += num;
  }
  return total;
}

sum(-23.6, 3000, 5750);
sum(...[-23.6, 3000, 5750]); // <-- reset parameter when passing a list
```

> **Prints:** 8726.4

This version of the `sum()` function is both more concise and is easier to read. Also notice the `for...in` loop has been replaced with the new `for...of` loop.

## Quiz

Use the rest parameter to create an `average()` function that calculates the average of an unlimited amount of numbers.

> **TIP:** Make sure to test your code with different values. For example,
>
> `average(2, 6)` should return `4`  
> `average(2, 3, 3, 5, 7, 10)` should return `5`  
> `average(7, 1432, 12, 13, 100)` should return `312.8`  
> `average()` should return `0`

```js
function average(...nums) {
  let sum = 0;
  let average = 0;
  for (const num of nums) {
    sum += num;
  }
  if (nums.length === 0) {
    return average;
  } else {
    return (average = sum / nums.length);
  }
}
```

> **Prints:**  
> 4  
> 5  
> 312.8  
> 0
