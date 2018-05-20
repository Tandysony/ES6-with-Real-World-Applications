# Generators

Whenever a function is invoked, the JavaScript engine starts at the top of the function and runs every line of code until it gets to the bottom. There's no way to stop the execution of the function in the middle and pick up again at some later point. This "**run-to-completion**" is the way it's always been:

```js
function getEmployee() {
  console.log("the function has started");

  const names = [
    "Amanda",
    "Diego",
    "Farrin",
    "James",
    "Kagure",
    "Kavita",
    "Orit",
    "Richard"
  ];

  for (const name of names) {
    console.log(name);
  }

  console.log("the function has ended");
}

getEmployee();
```

> **Prints:**  
> `The function has started`  
> `Amanda`  
> `Diego`  
> `Farrin`  
> `James`  
> `Kagure`  
> `Kavita`  
> `Orit`  
> `Richard`  
> `the function has ended`

But what if you want to print out the first 3 employee names then stop for a bit, then, at some later point, you want to continue where you left off and print out more employee names. With a regular function, you can't do this since there's no way to "pause" a function in the middle of its execution.

## Pausable Functions

If we do want to be able to pause a function mid-execution, then we'll need a new type of function available to us in ES6 - `generator functions`! Let's look at one:

```js
function* getEmployee() {
  console.log("the function has started");

  const names = [
    "Amanda",
    "Diego",
    "Farrin",
    "James",
    "Kagure",
    "Kavita",
    "Orit",
    "Richard"
  ];

  for (const name of names) {
    console.log(name);
  }

  console.log("the function has ended");
}
```

Notice the **asterisk** (i.e. `*`) right after the `function` keyword? That asterisk indicates that this function is actually a **generator**!

Now check out what happens when we try running this function:

```js
getEmployee();
```

> `getEmployee {<suspended>}`

...umm, what? Where's the "the function has started" text from the top of the function? And why didn't we get any names printed to the console? Those are good questions, but first, understand the asterisk.

### Place of the asterisk

The asterisk of the generator can actually be placed **anywhere** between the `function` keyword and the function's name. So all three of these way, `function* names() {}`, `function * names() {}` and `function *names() {}`, are correct.

So it's important to realize that the _asterisk indicates that it is a generator_ but that _the placement of the asterisk is not important_.

## Generators & Iterators

When a generator is invoked, it doesn't actually run any of the code inside the function. Instead, **it creates and returns an iterator**. This iterator can then be used to execute the actual generator's inner code.

```js
const generatorIterator = getEmployee();
generatorIterator.next();
```

> **Prints:**  
> `The function has started`  
> `Amanda`  
> `Diego`  
> `Farrin`  
> `James`  
> `Kagure`  
> `Kavita`  
> `Orit`  
> `Richard`  
> `the function has ended`

Now if you tried the code out for yourself, the first time the iterator's `.next()` method was called it ran all of the code inside the generator. Did you notice anything? The code never paused! So how do we get this magical, pausing functionality?

## The Yield Keyword

The `yield` keyword is new and was introduced with ES6. **It can only be used inside generator functions**. `yield` is what causes the generator to pause. Let's add `yield` to our generator and give it a try:

```js
function* getEmployee() {
  console.log("the function has started");

  const names = [
    "Amanda",
    "Diego",
    "Farrin",
    "James",
    "Kagure",
    "Kavita",
    "Orit",
    "Richard"
  ];

  for (const name of names) {
    console.log(name);
    yield; // <- `yield` to pause
  }

  console.log("the function has ended");
}
```

Notice that there's now a `yield` inside the `for...of` loop. If we invoke the generator (which produces an iterator) and then call `.next()`, we'll get the following output:

```js
const generatorIterator = getEmployee();
generatorIterator.next();
```

> **Prints:**  
> `The function has started`  
> `Amanda`

It's paused! But to really be sure, let's check out the next iteration:

```js
generatorIterator.next();
```

> **Prints:**  
> `Diego`

So it **_remembered exactly where we left off_**! It took the next item in the array (`Diego`), logged it, and then hit the yield again, so it paused again.

Now pausing is all well and good, but what if we could send data from the generator back to the "outside" world? We can do this with `yield`.

## Yielding Data to the "Outside" World

Instead of logging the names to the console and then pausing, let's have the code "return" the name and then pause.

```js
function* getEmployee() {
  console.log("the function has started");

  const names = [
    "Amanda",
    "Diego",
    "Farrin",
    "James",
    "Kagure",
    "Kavita",
    "Orit",
    "Richard"
  ];

  for (const name of names) {
    yield name; // <- return the value and pause
  }

  console.log("the function has ended");
}
```

Notice that now instead of `console.log(name)`; that it's been switched to `yield name;`. With this change, when the generator is run, it will "yield" the name back out to the function and then pause its execution. Let's see this in action:

```js
const generatorIterator = getEmployee();
let result = generatorIterator.next(); // the function has started
result.value; // is "Amanda"

generatorIterator.next().value; // is "Diego"
generatorIterator.next().value; // is "Farrin"
```

> **Output:**  
> `the function has started`  
> `"Amanda"`  
> `"Diego"`  
> `"Farrin"`

## Quiz

How many times will the iterator's `.next()` method need to be called to fully **complete/"use up"** the udacity generator function below:

```js
function* udacity() {
  yield "Richard";
  yield "James";
}
```

`3 times`, because it will be called **one more time** than there are `yield` expressions in the generator function.
