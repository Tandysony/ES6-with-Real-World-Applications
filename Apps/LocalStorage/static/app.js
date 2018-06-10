/* ----------- Variables ----------- */
const tweetInput = document.querySelector("#tweet-input"),
  tweetBtn = document.querySelector("#tweet-submit"),
  tweetForm = document.querySelector("#tweet-form"),
  tweetList = document.querySelector("#tweet-list");

/* -----------  Event Listeners ----------- */
eventListeners();

function eventListeners() {
  // form submission
  tweetForm.addEventListener("submit", newTweet);

  // tweetInput check
  tweetInput.addEventListener("keyup", checkInput);

  // removeBtn click
  tweetList.addEventListener("click", removeTweet);

  // Document ready
  document.addEventListener("DOMContentLoaded", localStorageOnLoad);
}

/* ----------- Functions ----------- */

// create new tweet event
function newTweet(e) {
  e.preventDefault();

  // create textarea value
  const tweet = tweetInput.value;

  // create a remove button
  const rmBtn = document.createElement("a");
  rmBtn.classList = "remove-tweet";
  rmBtn.textContent = "X";

  // create an <li> element
  const li = document.createElement("li");
  li.textContent = tweet;
  li.classList.add("tweet");
  // add remove button to each tweet
  li.appendChild(rmBtn);
  tweetList.appendChild(li);

  // clear textarea and disable submission
  this.reset();
  tweetBtn.disabled = true;

  // add tweet to local storage
  addTweetToLocalStorage(tweet);
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

function addTweetToLocalStorage(tweet) {
  let existingTweets = getTweetsFromStorage();
  existingTweets.push(tweet);

  // convert array to string before save to localStorage
  localStorage.setItem("tweets", JSON.stringify(existingTweets));
}

function getTweetsFromStorage() {
  let tweets = [];
  if (localStorage.getItem("tweets") !== null) {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

// remove tweet event
function removeTweet(e) {
  e.preventDefault();

  if (e.target.classList.contains("remove-tweet")) {
    e.target.parentElement.remove();
  }

  // remove tweet from the local storage.
  removeTweetFromLocalStorage(e.target.parentElement.textContent);
}

// document loaded or ready event
function localStorageOnLoad() {
  const tweets = getTweetsFromStorage();

  tweets.forEach(tweet => {
    const rmBtn = document.createElement("a");
    rmBtn.classList = "remove-tweet";
    rmBtn.textContent = "X";

    const li = document.createElement("li");
    li.textContent = tweet;
    li.classList.add("tweet");
    li.appendChild(rmBtn);

    tweetList.appendChild(li);
  });
}

function removeTweetFromLocalStorage(tweet) {
  let tweets = getTweetsFromStorage();

  const tweetToMove = tweet.substring(0, tweet.length - 1);

  // loop through tweets to delete
  tweets.forEach((el, index) => {
    if (el === tweetToMove) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}
