/* -------- VARIABLES -------- */
const courseList = document.querySelector("#course-list");
const courseCart = document.querySelector(".course-chosen");
const clearCart = document.querySelector("#btn-clear-cart");

/* -------- EVENT LISTENER -------- */
loadEeventListner();

function loadEeventListner() {
  // add course
  courseList.addEventListener("click", addCourseToCart);
}

/* -------- FUNCTIONS -------- */
// star rating example
$(".starrr").starrr({
  rating: 5
});

function addCourseToCart(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-add-course")) {
    const course = e.target.parentNode.parentNode;
    // get course information
    getChosenCourse(course);
  }
}

function getChosenCourse(courseObj) {
  const courseId = courseObj.dataset.uid;
  console.log(courseId);
}
