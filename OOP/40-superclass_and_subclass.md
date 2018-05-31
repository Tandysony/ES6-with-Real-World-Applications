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
```

Pay attention to the line `Car.call(this, loc);`. `this` is used to bound the `this` in `Car` to the `Van` instance.

> **NOTE:** The `.call()` method calls a function with a given `this` value and arguments provided individually. For more details about the `.call()`, refer to [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
