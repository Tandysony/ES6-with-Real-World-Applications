# JavaScript’s Map, Reduce, Filter and Sort

In 2011, JavaScript introduced `map`, `reduce`, and `filter` as powerful alternatives when translating elements, finding cumulative values, or building subsets based on conditions. They make code less complex, without side effects, and often more readable.

## `map()`

The `map()` method creates a new array with the results of calling a provided function on every element in the calling array.

**Use it when:** You want to translate/map all elements in an array to another set of values.

**Example**: convert Fahrenheit temps to Celsius.

```js
let fahrenheit = [0, 32, 45, 50, 75, 80, 99, 120];

// ES5
let celcius = fahrenheit.map(function(elem) {
  return Math.round(((elem - 32) * 5) / 9);
});

// ES6
celcius = fahrenheit.map(elem => Math.round(((elem - 32) * 5) / 9));

celcius; //  [-18, 0, 7, 10, 24, 27, 37, 49]
```

## `filter()`

The `filter()` method creates a new array with all elements that pass the test implemented by the provided function.

**Use it when**: You want to remove unwanted elements based on a condition.

**Example**: remove duplicate elements from an array.

```js
// ES5
var uniqueArray = array.filter(function(elem, index, array) {
  return array.indexOf(elem) === index;
});

// ES6
uniqueArray = array.filter((elem, index, arr) => arr.indexOf(elem) === index);
```

```js
var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

### compared the `loop` function with `filter`

```js
// `for` loop
for (var i = 0; i < array.length; i++) {
  if (array.indexOf(array[i]) === i) {
    models.push(array[i]);
  }
}

// `filter()` function
var uniqueProducts = array.filter(function(elem, i, array) {
  return array.indexOf(elem) === i;
});
```

The `filter()` function is much simpler and more elegant.

## `reduce()`

The `reduce()` method applies a function against **an accumulator** and **each element** in the array (from left to right) to reduce it to **a single value**.

**Use it when**: You want to find a cumulative or concatenated value based on elements across the array.

**Example**: Sum up orbital rocket launches in 2014.

```js
var rockets = [
  { country: "Russia", launches: 32 },
  { country: "US", launches: 23 },
  { country: "China", launches: 16 },
  { country: "Europe(ESA)", launches: 7 },
  { country: "India", launches: 4 },
  { country: "Japan", launches: 3 }
];

// ES5
var sum = rockets.reduce(function(prevVal, elem) {
  return prevVal + elem.launches;
}, 0);

// ES6
sum = rockets.reduce((prevVal, elem) => prevVal + elem.launches, 0);

sum; // 85
```

The `0` is the initial value.

## `sort`

The `sort()` method sorts the elements of an array **in place** and returns **the array**. The default sort order is according to string Unicode code points.

The sort method can be conveniently used with function expressions (and closures):

```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

// [1, 2, 3, 4, 5]
```

### Use them all together

```js
const companies = [
  {
    guid: "d5214634-5be8-4cfc-a347-958ea3ce9051",
    age: 15,
    company: "TELEQUIET"
  },
  {
    guid: "54371845-c487-4c8c-b427-0dff23137bd7",
    age: 24,
    company: "COMVENE"
  },
  {
    guid: "425f3a1c-d911-4866-9e1f-15449874282c",
    age: 10,
    company: "SURETECH"
  },
  {
    guid: "2f07797b-94c9-496a-b503-19f5b00fc621",
    age: 3,
    company: "FLEXIGEN"
  },
  {
    guid: "cd6f5f5c-ae27-4dc4-b501-3657231c74a3",
    age: 35,
    company: "INSECTUS"
  }
];

const totalYear = companies
  .sort((a, b) => a.age - b.age)
  .filter(el => el.age >= 10)
  .reduce((sum, el) => sum + el.age, 0);

console.log(totalYear);

// Print: 84
```
