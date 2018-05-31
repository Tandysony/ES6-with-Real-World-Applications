# Prototypal Classes

## Prototype-based OOP

Conceptually, in class-based OOP, we first create a class to serve as a “blueprint” for objects, and then create objects based on this blueprint. To build more specific types of objects, we create “child” classes; i.e., we make some changes to the blueprint and use the resulting new blueprint to construct the more specific objects.

For a real-world analogy, if you were to build a chair, you would **first create a blueprint** on paper and **then manufacture chairs** _based on this blueprint_. The blueprint here is the `class`, and chairs are the `objects`. If you wanted to build a rocking chair, you would take the blueprint, make some modifications, and manufacture rocking chairs using the new blueprint.

Where _in the world of prototype_: you don’t create blueprints or classes here, **you just create the object**. For example, you build a chair and simply create “clones” of it. If you want to build a rocking chair, all you have to do is pick a chair you’ve manufactured earlier, attach two rockers to it, and voilà! You have a rocking chair. You didn’t really need a blueprint for that. Now you can just use this rocking chair for yourself, or perhaps use it as a prototype to create more rocking chairs.

## Prototype-based OOP in JavaScript

Following is an example that demonstrates this kind of OOP in JavaScript. We start by creating an `animal` object:

```js
var genericAnimal = Object.create(null);
```

`Object.create(null)` creates a new empty object. Next, we add some properties and functions to our new object:

```js
genericAnimal.name = "Animal";
genericAnimal.gender = "female";
genericAnimal.description(){
    return "Gender: " + this.gender + "; Name: " + this.name;

}
```

`genericAnimal` is a proper object and can be used like one:

```js
console.log(genericAnimal.description());
//Gender: female; Name: Animal
```

We can create other, more specific animals by using our sample object as a prototype. Think of this as cloning the object, just like we took a chair and created a clone in the real world.

```js
var cat = Object.create(generalAnimal);
```

We just created a `cat` **as a clone of the generic animal**. We can add properties and functions to this:

```js
cat.purr = function() {
  return "Purrrr!";
};
```

We can use our cat as a prototype and create a few more cats:

```js
var colonel = Object.create(cat);
colonel.name = "Colonel Meow";

var puff = Object.create(cat);
puff.name = "Puffy";
```

You can also observe that properties/methods from parents were properly carried over:

```js
console.log(puff.description());
//Gender: female; Name: Puffy
```

## The `new` keyword and the constructor function

JavaScript has the concept of a `new` keyword used in conjunction with constructor functions. This feature was built into JavaScript to make it look familiar to people trained in class-based programming. You may have seen JavaScript OOP code that looks like this:

```js
function Person(name) {
  this.name = name;
  this.sayName = function() {
    return "Hi, I'm " + this.name;
  };
}

var adam = new Person("Adam");
```

Implementing inheritance using JavaScript’s default method looks more complicated. We define `Ninja` as a sub-class of `Person`. Ninjas can have a name as they are a person, and they can also have a primary weapon, such as shuriken.

```js
function Ninja(name, weapon) {
  Person.call(this, name); // <-- x.call(this, xx) to inherit
  this.weapon = weapon;
}

Ninja.prototype = Object.create(Person.prototype);
Ninja.prototype.constructor = Ninja;
```

> **NOTES:**  
> `.prototype` object is the freely available object to storing things. You can use `.method` instead.
> Every `.prototype` object has a `.constructor` property which points back to the function it attached to. Thus there is a mutual linking between any function and its companion `.prototype` object. Therefore, `Ninja.prototype.constructor` is `Ninja` itself.

Since it’s not really a class, it’s important to understand what a **call** to a constructor does. It _first creates an empty object_, _then sets the prototype of this object to the prototype property of the constructor_, _then calls the constructor function with this pointing to the newly-created object_, and _finally returns the object_. It’s an indirect way of doing prototype-based OOP that looks like class-based OOP.

The most effective way to work with OOP in JavaScript is to understand prototypal OOP, whether the constructor pattern is used or not. Refer to the pervious section for prototype chain to hav a basic idea first.
