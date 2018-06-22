# A Course Shopping Cart Application

> **Disclaimer:** This application is for practice purpose. If there is anything that violates Udemy's copyright, design or alike, please email me. I will pull it down.

## Requirements:

- The course page should be similar to Udemy page
- User can search courses by title
- User can add courses into the shopping cart
- User can remove courses from the shopping cart
- Shopping cart content is going to be saved into Local Storage
- Shopping cart will display the contents from Local Storage on page loaded
- When a course is removed from the shopping cart, it should be removed also from Local Storage

#### Final result

![A simple tweet application using local storage](./static/img/course-shopping-cart.gif)

#### Source code

The source code for this app can be found [here](../Course-Shopping-Cart)

## Summary & Tips

1.  User `element.getAttribute(data-dt-name)` or `element.dataset.dtName` to access the `data-dt-name` attribute. For example

```html
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
...
</article>
```

```js
var article = document.getElementById("electriccars");

article.getAttribute("data-columns"); // "3"
article.getAttribute("data-index-number"); // "12314"
article.getAttribute("data-parent"); // "cars"
```

Or, to get a `data` attribute through the `dataset` object, get the property by the part of the attribute name after `data-` (note that **_dashes are converted to camelCase_**).

```js
var article = document.getElementById("electriccars");

article.dataset.columns; // "3"
article.dataset.indexNumber; // "12314"
article.dataset.parent; // "cars"
```

2.  No need to add event listener to each button. Instead, use `e.target.classList.contains("className")` to verify if a button is clicked.

```js
const courseList = document.querySelector("#course-list");

function addCourseToCart(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-add-course")) {
    const course = e.target.parentNode.parentNode;
    // get course information
    getChosenCourse(course);
  }
}
```

3.  When clear all children from a list element `elm`, there are two ways:

```js
// not recommended
`elm.innerHTML = ""`;
```

This is not recommended. The following is recommended:

```js
// recommended
while (elm.firstChild) {
  elm.removeChild(elm.firstChild);
}
```

4.  When adding an element with complex structure, use template literals and `el.insertAdjacentHTML(position, text)`. Where

- `position`:
  A DOMString representing the position relative to the element; must be one of the following strings:

  - `'beforebegin'`: Before the element itself.
  - `'afterbegin'`: Just inside the element, before its first child.
  - `'beforeend'`: Just inside the element, after its last child.
  - `'afterend'`: After the element itself.

- `text`:
  text is the string to be parsed as HTML or XML and inserted into the tree.

For example

```js
function addCourseToCart(course) {
  const courseInHTML = `
    <tr>
        <td colspan="30%">
            <img class="img-responsive" src="${
              course.img
            }" alt="course img" width="150px" height="60px">
        </td>
        <td colspan="40%">${course.title}</td>
        <td colspan="15%">${course.price}</td>
        <td colspan="15%"><span class="btn btn-sm btn-remove" data-uid="${
          course.id
        }">X</span></td>
    </tr>
  `;

  courseCart.insertAdjacentHTML("beforeend", courseInHTML);
}
```
