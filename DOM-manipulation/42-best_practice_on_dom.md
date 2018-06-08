# Best Practices on DOM Manipulation

For example, we have the following html template:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Best Practice on DOM Manipulation</title>
</head>

<body>
    <h1>Best Practice on DOM Manipulation</h1>
    <nav id="primary" class="menu">
        <a href="#" class="link">JavaScript</a>
        <a href="#" class="link">Java</a>
        <a href="#" class="link">C#</a>
        <a href="#" class="link">Python</a>
    </nav>
</body>

</html>
```

### 1. Select **odd links** under the element with id `primary`, and make the background color `red`, text `white`

```js
const oddLinks = document.querySelectorAll("#primary a:nth-child(odd)");

oddLinks.forEach(function(odd)){
    odd.style.backgroundColor = "red";
    odd.style.color = "white";
}
```

### 2. Selecting the child nodes of an element

```js
const myElement = document.querySelector("#primary");

const childList1 = myElement.childNodes;
const childList2 = myElement.children;

console.log(childList1);
console.log(childList2);
```

> **Prints:**  
> `NodeList(9) [text, a.link, text, a.link, text, a.link, text, a.link, text]`  
> `HTMLCollection(4) [a.link, a.link, a.link, a.link]`

It seems that `myElement.childNodes` returns strange result, and `myElement.children` gets it right. Therefore, it is suggested to use

```js
myElement.children;
myElement.firstElementChild;
myElement.lastElementChild;
myElement.previousElementSibling;
myElement.nextElementSibling;
```

to select the desired elements.

### 3. Select **odd links** under the element with id `primary`, and make the background color `red`, text `white`

```js
const parentElement = document.querySelector("#foo");
const childElement = parentElement.querySelector('input[type="submit"]');
```

Why use `.querySelector()`, less convenient methods like `.getElementsByTagName()` at all? Well, one important difference is that the result of `.querySelector()` **\*is not live**, so when we dynamically add an element that matches a selector, the collection won’t update. Look at the following example:

```js
const elements1 = document.querySelectorAll("div");
const elements2 = document.getElementsByTagName("div");
const newElement = document.createElement("div");

document.body.appendChild(newElement);
elements1.length === elements2.length; // false, elements1.length + 1 = elements2.length
```

Another consideration is that such a live collection doesn’t need to have all of the information up front, whereas `.querySelectorAll()` immediately gathers everything in a static list, making it less performant. That is, `getElementsByTagName()` is faster than `querySelectorAll()`. You can refer to [Access to nodes via querySelectorAll vs getElementsByTagName](https://jsperf.com/access-to-nodes-via-queryselectorall-vs-getelementsbyta/5) for the performance comparison.
