# Working with Sets

## Checking the Length

Once you’ve constructed a Set, there are a couple of different properties and methods you can use to work with Sets.

Use the `.size` property to _return the number of items_ in a Set:

```js
const months = new Set([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]);
console.log(months.size);
```

> **Prints:**  
> `12`

Remember, **Sets can’t be accessed by their index** like an array, so you use the `.size` property instead of `.length` property to get the size of the Set.

## Checking If An Item Exists

Use the `.has()` method to _check if an item exists_ in a Set. If the item is in the Set, then `.has()` will return `true`. If the item doesn’t exist in the Set, then `.has()` will return `false`.

```js
console.log(months.has("October"));
```

> **Prints:**  
> `true`

## Retrieving All Values

Finally, use the `.values()` method to _return the values in a Set_. The return value of the `.values()` method is a `SetIterator` object.

```js
console.log(month.values());
```

> **Prints:**  
> `SetIterator {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}`

> **TIP:** The `.keys()` method will behave the exact same way as the `.values()` method by _returning the values of a Set within a new **Iterator Object**_. The `.keys()` method is an alias for the `.values()` method for similarity with maps. You’ll see the `.keys()` method later in this lesson during the Maps section.

## Loop Over a Set

Recall our discussion on the new _iterable_ and _iterator protocols_ in ES6, then you’ll recall that Sets are built-in iterables. This means two things in terms of looping:

* You can use the Set’s default iterator to step through each item in a Set, one by one.
* You can use the new `for...of` loop to loop through each item in a Set.

### Using the `SetIterator`

Because the `.values()` method returns a new iterator object (called `SetIterator`), you can store that iterator object in a variable and loop through each item in the Set using `.next()`.

```js
const iterator = months.values();
iterator.next();
iterator.next();
```

> **Outputs:**  
> `{value: "January", done: false}`  
> `{value: "February", done: false}`

And so on until `done` equals `true` which marks the end of the Set.

### Using a `for...of` Loop`

An easier method to loop through the items in a Set is the `for...of` loop.

```js
const colors = new Set(["red", "orange", "blue", "black", "brown", "violet"]);
for (const color of colors) {
  console.log(color);
}
```

> **Prints:**  
> `red`  
> `orange`  
> `yellow`  
> `green`  
> `blue`  
> `violet`  
> `brown`  
> `black`

## Quiz

Create a variable with the name `myFavoriteFlavors` and give it the value of an empty `Set` object. Then use the `.add()` method to add the following strings to it:

* "chocolate chip"
* "cookies and cream"
* "strawberry"
* "vanilla"

Then use the `.delete()` method to remove `"strawberry"` from the set.

```js
const myFavoriteFlavors = new Set();

myFavoriteFlavors.add("chocolate chip");
myFavoriteFlavors.add("cookies and cream");
myFavoriteFlavors.add("strawberry");
myFavoriteFlavors.add("vanilla");
myFavoriteFlavors.delete("strawberry");
```
