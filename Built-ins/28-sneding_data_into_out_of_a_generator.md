# Sending Data into/out of a Generator

So we can _get data out_ of a generator by using the `yield` keyword. We can also send data back into the generator, too. We do this using the `.next()` method:

```js
function* displayResponse() {
  const response = yield;
  console.log(`You response is "${response}"!`);
}

const iterator = displayResponse();

iterator.next(); // starts running the generator function
iterator.next("Hello ES6"); // send data into the generator
```

> **Prints:**  
> `You response is "Hello ES6"`

Calling `.next()` with data (i.e. `.next('Richard')`) will send data into the generator function _where it last left off_. It will "replace" the `yield` keyword with the data that you provided.

> So the `yield` keyword is used **_to pause a generator_** and used **_to send data outside of the generator_**, and then the `.next()` method is used to **_pass data into the generator_**.

Here's an example that makes use of both of these to cycle through a list of names one at a time:

```js
function* getEmployee() {
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
  const facts = [];

  for (const name of names) {
    // yield *out* each name AND store the returned data into the facts array
    facts.push(yield name);
  }

  return facts;
}

const generatorIterator = getEmployee();
/* 
    `generatorIterator.next()` returns an Iterator: 
    {value: "Amanda", done: false} 
    `value` refers to the next value, not current one;
*/
// get the first name out of the generator
let name = generatorIterator.next().value;

// pass data in *and* then get the next name
name = generatorIterator.next(`${name} is cool`).value;

// pass data in *and* then get the next name
name = generatorIterator.next(`${name} is awesome`).value;

// pass data in *and* then get the next name
name = generatorIterator.next(`${name} is stupendous`).value;

// you get the idea
name = generatorIterator.next(`${name} is rad!`).value;
name = generatorIterator.next(`${name} is impressive!`).value;
name = generatorIterator.next(`${name} is stunning!`).value;
name = generatorIterator.next(`${name} is awe-inspiring!`).value;

// pass the last data in, generator ends and returns the array
const positions = generatorIterator.next(`${name} is magnificent!`).value;

// displays each name with description on its own line
positions.join("\n");
```

> **Prints:**  
> `"Amanda is cool`  
> `Diego is awesome`  
> `Farrin is stupendous`  
> `James is rad!`  
> `Kagure is impressive!`  
> `Kavita is stunning!`  
> `Orit is awe-inspiring!`  
> `Richard is magnificent!"`

## Quiz

What will happen if the following code is run?

```js
function* createSundae() {
  const toppings = [];
  toppings.push(yield);
  toppings.push(yield);
  toppings.push(yield);

  return toppings;
}

let it = createSundae();
it.next("hot fudge");
it.next("sprinkles");
it.next("whipped cream");
it.next();
```

> **Prints:**  
> `{value: Array(3), done: true}`
>
> * `done`: `true`
> * `value`: (3) `["sprinkles", "whipped cream", undefined]`

The `toppings` array will have `undefined` as its last item. And the first-time passed data (`"hot funge"`) is discarded.

Because the first call to `.next()` passes in the data `"hot funge"`. But **_that data doesn't get stored anywhere_**. The last call to `.next()` should have some data since it's being yielded into the last call to `toppings.push()`.

Generators are a powerful new kind of function that is able to _pause its execution while also maintaining its own state_.

* Generators are great for **iterating over a list of items _one at a time_ so you can _handle each item on its own_ before moving on to the next one**.
* You can also use generators to **handle nested callbacks**.

For example, let's say that an app needs to get a list of all repositories and the number of times they've been starred. Well, before you can get the number of stars for each repository, you'd need to get the user's information. Then after retrieving the user's profile the code can then take that information to find all of the repositories.

Generators will also be used heavily in upcoming additions to the JavaScript language. One upcoming feature that will make use of them is [async functions](https://github.com/tc39/ecmascript-asyncawait).
