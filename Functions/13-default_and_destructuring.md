# Defaults and Destructuring

## Defaults and destructuring **_arrays_**

You can combine default function parameters with destructuring to create some pretty powerful functions!

```js
function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]);
createGrid([2]);
createGrid([2, 3]);
createGrid([undefined, 3]);
```

> **Returns:**  
> Generates a 5 x 5 grid  
> Generates a 2 x 5 grid  
> Generates a 2 x 3 grid  
> Generates a 5 x 3 grid

The `createGrid()` function expects an array to be passed to it. It uses destructuring to set the first item in the array to the `width` and the second item to be the `height`. If the array is empty or if it has only one item in it, then the default parameters kick in and give the missing parameters a default value of `5`.

There is a problem with this though, the following code will not work:

```js
createGrid(); // throws an error
```

> **Uncaught TypeError:** Cannot read property 'Symbol(Symbol.iterator)' of undefined

This throws an error because `createGrid()` expects an array to be passed in that it will then destructure. Since the function was called without passing an array, it breaks. But, we can use default function parameters for this!

```js
function createGrid([width = 5, height = 5] = []) {
  return `Generates a ${width} x ${height} grid`;
}
```

See that new `= []` in the function's parameter? If `createGrid()` is called without any argument then it will use this default empty array. And since the array is empty, there's nothing to destructure into `width` and `height`, so their default values will apply! So by adding `= []` to give the entire parameter a default, the following code will now work:

```js
createGrid(); // Generates a 5 x 5 grid
```

> **Returns:** Generates a 5 x 5 grid

### Quiz

Take a look at the following code:

```js
function houseDescriptor([houseColor = "green", shutterColors = ["red"]]) {
  return `I have a ${houseColor} house with ${shutterColors.join(
    " and "
  )} shutters`;
}
```

Which of the following choices will run without throwing an error?

```js
// option 1
houseDescriptor("red", ["white", "gray", "pink"]);
// option 2
houseDescriptor(["green", ["white", "gray", "pink"]]);
// option 3
houseDescriptor(["blue", "purple"]);
// option 4
houseDescriptor("green");
```

> **Option 2 and 4 are correct.**  
> Since `houseDescriptor` is expecting only a single argument (an array) to be passed in, Option 1 has to be incorrect since it's calling the function with two arguments.  
> Option 2 is correct.  
> Option 3 does call the function with a single array argument, but the second item in the list is a string and `.join()` is not a method of strings, so the code throws an error.  
> Option 4 is correct.

## Defaults and destructuring **_objects_**

Just like array destructuring with array defaults, a function can have an object be a default parameter and use object destructuring:

```js
function createSundae({ scoops = 1, toppings = ["Hot Fudge"] }) {
  const scoopText = scoops === 1 ? "scoop" : "scoops";
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(
    " and "
  )} toppings.`;
}

createSundae({});
createSundae({ scoops: 2 });
createSundae({ scoops: 2, toppings: ["Sprinkles"] });
createSundae({ toppings: ["Cookie Dough"] });
```

> **Returns:**  
> Your sundae has 1 scoop with Hot Fudge toppings.  
> Your sundae has 2 scoops with Hot Fudge toppings.  
> Your sundae has 2 scoops with Sprinkles toppings.  
> Your sundae has 1 scoop with Cookie Dough toppings.

Just like the array example before, if you try calling the function without any arguments it won't work:

```js
createSundae(); // throws an error
```

> **Uncaught TypeError:** Cannot match against 'undefined' or 'null'.

We can prevent this issue by providing a default object to the function:

```js
function createSundae({ scoops = 1, toppings = ["Hot Fudge"] } = {}) {
  const scoopText = scoops === 1 ? "scoop" : "scoops";
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(
    " and "
  )} toppings.`;
}
```

By adding an empty object (`= {}`) as the default parameter in case no arguments are provided, calling the function without any arguments now works.

```js
createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.
```

> **Returns:** Your sundae has 1 scoop with Hot Fudge toppings.

### Quiz

Take a look at the following code:

```js
function houseDescriptor({
  houseColor = "green",
  shutterColors = ["red"]
} = {}) {
  return `I have a ${houseColor} house with ${shutterColors.join(
    " and "
  )} shutters`;
}
```

Which of the following choices will run without throwing an error?

```js
// option 1
houseDescriptor({
  houseColor: "Red",
  shutterColors: ["white", "gray", "pink"]
});
// option 2
houseDescriptor({
  houseColor: "Red"
});
// option 3
houseDescriptor();
// option 4
houseDescriptor({
  shutterColors: ["white", "gray", "pink"]
});
// option 5
houseDescriptor({});
```

> All of them are correct.

## Array defaults vs. object defaults

Default function parameters are a simple addition, but it makes our lives so much easier! One benefit of object defaults over array defaults is _how they handle skipped options_. Check this out:

```js
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }
```

With the `createSundae()` function using **object defaults** with destructuring, if you want to use the default value for `scoops` but change the `toppings`, then all you need to do is pass in an object with `toppings`:

```js
createSundae({ toppings: ["Hot Fudge", "Sprinkles", "Caramel"] });
```

Compare the above example with the same function that uses **array defaults** with destructuring.

```js
function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
```

With this function setup, if you want to use the default number of scoops but change the toppings, you'd have to call your function a little ... _oddly_:

```js
createSundae([undefined, ["Hot Fudge", "Sprinkles", "Caramel"]]);
```

Since **arrays are positionally based**, we have to **pass `undefined` to "skip" over the first argument** (and accept the default) to get to the second argument.

Unless you've got a strong reason to use array defaults with array destructuring, we recommend **_going with object defaults with object destructuring_**!
