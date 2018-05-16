# WeakSets

## What is a WeakSet?

A **WeakSet** is just like a normal Set with a few key differences:

* a WeakSet can **only contain objects**
* a WeakSet is **not iterable** which means it can’t be looped over
* a WeakSet **does not have a `.clear()` method**

You can create a WeakSet just like you would a normal Set, except that you use the `WeakSet` constructor.

```js
let student1 = { name: "James", age: 27, gender: "male" };
let student2 = { name: "Julia", age: 24, gender: "female" };
let student3 = { name: "Richard", age: 32, gender: "male" };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);
```

> **Prints:**  
> `WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'Richard', age: 31, gender: 'male'}, Object {name: 'James', age: 26, gender: 'male'}}`

…but if you try to add something other than an object, you’ll get an error!

```js
roster.add("Amanda");
```

> **Prints:**  
> `Uncaught TypeError: Invalid value used in weak set(…)`

This is expected behavior because WeakSets can only contain objects. But why should it only contain objects? Why would you even use a WeakSet if normal Sets can contain objects and other types of data? Well, the answer to that question has more to do with **why WeakSets do not have a `.clear()` method**...

## Garbage Collection

In JavaScript, memory is allocated when new values are created and is "automatically" freed up when those values are no longer needed. This process of freeing up memory after it is no longer needed is what is known as **garbage collection**.

WeakSets take advantage of this by exclusively working with objects. If you set an object to `null`, then you’re essentially deleting the object. And when JavaScript’s garbage collector runs, the memory that object previously occupied will be freed up to be used later in your program.

```js
student3 = null;
console.log(roster);
```

> **Prints:**  
> `WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'James', age: 26, gender: 'male'}}`

What makes this so useful is you don’t have to worry about deleting references to deleted objects in your WeakSets, JavaScript does it for you! When an object is deleted, the object will also be deleted from the WeakSet when garbage collection runs. **_This makes WeakSets useful in situations where you want an efficient, lightweight solution for creating groups of objects_**.

The point in time when garbage collection happens depends on a lot of different factors. Check out [MDN’s documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Garbage_collection) to learn more about the algorithms used to handle garbage collection in JavaScript.

## Quiz

Create the following variables:

* `uniqueFlavors` and give it the value of an empty `WeakSet` object
* `flavor1`, and set it to the object `{ flavor: 'chocolate' }`
* `flavor2`, and set it to an object with a property of `flavor` and a value of your choice

Use the `.add()` method to add the objects `flavor1` and `flavor2` to `uniqueFlavors`.

Use the `.add()` method to add the `flavor1` object to the `uniqueFlavors` set, again.

```js
const uniqueFlavors = new WeakSet();

let flavor1 = { flavor: "chocolate" };
let flavor2 = { flavor: "mint" };

uniqueFlavors.add(flavor1);
uniqueFlavors.add(flavor2);

uniqueFlavors.add(flavor1);
```
