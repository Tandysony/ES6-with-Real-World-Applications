# Template Literals

## Concatenation operator ( `+` )

Prior to ES6, the old way to concatenate strings together was by using the string concatenation operator ( `+` ).

```js
const student = {
  name: "Tandy Tan",
  guardian: "Mr. Tan"
};

const teacher = {
  name: "Mr. Jordan",
  room: "EV6.235"
};

let message =
  student.name +
  " please see " +
  teacher.name +
  " in " +
  teacher.room +
  " to pick up your report template.";
```

Variable _message_ will be:

> "Tandy Tan please see Mr. Jordan in EV6.235 to pick up your report template."

This works alright, but it gets more complicated when you need to build _multi-line_ strings.

```js
let note =
  teacher.name +
  ",\n\n" +
  "Please excuse " +
  student.name +
  ".\n" +
  "He is recovering from the flu.\n\n" +
  "Thank you,\n" +
  student.guardian;
```

Variable _note_ will be:

> "Mr. Jordan,
>
> Please excuse Tandy Tan.  
> He is recovering from the flu.
>
> Thank you,  
> Mr. Tan"

However, that’s changed with the introduction of `template literals` (previously referred to as "template strings" in development releases of ES6).

> NOTE: As an alternative to using the string concatenation operator ( `+` ), you can use the String's `concat()` method, but both options are rather clunky for simulating true [string interpolation](https://en.wikipedia.org/wiki/String_interpolation).

## Template Literals

`Template literals` are essentially string literals that include _embedded expressions_.

Denoted with backticks (` `` `) instead of single quotes (`''`) or double quotes (`""`), template literals can **_contain placeholders_** which are represented using `${expression}`. This makes it _much easier_ to build strings.

Here's the previous examples using template literals.

```js
let message = `${student.name} please see ${teacher.name} in ${
  teacher.room
} to pick up your report template.`;
```

Variable _message_ will be:

> "Tandy Tan please see Mr. Jordan in EV6.235 to pick up your report template."

By using template literals, you can drop the quotes along with the string concatenation operator. Also, you can reference the object's properties inside expressions.

For the multi-line example, it can be rewritten as:

```js
let note = `${teacher.name},

  Please excuse ${student.name}.
  He is recovering from the flu.

  Thank you,
  ${student.guardian}`;
```

Here’s where template literals really shine. That's because template literals also preserve newlines as part of the string!

> TIP: Embedded expressions inside template literals can do more than just reference variables. You can perform operations, call functions and use loops inside embedded expressions!

## Quiz

Modify the `createAnimalTradingCardHTML()` function to use a template literal for cardHTML.

```js
/*
 * Programming Quiz: Build an HTML Fragment
 */

const cheetah = {
  name: "Cheetah",
  scientificName: "Acinonyx jubatus",
  lifespan: "10-12 years",
  speed: "68-75 mph",
  diet: "carnivore",
  summary:
    "Fastest mammal on land, the cheetah can reach speeds of 60 or perhaps even 70 miles (97 or 113 kilometers) an hour over short distances. It usually chases its prey at only about half that speed, however. After a chase, a cheetah needs half an hour to catch its breath before it can eat.",
  fact:
    "Cheetahs have “tear marks” that run from the inside corners of their eyes down to the outside edges of their mouth."
};

// creates an animal trading card
function createAnimalTradingCardHTML(animal) {
  const cardHTML =
    '<div class="card">' +
    '<h3 class="name">' +
    animal.name +
    "</h3>" +
    '<img src="' +
    animal.name +
    '.jpg" alt="' +
    animal.name +
    '" class="picture">' +
    '<div class="description">' +
    '<p class="fact">' +
    animal.fact +
    "</p>" +
    '<ul class="details">' +
    '<li><span class="bold">Scientific Name</span>: ' +
    animal.scientificName +
    "</li>" +
    '<li><span class="bold">Average Lifespan</span>: ' +
    animal.lifespan +
    "</li>" +
    '<li><span class="bold">Average Speed</span>: ' +
    animal.speed +
    "</li>" +
    '<li><span class="bold">Diet</span>: ' +
    animal.diet +
    "</li>" +
    "</ul>" +
    '<p class="brief">' +
    animal.summary +
    "</p>" +
    "</div>" +
    "</div>";

  return cardHTML;
}

console.log(createAnimalTradingCardHTML(cheetah));
```

### Answer

```js
/*
 * Programming Quiz: Build an HTML Fragment using template literals
 */

const cheetah = {
  name: "Cheetah",
  scientificName: "Acinonyx jubatus",
  lifespan: "10-12 years",
  speed: "68-75 mph",
  diet: "carnivore",
  summary:
    "Fastest mammal on land, the cheetah can reach speeds of 60 or perhaps even 70 miles (97 or 113 kilometers) an hour over short distances. It usually chases its prey at only about half that speed, however. After a chase, a cheetah needs half an hour to catch its breath before it can eat.",
  fact:
    "Cheetahs have “tear marks” that run from the inside corners of their eyes down to the outside edges of their mouth."
};

// creates an animal trading card
function createAnimalTradingCardHTML(animal) {
  const cardHTML = `<div class="card">
    <h3 class="name"> ${animal.name} </h3>
        <img src="${animal.name}.jpg" alt="${animal.name}" class="picture">
        <div class="description">
            <p class="fact"> ${animal.fact} </p>
            <ul class="details">
                <li><span class="bold">Scientific Name</span>: ${
                  animal.scientificName
                }</li>
                <li><span class="bold">Average Lifespan</span>: ${
                  animal.lifespan
                }</li>
                <li><span class="bold">Average Speed</span>: ${
                  animal.speed
                }</li>
                <li><span class="bold">Diet</span>: ${animal.diet}</li>
            </ul>
            <p class="brief"> $(animal.summary) </p>
        </div>
    </div>`;

  return cardHTML;
}

console.log(createAnimalTradingCardHTML(cheetah));
```
