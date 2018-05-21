# Object-Oriented Programing in JavaScript

## Object-Oriented Programing (OOP)

There are four core concepts in OOP:

* `Encapsulation`
* `Abstraction`
* `Inheritance`
* `Polymorphism`

A **object** is a unit which is composed with **properties** (variables) and method (functions).

```js
// A simple Object
let employee = {
  baseSalary: 30000, // <- property
  overtime: 10, // <- property
  rate: 20, // <- property
  getWage: function() {
    // <- method
    return this.baseSalary + this.overtime * this.rate;
  }
};
```

### Encapsulation

In OOP, we group related variables and functions operate on them into objects. This is what so-called **`Encapsulation`**.

```js
// Class & Instance
class Employee {
  constructor(baseSalary = 30000, overtime = 10, rate = 20) {
    this.baseSalary = baseSalary;
    this.overtime = overtime;
    this.rate = rate;
  }

  getWage() {
    return this.baseSalary + this.overtime * this.rate;
  }
}

const tandy = new Employee((baseSalary = 50000), (rate = 25));
tandy.getWage;
```

Using **`Encapsulation`** helps us to reduced complexity and increase reusability.

> `50500`
