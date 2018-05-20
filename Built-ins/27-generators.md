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
