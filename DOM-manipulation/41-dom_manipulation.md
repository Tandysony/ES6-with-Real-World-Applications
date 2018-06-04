# DOM Manipulation: Querying the DOM

Whenever we need to perform DOM manipulation, **jQuery** will be the easy solution. However, the _vanilla (pure) JavaScript DOM API_ is actually quite capable in its own right. Please please keep in mind, some of the API, i.e., `.querySelector("#id")`, only works for **IE 11 +**.

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

## Grab Children/Parent Node(s)

```js
// Get child nodes
var stored = document.getElementById("someId");
var children = stored.childNodes;

// Get parent node
var parental = children.parentNode;
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

## Add Elements to the DOM

```js
// grab element on page you want to add stuff to
var firstHeading = document.getElementById("firstHeading");

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
var firstHeading = document.getElementById("firstHeading");

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
