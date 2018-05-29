# Ways to Define a class in JavaScript

Here is a quick summary in how to define a class in JavaScript. Most of the content are from [3 Ways to Define a JavaScript Class](https://www.phpied.com/3-ways-to-define-a-javascript-class/), with an additional way added.

## 1. Using a function

This is probably one of the most common ways. You define a normal JavaScript function and then create an object by using the `new` keyword. To define properties and methods for an object created using `function()`, you use the `this` keyword, as seen in the following example.

```js
function Apple(type) {
  this.type = type;
  this.color = "red";
  this.getInfo = getAppleInfo;
}

// anti-pattern! keep reading...
function getAppleInfo() {
  return this.color + " " + this.type + " apple";
}
```

To instantiate an object using the Apple **_constructor function_**, set some properties and call methods you can do the following:

```js
var apple = new Apple("macintosh");
apple.color = "reddish";
alert(apple.getInfo());
```

### 1.1. Methods defined internally

In the example above you see that the method `getInfo()` of the Apple "class" was defined in a separate function `getAppleInfo()`. While this works fine, it has one **drawback** – you may end up defining a lot of these functions and they are all in the "global namespece". This means you may have _naming conflicts_ if you (or another library you are using) decide to create another function with the same name. The way to prevent pollution of the global namespace, you can **_define your methods within the constructor function_**, like this:

```js
function Apple(type) {
  this.type = type;
  this.color = "red";
  this.getInfo = function() {
    return this.color + " " + this.type + " apple";
  };
}
```

Using this syntax changes nothing in the way you instantiate the object and use its properties and methods.

### 1.2. Methods added to the prototype

A drawback of 1.1. is that the method `getInfo()` is recreated every time you create a new object. Sometimes that may be what you want, but it's rare. A more inexpensive way is to _add `getInfo()` to the prototype of the constructor function_.

```js
function Apple(type) {
  this.type = type;
  this.color = "red";
}

Apple.prototype.getInfo = function() {
  return this.color + " " + this.type + " apple";
};
```

Again, you can use the new objects exactly the same way as in 1. and 1.1.

## 2. Using object literals

Literals are shorter way to define objects and arrays in JavaScript. To create an empty object using you can do:

```js
var o = {};
```

instead of the "normal" way:

```js
var o = new Object();
```

For arrays you can do:

```js
var a = [];
```

instead of:

```js
var a = new Array();
```

So you can skip the class-like stuff and create an instance (object) immediately. Here's the same functionality as described in the previous examples, but using object literal syntax this time:

```js
var apple = {
  type: "macintosh",
  color: "red",
  getInfo: function() {
    return this.color + " " + this.type + " apple";
  }
};
```

In this case you don't need to (and cannot) create an instance of the class, it already exists. So you simply start using this instance.

```js
apple.color = "reddish";
alert(apple.getInfo());
```

Such an object is also sometimes called `singleton`. In "classical" languages such as Java, `singleton` means that you can have only one single instance of this class at any time, you cannot create more objects of the same class. In JavaScript (no classes, remember?) this concept makes no sense anymore since all objects are singletons to begin with.

## 3. Singleton using a function

The third way presented in this article is a combination of the other two you already saw. You can use a function to define a singleton object. Here's the syntax:

```js
var apple = new function() {
  this.type = "macintosh";
  this.color = "red";
  this.getInfo = function() {
    return this.color + " " + this.type + " apple";
  };
}();
```

So you see that this is very similar to 1.1. discussed above, but the way to use the object is exactly like in 2.

```js
apple.color = "reddish";
alert(apple.getInfo());
```

`new function(){...}` does two things at the same time: define a function (an anonymous constructor function) and invoke it with `new`. It might look a bit confusing if you're not used to it and it's not too common, but hey, it's an option, when you really want a constructor function that you'll use only once and there's no sense of giving it a name.

## 4. Using the keyword `class` in ES6/ES2015

In ES6/ES2015, there is a new keyword to define a class: `class`. This is the syntaxtic sugar to the prototype-based manner.

```js
class Apple {
  constructor(type = "Green Smith", color = "green") {
    this.type = type;
    this.color = color;
    this.info = `A ${color} ${type} apple`;
  }

  cut(number = 2) {
    console.log(`Please cut the apple into ${number} pieces.`);
  }
}

const myApple = new Apple("Gala", "red");
myApple.info; // "A red Gala apple"
myApple.cut(8); // Please cut the apple into 8 pieces.
```

## Summary

There are several ways to define JavaScript class. Way in 1.2. and 4 are two most commonly used ways in OOP. However, do remember that, class in JavaScript are all prototype-based, even with the keyword `class`.
