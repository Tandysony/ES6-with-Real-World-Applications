# Superclass and Subclass

Superclass and subclass are fundamentals for OOP. Here, functional and pseudoclassical patterns are introduced respectively.

## Functional Pattern

* Superclass `Car`

```js
var Car = function(loc) {
  var obj = { loc: loc };
  obj.move = function() {
    obj.loc++;
  };

  return obj;
};
```

* Subclass `Van`

```js
var Van = function(loc) {
  var obj = Car(loc);

  obj.grab = function() {};
  return obj;
};
```

### Subclass `Cop`

```js
var Cop = function(loc) {
  var obj = Car(loc);

  obj.call = function() {};
  return obj;
};
```

* Pseudoclassical Pattern

We want the following code running correct. How do you design the superclass and subclass in pseudoclassical pattern?

```js
var zed = new Car(3);
zed.move();

var amy = new Van(9);
console.log(amy.loc);
amy.move();
amy.grab();
```

In Pseudoclassical patterns, any properties you want to share across all instances, go on the `.prototype` property of the constructor function. This prototype chain saves a lot of memory than the function pattern.

```js
// super class
var Car = function(loc) {
  this.loc = loc;
};

Car.prototype.move = function() {
  this.loc++;
};

// subclass
var Van = function(loc) {
  // Car(loc); // <-- wrong, `this` in invoked function refers to `global` scope
  // new Car(loc) // <-- wrong, `this` in invoked function refers to the new instance of Car
  Car.call(this, loc);
};

Van.prototype = Object.create(Car.prototype);

Van.prototype.grab = function() {};
```

Pay attention to the line `Car.call(this, loc);`. `this` is used to bound the `this` in `Car` to the `Van` instance.

> **NOTE:** The `.call()` method calls a function with a given `this` value and arguments provided individually. For more details about the `.call()`, refer to [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

Since we want to **delegate** (copy) `Van.prototype` field lookups to `Car.prototype`, as learnt in [Section 35 - Prototype Chains](OOP/35-prototype_chains.md), `Object.create()` method is used as `Van.prototype = Object.create(Car.prototype);`

### Wrong ways to delegating prototype

1.  Why not `Van.prototype = Object.create(Car);`?

This wont work, since `Car` instances themselves are delegating to `Car.prototype`. The `Car` construct function and its companion prototype serves two very different purpose.

2.  Why not `Van.prototype = new Car();` then?

`Car` instance does not have a meaningful location argument, `loc`. And this is often used online which does not work.

Is that all done? No. The `Van` does not have a proper default constructor yet. That means, if you run `console.log(amy.constructor)`, it will print
`ƒ (loc) { this.loc = loc;}`, which refers to the `Car`. This is not what we want.

You need add one more line in-between the last two lines:

```js
Van.prototype.constructor = Van;
```
