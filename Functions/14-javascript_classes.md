# Javascript Classes

JavaScript classes, introduced in ES6 (ECMAScript 2015), are primarily syntactical sugar over JavaScript's **existing prototype-based inheritance**. The class syntax **does not** introduce a new _object-oriented_ inheritance model to JavaScript. That means, **_Javascript is a class-based or object-oriented language. It uses functions to create objects, and links objects together by prototypal inheritance under the hood_**, even using new introduced keywords like, `class`, `extends` and `super()`.

## ES5 "Class" Recap

Since ES6 classes are just a mirage and hide the fact that _prototypal inheritance_ is actually going on under the hood, let's quickly look at how to create a "class" with ES5 code:

```js
function Plane(numEngines) {
  this.numEngines = numEngines;
  this.enginesActive = false;
}

// methods "inherited" by all instances
Plan.prototype.startEngines = function() {
  console.log("starting engines...");
  this.engines.Active = true;
};

const richardsPlane = new Plane(1);
richardsPlane.startEngines();

const jamesPlane = new Plane(4);
jamesPlane.startEngines();
```

In the code above, the `Plane` function is a _constructor function_ that will create new Plane objects. The data for a specific Plane object is passed to the `Plane` function and is set on the object. Methods that are **"inherited"** by each Plane object are placed on the `Plane.prototype` object. Then `richardsPlane` is created with one engine while `jamesPlane` is created with 4 engines. Both objects, however, use the same `startEngines` method to activate their respective engines.

Things to note:

* the constructor function is called with the `new` keyword
* the constructor function, by convention, starts with a _capital letter_
* the constructor function controls the setting of data on the objects that will be created
* "inherited" methods are placed on the constructor function's prototype object

Keep these in mind as we look at how ES6 classes work because, remember ES6 classes set up all of this for you under the hood.

## ES6 Classes

Here's what that same `Plane` class would look like if it were written using the new `class` syntax:

```js
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log("starting engines…");
    this.enginesActive = true;
  }
}
```

The class `Plane {...}` here actually does two things:

* Declares a variable `Plane` that references the function named "`constructor`".
* Puts methods listed in the definition into `Plane.prototype`. Here, it includes `startEngines` and the `constructor`.

### Class is just a function

Just to prove that there isn't anything special about class, check out this code:

```js
typeof Plane; // function
```

> **Returns:** function

> ⚠️ Where Are All The Commas? ⚠️  
> Did you notice that there aren't any commas between the method definitions in the Class? **Commas are not used to separate properties or methods in a Class**. If you add them, you'll get a `SyntaxError` of `unexpected token ,`

That's right—it's just a function! There isn't even a new type added to JavaScript.

## Quiz

Take a look at the following code:

```js
class Animal {
  constructor(name = "Sprinkles", energy = 100) {
    this.name = name;
    this.energy = energy;
  }

  eat(food) {
    this.energy += food / 3;
  }
}
```

Which of the following are true?

```js
// option 1
The `eat()` method ends up on `Animal.prototype`.
// option 2
tpeof Animal === 'class'
// option 3
tpeof Animal === 'function'
```

> **Answer:**  
> Option 1 is correct. Methods that appear in the class definition are, under the hood, placed on that class's prototype object.  
> Option 2 is not correct. A class is actually just a function.  
> Option 3 is correct. A class is a function.
