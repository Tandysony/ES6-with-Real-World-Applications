# Pseudoclassical Patterns

Take the following prototypal class for example, which lines are likely to repeat for every prototypal class?

```js
// ES5
1:  var Car = function(loc) {
2:    var obj = Object.create(Car.prototype);   // <--
3:    obj.loc = loc;
4:    return obj;                               // <--
5:  };
6:  
7:  Car.prototype.move = function() {
8:    this.loc++;
9:  };
```

Lines 2 and 4 are likely to repeat for every prototypal class.

## Constructor Mode

Whenever you run invoke a function using the `new` keyword, the function is run at a special mode: **constructor mode**. For example, when running the following code

```js
var ben = new Car(9);
```

, the prototypal class is running as the following:

```js
// ES5
 1:  var Car = function(loc) {
 2:    this = Object.create(Car.prototype);       // <--
 3:    var obj = Object.create(Car.prototype);
 4:    obj.loc = loc;
 5:    return obj;
 6:    return this;                               // <--
 7:  };
 8:  
 9:  Car.prototype.move = function() {
10:    this.loc++;
11:  };
```

lines 2 and 6 will be added in the beginning and the end of the class function automatically. Therefore, since the keyword `new` provides us with the equivalent of lines 3 and 5 in the function, so we don't need them any more!

The pseudoclassical class and its instances can now be written as following:

```js
/* BEGIN: pseudoclassical class */
// section 1
var Car = function(loc) {
  this.loc = loc;
};
// section 2
Car.prototype.move = function() {
  this.loc++;
};
/* END: pseudoclassical class */

// instances
var amy = new Car(1);
any.move();
var ben = new Car(9);
ben.move();
```

## Styles of Writing Classes

Any pseudoclassical, prototypal and functional-shared class is composed with two distinct sections:

* In section 1, you will specify how all the instances should be **different**.
* in section 2, you will specify how all the instances should be **similar**. The similarities are stored as properties of the prototype.

Looking back at the functional version of this class

```js
/* function class */
var Car = function(loc) {
  var obj = { loc: loc };
  obj.move = function() {
    obj.loc++;
  };
  return loc;
};

// instances
var amy = Car(1); // <-- no `new` keyword
any.move();
var ben = Car(9); // <-- no `new` keyword
ben.move();
```
