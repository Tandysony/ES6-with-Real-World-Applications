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
