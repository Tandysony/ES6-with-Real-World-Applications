# Promises

A JavaScript **Promise** is created with the new [Promise constructor function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) - `new Promise()`. A promise will let you start some work that will be done `asynchronously` and let you get back to your regular work. When you create the promise, you must give it the code that will be run asynchronously. You provide this code as the argument of the _constructor function_ or _executor function_:

```js
// Syntax
new Promise( /* executor */ function(resolve, reject) { ... } );
```

**executor**  
A _function_ that is passed with the arguments `resolve` and `reject`. The executor function is executed immediately by the **Promise implementation**, passing `resolve` and `reject` functions (the executor is _called before the Promise constructor even returns the created object_). The `resolve` and `reject` functions, when called, _resolve_ or _reject_ the promise, respectively. The executor normally initiates some asynchronous work, and then, once that completes, either calls the `resolve` function to resolve the promise or else `rejects` it if an error occurred.

If _an error is thrown_ in the executor function, the promise is _rejected_. The return value of the executor is ignored.

For example:

```js
new Promise(function(resolve, reject) {
  window.setTimeout(function createSundae(flavor = "chocolate") {
    const sundae = {};
    // request ice cream
    // get cone
    // warm up ice cream scoop
    // scoop generous portion into cone!
  }, Math.random() * 2000);
});
```

This code creates a promise that will start in a few seconds after I make the request. Then there are a number of steps that need to be made in the `createSundae` function.

## Indicated a Successful Request or a Failed Request

But once that's all done, how does JavaScript notify us that it's finished and ready for us to pick back up? It does that by passing two functions into our initial function: `resolve` and `reject`.

```js
new Promise(function(resolve, reject) {
  window.setTimeout(function createSundae(flavor = "chocolate") {
    const sundae = {};
    // request ice cream
    // get cone
    // warm up ice cream scoop
    // scoop generous portion into cone!
    if (/* iceCreamConeIsEmpty(flavor) */){
        reject(`Sorry, we're out of that flavor :-(`)
    }
    resolve(sundae);
  }, Math.random() * 2000);
});
```

Now when the sundae has been _successfully created_, it calls the `resolve` method and passes it the data we want to return - in this case the data that's being returned is the completed `sundae` object. Whereas the `reject` method is used when the request _could not be completed_.

When the outcome has been finalized (the request has either completed successfully or unsuccessfully), the promise is now **_fulfilled_** and will notify us so we can decide what to do with the response.

## Promises Return Immediately

The first thing to understand is that a Promise will immediately return an object.

```js
const mySundae = new Promise(function(resolve, reject) {
  // sundae creation code
});
```

That object has a `.then()` method on it that we can use to have it notify us if the request we made in the promise was either successful or failed. The `.then()` method takes two functions:

* the function to run if the request completed successfully
* the function to run if the request failed to complete

```js
mySundae.then(
  function(sundae) {
    // completed successfully
    console.log(`Time to eat my delicious ${sundae}`);
  },
  function(msg) {
    // failed to completed
    console.log(msg);
    self.goCry(); // not a real method
  }
);
```

As you can see, the first function that's passed to `.then()` will be called and passed the data that the Promise's `resolve` function used. In this case, the function would receive the sundae object. The second function will be called and passed the data that the Promise's `reject` function was called with. In this case, the function receives the error message `"Sorry, we're out of that flavor :-("` that the reject function was called with in the Promise code above.
