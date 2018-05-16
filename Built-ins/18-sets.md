# Sets

## A Set in Mathematics

If you think back to mathematics, a set is a collection of distinct items. For example, `{2, 4, 5, 6}` is a set because each number is unique and appears only once. However, `{1, 1, 2, 4}` is **not a set** because it _contains duplicate entries_ (the `1` is in there more than once!).

In JavaScript, we can already represent something similar to a mathematical set using an **array**.

```js
const nums = [2, 4, 5, 6];
```

However, arrays _do not enforce items to be unique_. If we try to add another `2` to `nums`, JavaScript won't complain and will add it without any issue.

```js
nums.push(2);
console.log(nums);
```

> **Prints:**  
> `[2, 4, 5, 6, 2]`

…and now `nums` is no longer a set in the mathematical sense.

## Sets

In ES6, there’s a new built-in object that behaves like a mathematical set and works similarly to an array. This new object is conveniently called a `"Set"`. The biggest differences between a **set** and an **array** are:

* **Sets are not indexed-based** - you do not refer to items in a set based on their position in the set
* **items in a Set can’t be accessed individually**

Basically, a Set is an object that lets you store unique items. You can add items to a Set, remove items from a Set, and loop over a Set. These items can be either primitive values or objects.

## How to Create a Set

There’s a couple of different ways to create a Set. The first way, is pretty straightforward, use `new Set()`:

```js
const games = new Set();
console.log(games);
```

> **Prints:**  
> `Set(0) {}`

This creates an empty Set `games` with no items.

If you want to create a Set from a list of values, you use an array:

```js
const games = new Set([
  "Super Mario Bros.",
  "Banjo-Kazooie",
  "Mario Kart",
  "Super Mario Bros."
]);
console.log(games);
```

> **Prints:**  
> `Set(3) {"Super Mario Bros.", "Banjo-Kazooie", "Mario Kart"}`

Notice the example above automatically **removes the duplicate entry** `"Super Mario Bros."` when the Set is created.

## Quiz 1

Select the collections below that represent a Set in JavaScript.

```js
// option 1
{
  1, "Basketball", true, false, "1";
}

// option 2
{
}
// option 3
{
  1, 1, 1, 1;
}

// option 4
{
  false, "0", 0, "Soccer", 3.14, 25, 0;
}

// option 56
{
  "Gymnastics", "Swimming", 2;
}
```

A set is an object that has no repeating values. Therefore, option 1, 2 and 5 are correct.

## Modifying Sets

After you’ve created a **Set**, you’ll probably want to _add_ and _delete_ items from the Set. So how do you that? You use the appropriately named, `.add()` and `.delete()` methods:

```js
const games = new Set([
  "Super Mario Bros.",
  "Banjo-Kazooie",
  "Mario Kart",
  "Super Mario Bros."
]);

games.add("Banjo-Tooie");
games.add("Age of Empires");
games.delete("Super Mario Bros.");

console.log(games);
```

> **Prints:**  
> `Set(4) {"Banjo-Kazooie", "Mario Kart", "Banjo-Tooie", "Age of Empires"}`

On the other hand, if you want to **delete all the items** from a Set, you can use the `.clear()` method.

```js
games.clear():
```

> **Prints:**  
> `Set(0) {}`

> **TIP:** If you attempt to `.add()` a duplicate item to a Set, you won’t receive an error, but the item will not be added to the Set. Also, if you try to `.delete()` an item that is not in a Set, you won’t receive an error, and the Set will remain unchanged.
>
> `.add()` returns the Set if an item is successfully added. On the other hand, `.delete()` returns a **Boolean** (`true` or `false`) depending on successful deletion.
