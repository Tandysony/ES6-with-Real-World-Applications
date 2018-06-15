# A Course Shopping Cart Application

> **Disclaimer:** This application is for practice purpose. If there is anything that violates Udemy's copyright, design or alike, please let me know. I will pull it down.

## Requirements:

- The course page should be similar to Udemy page
- User can add courses into the shopping cart
- User can remove courses from the shopping cart
- Shopping cart content is going to be saved into Local Storage
- Shopping cart will display the contents from Local Storage on page loaded
- When a course is removed from the shopping cart, it should be removed also from Local Storage

## Summary & Tips

#### Summary

#### Tips

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

2.  No need to add event listener to each button. Instead, use `e.target.classList.contains("className")` to verify is a button is clicked.

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
