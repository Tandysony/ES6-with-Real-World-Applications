# Iteration & Iterable Protocols

Before moving on, let’s look at two new protocols in ES6:

* the **iterable** protocol
* the **iterator** protocol

These protocols aren’t built-ins, but they will help you understand the new concept of iteration in ES6, as well as show you a use case for symbols.

## The Iterable Protocol

The **iterable protocol** is used for **_defining and customizing the iteration behavior of objects_**. What that really means is you now have the flexibility in ES6 to specify a way for iterating through values in an object. For some objects, they already come built-in with this behavior. For example, `strings` and `arrays` are examples of built-in iterables.

```js
const digits = [0, 1, 2, 3, 4, 5];
for (const digit of digits) {
  console.log(digit);
}
```

> **Prints:**  
> `0`  
> `1`  
> `2`  
> `3`  
> `4`  
> `5`

Any object that is iterable can use the new `for...of` loop. Later in this lesson, you’ll also learn about `Sets` and `Maps` which are other examples of built-in iterables.

### How it Works

In order for an object to be iterable, it must implement the **iterable interface**. If you come from a language like Java or C, then you’re probably familiar with _interfaces_, but for those of you who aren’t, that basically means that in order for an object to be iterable it must contain a default iterator method. This method will define how the object should be iterated.

The **iterator method**, which is available via the constant `[Symbol.iterator]`, _is a zero arguments function that returns an iterator object_. An **iterator object** is an object that conforms to the **iterator protocol**.

## The Iterator Protocol

The **iterator protocol** is used to _define a standard way that an object produces a sequence of values_. What that really means is you now have a process for defining how an object will iterate. This is done through implementing the `.next()` method.

### How it Works

An object becomes an iterator when it implements the `.next()` method. The `.next()` method is _a zero arguments function that returns an object with two properties_:

1.  `value`: the data representing the _next value_ in the sequence of values within the object
2.  `done`: a _boolean_ representing if the iterator is done going through the sequence of values

    * If `done` is `true`, then the iterator has reached the end of its sequence of values.
    * If `done` is `false`, then the iterator is able to produce another value in its sequence of values.

Here’s the example from earlier, but instead we are using the array’s default iterator to step through the each value in the array.

```js
const digits = [0, 1, 2, 3, 4, 5];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
```

> **Prints:**  
> `{value: 0, done: false}`  
> `{value: 1, done: false}`  
> `{value: 2, done: false}`  
> `{value: 3, done: false}`  
> `{value: 4, done: false}`  
> `{value: 5, done: false}`  
> `{value: undefined, done: true}`
