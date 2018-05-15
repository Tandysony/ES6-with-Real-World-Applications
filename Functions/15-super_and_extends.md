# Super and Extends

## Subclass in ES6

Now that we've looked at creating classes in JavaScript. Let's use the new `super` and `extends` keywords to extend a class.

```js
class Tree {
  constructor(
    size = "10",
    leaves = { spring: "green", summer: "green", fall: "orange", winter: null }
  ) {
    this.size = size;
    this.leaves = leaves;
    this.leafColor = null;
  }

  changeSeason(season) {
    this.color = this.leaves[season];
    if (season === "spring") {
      this.size += 1;
    }
  }
}

class Maple extends Tree {
  constructor(syrupQty = 15, size, leaves) {
    super(size, leaves);
    this.syrupQty = syrupQty;
  }

  changeSeason(season) {
    super.changeSeason(season);
    if (season == "spring") {
      this.syrupQty += 1;
    }
  }
  gatherSyrup() {
    this.syrupQty -= 3;
  }
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason("fall");
myMaple.gatherSyrup();
myMaple.changeSeason("spring");
```

Both `Tree` and `Maple` are JavaScript classes. The `Maple` class is a "subclass" of `Tree` and uses the `extends` keyword to set itself as a "subclass". To get from the "subclass" to the parent class, the `super` keyword is used. Did you notice that `super` was used in two different ways? In `Maple`'s constructor method, `super` is _used as a function_. In `Maple`'s `changeSeason()` method, `super` is used as an object!

## Compared to ES5 subclasses

Let's see this same functionality, but written in ES5 code:

```js
function Tree(size, leaves) {
  this.size = typeof size === "undefined" ? 10 : size;
  const defaultLeaves = {
    spring: "green",
    summer: "green",
    fall: "orange",
    winter: null
  };
  this.leaves = typeof leaves === "undefined" ? defaultLeaves : leaves;
  this.leafColor;
}

Tree.prototype.changeSeason = function(season) {
  this.leafColor = this.leaves[season];
  if (season === "spring") {
    this.size += 1;
  }
};

function Maple(syrupQty, size, leaves) {
  Tree.call(this, size, leaves);
  this.syrupQty = typeof syrup === "undefined" ? 15 : syrupQty;
}

Maple.prototype = Object.create(Tree.prototype);
Maple.prototype.constructor = Maple;

Maple.prototype.changeSeason = function(season) {
  Tree.prototype.changeSeason.call(this, season);
  if (season === "spring") {
    this.syrupQty += 1;
  }
};

Maple.prototype.gatherSyrup = function() {
  this.syrupQty -= 3;
};

const myMaple = new Maple(15, 5);
myMaple.changeSeason("fall");
myMaple.gatherSyrup();
myMaple.changeSeason("spring");
```

Both this code and the class-style code above achieve the same functionality.

## Working with subclasses

Like most of the new additions, there's a lot less setup code and it's a lot cleaner syntax to create a subclass using `class`, `super`, and `extends`.

Just remember that, under the hood, the same connections are made between functions and prototypes.

### `super` must be called before `this`

In a subclass constructor function, before `this` can be used, a call to the `super` class **must be made**.

```js
class Apple {}
class Gala extends Apple {
  constructor(tartnessLevel, energy) {
    this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
    super(energy);
  }
}
```

## Quiz

1.  Take a look at the following code:

    ```js
    class Toy {}
    class Dragon extends Toy {}
    const myDragon = new Dragon();
    ```

    Given the code above, is the following statement true or false?

    ```js
    myDragon instanceof Toy;
    ```

    > true

    > The `myDragon` variable is an object created by the `Dragon` class, and since the `Dragon` class extends the `Toy` class, `myDragon` is also considered an instance of `Toy`.

2.  Let's say that a `Toy` class exists and that a `Dragon` class extends the `Toy` class.

    What is the correct way to create a `Toy` object from inside the `Dragon` class's constructor method?

    ```js
    /* option 1 */
    super();

    /* option 2 */
    super.call(this);

    /* option 3 */
    parent();

    /* option 4 */
    Toy();
    ```

    > Option 1 is the correct way to call the `super` class from within the subclass's constructor function.

3.  **Question:**

    Create a `Bicycle` subclass that extends the `Vehicle` class. The `Bicycle` subclass should override Vehicle's constructor function by changing the default values for `wheels` from `4` to `2` and `horn` from `'beep beep'` to `'honk honk'`.

    ```js
    class Vehicle {
      constructor(color = blue, wheels = 4, horn = "beep beep") {
        this.wheels = wheels;
        this.horn = horn;
      }

      honkHork() {
        console.log(this.horn);
      }
    }

    class Bicycle extends Vehicle {
      constructor(wheels = 2, horn = "honk honk") {
        super(wheels, horn);
        this.wheels = wheels;
        this.horn = horn;
      }
    }

    const myVehicle = new Vehicle();
    myVehicle.honkHorn(); /* beep beep  */
    const myBike = new Bicycle();
    myBike.honkHorn(); /* honk honk */
    ```
