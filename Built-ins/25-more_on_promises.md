# More on Promises

* This section is based on the independent course [JavaScript Promises by Google](https://www.udacity.com/course/javascript-promises--ud898) on Udacity.

> `The promises object is used for deferred and asynchronous computations.` -- MDN

* What is an `asynchronous` work?
  * Asynchronous work happens at an _unknown_ or _unpredictable_ time.

Normally, codes are in **synchronous** fashion. Which means, a line of code is guaranteed to run immediately after the previous one. Javascript runs all code in a single timeline.

Unlike **synchronous** code, **asynchronous** code is guaranteed to executed in a single unbroken timeline.

# 1. Basics on Promises

## 1.1 Callbacks vs Promises

`Callbacks` are default Javascript technique for the asynchronous work. There are problems for `Callbacks`:

* How do you handle errors?
* How do you create a sequence of asynchronous work? This nested callbacks fashion leads to the so called `Pyramid of Doom` or `Callback Hell`, shown below.

```js
// Example of `Pyramid of Doom` or `Callback Hell`
function one() {
  setTimeout(function() {
    console.log("1. First thing setting up second thing");
    setTimeout(function() {
      console.log("2. Second thing setting up third thing");
      setTimeout(function() {
        console.log("3. Third thing setting up fourth thing");
        setTimeout(function() {
          console.log("4. Fourth thing");
          setTimeout(function() {
            console.log("5. Fifth thing");
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);
}
```

With Promise's `.then()` function, life is much easier:

```js
let sequence = get("example.json")
  .then(doSomething)
  .then(doSomethingElse);
```

## 1.2. Asynchronous Scenarios

* Ajax calls;
* posting messages back-and-forth between the main thread and web worker;

## 1.3. Syntax

A full Promise should be as following:

```js
new Promise(function(resolve, reject) {
  let img = document.createElement("img");
  img.src = "image.jpg";
  img.onload = resolve;
  img.onerror = reject;
  document.body.appendChild(img);
})
  .then(finishedLoading)
  .catch(showAlternativeImage);
```

## 1.4. Quiz

Instructions:

* Wrap this `setTimeout` function in Promise. `resolve()` in setTimeout's callback,
* `console.log(this)` inside the Promise and observer the results.
* Make suer wait returns the Promise too.

```html
<h1>Did the promise finish?</h1>
<div class="completion">Not yet</div>
<script>
    function wait(ms) {
        window.setTimeout(function () {}, ms);
        })
    };
    // comment out the following 2 lines to run the code
    // let milliseconds = 2000;
    // wait(milliseconds).then(finish)

    // This is just here to help you test
    function finish() {
        let completion = document.querySelector('.completion');
        completion.innerHTML = `Complete after ${milliseconds} ms.`
    }
</script>
```

**Solution:**

```html
<h1>Did the promise finish?</h1>
<div class="completion">Not yet</div>
<script>
    function wait(ms) {
        // the promise
        return new Promise(function (resolve) {
            console.log(this);
            window.setTimeout(function () {
                resolve();
            }, ms);
        })
    };

    let milliseconds = 2000;
    wait(milliseconds).then(finish)

    // This is just here to help you test
    function finish() {
        let completion = document.querySelector('.completion');
        completion.innerHTML = `Complete after ${milliseconds} ms.`
    }
</script>
```
