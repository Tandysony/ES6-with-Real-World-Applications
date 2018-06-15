/* -------- VARIABLES -------- */
const courseList = document.querySelector("#course-list");
const courseCart = document.querySelector(".course-chosen");
const clearCart = document.querySelector("#btn-clear-cart");

/* -------- EVENT LISTENER -------- */
loadEeventListner();

function loadEeventListner() {
  // add course
  courseList.addEventListener("click", saveCourse);

  // load local storage data on page loaded
  document.addEventListener("DOMContentLoaded", initCoursesFromLocalStorage);
}

/* -------- FUNCTIONS -------- */
// star rating example
$(".starrr").starrr({
  rating: 5
});

function saveCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-add-course")) {
    const courseNode = e.target.parentNode.parentNode;
    // get course information
    const courseInfo = getChosenCourse(courseNode);

    // save a course to local storage
    addCourseToLocalStorage(courseInfo);

    // add the course to shopping cart
    addCourseToCart(courseInfo);
  }
}

function getChosenCourse(course) {
  // create an course object to store the course information
  const courseInfo = {
    id: course.getAttribute("data-uid"),
    img: course.querySelector("img").src,
    title: course.querySelector(".course-title").textContent,
    price: course.querySelector(".now").textContent
  };

  return courseInfo;
}

function addCourseToCart(course) {
  const courseInHTML = `
    <tr>
        <td colspan="30%">
            <img class="img-responsive" src="${
              course.img
            }" alt="course img" width="125px" height="60px">
        </td>
        <td colspan="40%">${course.title}</td>
        <td colspan="15%">${course.price}</td>
        <td colspan="15%"><span class="btn btn-remove" data-uid="${
          course.id
        }">x</span></td>
    </tr>
  `;

  courseCart.insertAdjacentHTML("afterend", courseInHTML);
}

function addCourseToLocalStorage(course) {
  let courseInLS = getCourseFromLocalStorage();

  if (courseInLS === null) {
    courseInLS = [];
  }

  courseInLS.push(course);
  localStorage.setItem("myCourses", JSON.stringify(courseInLS));
}

function getCourseFromLocalStorage() {
  return JSON.parse(localStorage.getItem("myCourses"));
}

function initCoursesFromLocalStorage() {
  const courseInLS = getCourseFromLocalStorage();

  if (courseInLS !== null) {
    courseInLS.forEach(function(course) {
      addCourseToCart(course);
    });
  }
}
