# DOM Manipulation: Querying the DOM

Whenever we need to perform DOM manipulation, **jQuery** will be the easy solution. However, the _vanilla (pure) JavaScript DOM API_ is actually quite capable in its own right. Please please keep in mind, some of the API, i.e., `.querySelector("#id")`, only works for **IE 11 +**.

Some of the most common DOM manipulation tasks with plain JavaScript are:

- querying and modifying the DOM,
- modifying classes and attributes,
- listening to events, and
- animation.

## Accessing DOM Elements

```js
// Returns a reference to the element by its ID.
document.getElementById("someId");

// Returns an array-like object of all child elements which have all of the given class names.
document.getElementsByClassName("someClass");

// Returns an HTMLCollection of elements with the given tag name.
document.getElementsByTagName("li");

// Returns the first element within the document that matches the specified group of selectors.
document.querySelector(".someClass");
document.querySelector("#someId");

// Returns a list of the elements within the document (using depth-first pre-order traversal of the document's nodes)
// that match the specified group of selectors.
document.querySelectorAll("div.note, div.alert");
```

`document.querySelector()` and `document.querySelectorAll()` are recommended, as they take an arbitrary CSS selector as an argument, and is more of JQuery style.

## Grab Children/Parent Node(s)

```js
// Get child nodes
var stored = document.getElementById("someId");
var children = stored.childNodes;

// Get parent node
var parental = children.parentNode;
```

Each element also has a couple of rather self-explanatory read-only properties referencing the “family”, all of which are live:

```js
myElement.children;
myElement.firstElementChild;
myElement.lastElementChild;
myElement.previousElementSibling;
myElement.nextElementSibling;
```

As the Element interface inherits from the **Node interface**, the following properties are also available:

```js
myElement.childNodes;
myElement.firstChild;
myElement.lastChild;
myElement.previousSibling;
myElement.nextSibling;
myElement.parentNode;
myElement.parentElement;
```

Where the former only reference elements, the latter (except for `.parentElement`) can be any kind of node, e.g. text nodes. We can then check the type of a given node like e.g.

```js
myElement.firstChild.nodeType === 3; // this would be a text node
```

As with any object, we can check a node’s prototype chain using the instanceof operator:

```js
myElement.firstChild.nodeType instanceof Text;
```

## Create New DOM Elements

```js
// create new elements
var newHeading = document.createElement("h1");
var newParagraph = document.createElement("p");

// create text nodes for new elements
var h1Text = document.createTextNode("This is a nice header text!");
var pText = document.createTextNode("This is a nice paragraph text!");

// attach new text nodes to new elements
newHeading.appendChild(h1Text);
newParagraph.appendChild(pText);

// elements are now created and ready to be added to the DOM.
```

Every element also has the properties `.innerHTML` and `.textContent` (as well as `.innerText`, which is similar to `.textContent`, but has some important differences). These hold the **HTML** and **plain text** content respectively.

## Add Elements to the DOM

```js
// grab element on page you want to add stuff to
var firstHeading = document.querySelector("#firstHeading");

// add both new elements to the page as children to the element we stored in firstHeading.
firstHeading.appendChild(newHeading);
firstHeading.appendChild(newParagraph);

// can also insert before like so

// get parent node of firstHeading
var parent = firstHeading.parentNode;

// insert newHeading before FirstHeading
parent.insertBefore(newHeading, firstHeading);
```

## Add/Remove/Toggle/Check Classes

```js
// grab element on page you want to use
var firstHeading = document.querySelector("#firstHeading");

// will remove foo if it is a class of firstHeading
firstHeading.classList.remove("foo");

// will add the class 'anotherClass' if one does not already exist
firstHeading.classList.add("anotherClass");

// add or remove multiple classes
firstHeading.classList.add("foo", "bar");
firstHeading.classList.remove("foo", "bar");

// if visible class is set remove it, otherwise add it
firstHeading.classList.toggle("visible");

// will return true if it has class of 'foo' or false if it does not
firstHeading.classList.contains("foo");
```

## Modifying Attributes

Element properties can be accessed like any other object’s properties

```js
// Get an attribute value
const value = myElement.value;

// Set an attribute as an element property
myElement.value = "foo";

// Set multiple properties using Object.assign()
Object.assign(myElement, {
  value: "foo",
  id: "bar"
});

// Remove an attribute
myElement.value = null;
```

Note that there are also the methods `.getAttibute()`, `.setAttribute()` and `.removeAttribute()`. These directly modify the HTML attributes (as opposed to the DOM properties) of an element, thus **causing a browser redraw** (you can observe the changes by inspecting the element with your browser’s dev tools). Not only is such a browser redraw more expensive than just setting DOM properties, but these methods also can have unexpected results. You can refer to this article for more tips [Quick Tip: Add or Remove a CSS Class with Vanilla JavaScript](https://www.sitepoint.com/add-remove-css-class-vanilla-js/)

## Adding CSS styles

CSS rules can be applied like any other property; note though that the properties are **_camel-cased_** in JavaScript:

```js
myElement.style.marginLeft = "2em";
```

## Listening to Events

We can use `.addEventListener()` method to add as many events of as many types as we like. It takes three arguments:

- the event type (such as click),
- a function that gets called whenever the event occurs on the element (this function gets passed an event object), and
- an optional config object which will be explained further below.

```js
myElement.addEventListener("click", function(event) {
  console.log(event.type + " got fired");
});

myElement.addEventListener("click", function(event) {
  console.log(event.type + " got fired again");
});
```

Within the listener function, `event.target` refers to the element on which the event was triggered (as does `this`, unless of course we’re using an arrow function). Thus you can easily access its properties like so:

```js
// The `forms` property of the document is an array holding
// references to all forms
const myForm = document.forms[0];
const myInputElements = myForm.querySelectorAll("input");

Array.from(myInputElements).forEach(el => {
  el.addEventListener("change", function(event) {
    console.log(event.target.value);
  });
});
```

### Common HTML Events

Here is a list of some common HTML events:

- `onchange` An HTML element has been changed
- `onclick` The user clicks an HTML element
- `onmouseover` The user moves the mouse over an HTML element
- `onmouseout` The user moves the mouse away from an HTML element
- `onkeydown` The user pushes a keyboard key
- `onload` The browser has finished loading the page

For more events, please refer to [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)

#### Preventing default actions

Note that `event` is always available within the listener function, but it is good practice to **explicitly pass it** in anyway when needed (and we can name it as we like then, of course). Without elaborating on the Event interface itself, one particularly noteworthy method is `.preventDefault()`, which will, well, prevent the browser’s default behavior, _such as following a link_. Another common use-case would be to conditionally prevent the submission of a form if the client-side form-validation fails.

```js
myForm.addEventListener("submit", function(event) {
  const name = this.querySelector("#name");

  if (name.value === "Donald Duck") {
    alert("You gotta be kidding!");
    event.preventDefault();
  }
});
```

Another important event method is `.stopPropagation()`, which will prevent the event from bubbling up the DOM. This means that if we have a propagation-stopping click listener (say) on an element, and another click listener on one of its parents, a click event that gets triggered on the child element won’t get triggered on the parent — otherwise, it would get triggered on both.
