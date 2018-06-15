/* -------- VARIABLES -------- */
const courseList = document.querySelector("#course-list");
const courseCart = document.querySelector(".course-chosen");
const clearCart = document.querySelector("#btn-clear-cart");
const searchBox = document.querySelector("#search-term");
const allCourse = document.querySelectorAll(".course");
const keyInLS = "myCourses";

/* -------- EVENT LISTENER -------- */
loadEeventListner();

function loadEeventListner() {
  // add course
  courseList.addEventListener("click", saveCourse);

  // remove course
  courseCart.addEventListener("click", removeCourse);

  // clear course
  clearCart.addEventListener("click", clearCourses);

  // load local storage data on page loaded
  document.addEventListener("DOMContentLoaded", initCoursesFromLocalStorage);

  // filter course
  searchBox.addEventListener("keyup", filterCourses);
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

// remove the chosen course
function removeCourse(e) {
  e.preventDefault();

  if (e.target.classList.contains("btn-remove")) {
    e.target.parentNode.parentNode.remove();
  }

  // remove the course from local storage by the course ID
  removeCourseFromLocalStorage(e.target.getAttribute("data-uid"));
  e.stopPropagation();
}

// clear courses
function clearCourses(e) {
  e.preventDefault();

  // courseCart.innerHTML = ""; // not recommended

  // recommended
  while (courseCart.firstChild) {
    courseCart.removeChild(courseCart.firstChild);
  }

  localStorage.removeItem(keyInLS);
  e.stopPropagation();
}

// get the information of the chosen course
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

function addCourseToLocalStorage(course) {
  let courseInLS = getCourseFromLocalStorage();

  courseInLS.push(course);
  localStorage.setItem(keyInLS, JSON.stringify(courseInLS));
}

function getCourseFromLocalStorage() {
  let courses = [];

  if (localStorage.getItem(keyInLS) !== null) {
    courses = JSON.parse(localStorage.getItem(keyInLS));
  }

  return courses;
}

function initCoursesFromLocalStorage() {
  const courseInLS = getCourseFromLocalStorage();

  courseInLS.forEach(course => addCourseToCart(course));
}

function removeCourseFromLocalStorage(uid) {
  let courseInLS = getCourseFromLocalStorage();

  courseInLS.forEach((el, index) => {
    if (el.id === uid) {
      courseInLS.splice(index, 1);
    }

    localStorage.setItem(keyInLS, JSON.stringify(courseInLS));
  });
}

function filterCourses(e) {
  e.preventDefault();

  const q = searchBox.value.toLowerCase();
  allCourse.forEach(course => {
    if (
      course
        .querySelector(".course-title")
        .textContent.toLowerCase()
        .includes(q)
    ) {
      course.style.display = "grid";
    } else {
      course.style.display = "none";
    }
  });
}
