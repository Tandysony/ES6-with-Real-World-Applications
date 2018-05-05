# Iteration

## _For_ loops

The `for...of` loop is the most recent addition to the family of for loops in JavaScript.

It combines the strengths of its siblings, the `for loop` and the `for...in loop`, to loop over any type of data that is **_iterable_** (meaning it follows the **_iterable protocol_**). By default, this includes the data types `String`, `Array`, `Map`, and `Set`—notably absent from this list is the `Object` data type (i.e. `{` `}`). Objects are not **_iterable_**, by default.

Before we look at the for...of loop, let’s first take a quick look at the other for loops to see where they have weaknesses.

### The `for` loop

The for loop is obviously the most common type of loop there is, so this should be a quick refresher.

```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}
```

> **print：**  
> 0  
> 1  
> 2  
> 3  
> 4  
> 5  
> 6  
> 7  
> 8  
> 9

Really the biggest downside of a for loop is having to keep track of the `counter` and `exit condition`.

In this example, we’re using the variable `i` as a counter to keep track of the loop and to access values in the array. We’re also using `digits.length` to determine the exit condition for the loop.

While for loops certainly have an advantage when looping through arrays, some data is not structured like an array, so a `for` loop isn’t always an option.

## The `for...in` loop

The `for...in` loop improves upon the weaknesses of the `for` loop by _eliminating the counting logic and exit condition_.

```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

But, you still have to deal with the issue of using an `index` to access the values of the array, and that stinks; it almost makes it more confusing than before.

Also, the `for...in` loop can get you into big trouble when you need to add an extra method to an array (or another object). Because `for...in` loops loop over all _enumerable properties_, this means if you add any additional properties to the array's prototype, then those properties will also appear in the loop.

```js
Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

> **print：**  
> 0  
> 1  
> 2  
> 3  
> 4  
> 5  
> 6  
> 7  
> 8  
> 9  
> function() {  
>  for (let i = 0; i < this.length; i++) {  
>    this[i] = this[i].toFixed(2);  
>  }  
> }

Gross! This is why `for...in` loops **_are discouraged_** when looping over arrays.

> **NOTE:** The `forEach` loop is another type of for loop in JavaScript. However, `forEach()` is actually **_an array method_**, so it can only be used exclusively with arrays. There is also _no way to stop or break_ a `forEach` loop. If you need that type of behavior in your loop, you’ll have to use a basic for loop.

Finally, we have the mighty `for...of` loop.

### The `for...of` loop

The `for...of` loop is used to loop over any type of data that is iterable.

You write a `for...of` loop almost exactly like you would write a `for...in` loop, except you swap out `in` with `of` and you can **_drop the index_**.

```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  // <-- using 'const' & 'of'
  console.log(digit);
}
```

> **print：**  
> 0  
> 1  
> 2  
> 3  
> 4  
> 5  
> 6  
> 7  
> 8  
> 9

This makes the `for...of` loop the most concise version of all the for loops.

> **TIP:** It’s good practice to use plural names for objects that are collections of values. That way, when you loop over the collection, you can use the singular version of the name when referencing individual values in the collection. For example, `for (const button of buttons) {...}`.

But wait, there’s more! The `for...of` loop also has some additional benefits that fix the weaknesses of the for and `for...in` loops.

You can **_stop or break_** a `for...of` loop at anytime.

```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  if (digit % 2 === 0) {
    // break the loop for odd numbers
    continue;
  }
  console.log(digit);
}
```

> **print：**  
> 1  
> 3  
> 5  
> 7  
> 9

And you don’t have to worry about adding new properties to objects. The `for...of` loop will **_only loop over the values in the object_**.

```js
Array.prototype.decimalfy = function() {
  for (i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
```

> **print：**  
> 0  
> 1  
> 2  
> 3  
> 4  
> 5  
> 6  
> 7  
> 8  
> 9

## Quiz

Write a `for...of` loop that:

* loops through each day in the days array
* capitalizes the first letter of the day
* and prints the day out to the console

Your code should log the following to the console:

> Sunday  
> Monday  
> Tuesday  
> Wednesday  
> Thursday  
> Friday  
> Saturday

The code:

```js
const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

for (let day of days) {
  day = day.charAt(0).toUpperCase() + day.substr(1);
  console.log(day);
}
```
