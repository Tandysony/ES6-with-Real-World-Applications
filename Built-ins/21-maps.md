# Maps

If _Sets are similar to Arrays_, then _Maps are similar to Objects_ because Maps store key-value pairs similar to how objects contain named properties with values.

Essentially, a **Map** is an object that lets you store key-value pairs where both the keys and the values can be objects, primitive values, or a combination of the two.

## How to Create a Map

To create a Map, simply type:

```js
const employees = new Map();
console.log(employees);
```

> **Prints:**  
> `Map {}`

This creates an empty Map `employees` with no key-value pairs.

## Modifying Maps

Unlike Sets, you can’t create Maps from a list of values; instead, you add key-values by using the Map’s `.set()` method.

```js
const employees = new Map();

employees.set("james.parkesx@udacity.com", {
  firstName: "James",
  lastNmae: "Parkes",
  role: "Content Develop"
});

employees.set("julia@udacity.com", {
  firstName: "Julia",
  lastName: "Van Cleve",
  role: "Content Developer"
});

employees.set("richard@udacity.com", {
  firstName: "Richard",
  lastName: "Kalehoff",
  role: "Content Developer"
});

console.log(employees);
```

> **Prints:**  
> `Map(3) {"james.parkesx@udacity.com" => {…}, "julia@udacity.com" => {…}, "richard@udacity.com" => {…}}`

The `.set()` method takes _two arguments_. The first argument is the key, which is used to reference the second argument, the value.

To remove key-value pairs, simply use the `.delete()` method.

```js
employees.delete("richard@udacity.com");
employees.delete("julia@udacity.com");
console.log(employees);
```

> **Prints:**  
> `{"james.parkesx@udacity.com" => {…}}`

Again, similar to Sets, you can use the `.clear()` method to remove all key-value pairs from the Map.

```js
employees.clear();
console.log(employees);
```

> **Prints:**  
> `Map {}`

> **TIP:** If you `.set()` a key-value pair to a Map that already uses the same key, you won’t receive an error, but the key-value pair will overwrite what currently exists in the Map. Also, if you try to `.delete()` a key-value that is not in a Map, you won’t receive an error, and the Map will remain unchanged.
>
> The `.delete()` method returns `true` if a key-value pair is successfully deleted from the `Map` object, and `false` if unsuccessful. The return value of `.set()` is the Map object itself if successful.
