# Prototypal Classes

## Prototype-based OOP

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
ar colonel = Object.create(cat);
colonel.name = 'Colonel Meow';

var puff = Object.create(cat);
puff.name = 'Puffy';
```

You can also observe that properties/methods from parents were properly carried over:

```js
console.log(puff.description());
//Gender: female; Name: Puffy
```
