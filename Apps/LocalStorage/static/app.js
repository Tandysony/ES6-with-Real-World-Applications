// variables
const tweetInput = document.querySelector("#tweet-input"),
  tweetBtn = document.querySelector("#tweet-submit"),
  tweetForm = document.querySelector("#tweet-form"),
  tweetList = document.querySelector("#tweet-list");

// Event listeners
eventListeners();

function eventListeners() {
  // form submission
  tweetForm.addEventListener("submit", newTweet);

  // tweetInput check
  tweetInput.addEventListener("keyup", checkInput);
}

// Functions
function newTweet(e) {
  e.preventDefault();

  // create textarea value
  const tweet = tweetInput.value;

  // create an <li> element
  const li = document.createElement("li");
  li.textContent = tweet;
  tweetList.appendChild(li);

  // clear textarea to avoid duplication
  tweetInput.value = "";
}

function checkInput(e) {
  e.preventDefault();

  // enable submission if input is not empty
  if (tweetInput.value != "") {
    tweetBtn.disabled = false;
  } else {
    tweetBtn.disabled = true;
  }
}
