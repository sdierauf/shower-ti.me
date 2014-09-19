/*
 * Stefan Dierauf 2014
 * Runs showertime timer,
 * and handles getting/posting to the server
 * based on username
 */

(function() {

  // var currentUser = findCurrentUser();
  var currentTime = 0;
  var timeoutStore;
  var timeIncrementInMs = 1000;
  var timeCheck;

  /*
  * Sets up the app and starts the timer
  */
  function init() {
    console.log('init!');
    setup();
    startTimer();
  }

  /*
   * Binds to dom elements and initializes variables
   */
  function setup() {
    currentTime = 0;
    timeIncrementInMs = 1000;
    document.getElementById('timerdisplay').innerHTML = "0:0"
    document.getElementById('stoptimer').onclick = stopTimer;
  }

  /*
  * Starts the timer counting up
  */
  function startTimer() {
    currentTime = 0;
    timeoutStore = setInterval(updateTimer, timeIncrementInMs);
  }

  /*
  * Updates the timer
  * accounts for if the page gets backgrounded and stops intervals
  */

  function updateTimer() {
    if (!timeCheck) {
      timeCheck = Date.now();
    }
    var intervalCheck = Date.now();
    if (intervalCheck - timeCheck > timeIncrementInMs) {
      currentTime += intervalCheck - timeCheck;
    } else {
      currentTime += timeIncrementInMs;
    }
    redrawTimer();
    timeCheck = Date.now();
  }

  /*
  * Redraws the timer
  */

  function redrawTimer() {
    var timeInSeconds = Math.floor(currentTime / 1000);
    var displaySeconds = timeInSeconds % 60;
    var displayMinutes = Math.floor(timeInSeconds / 60);
    var timeDisplay = displayMinutes + ":" + displaySeconds;
    document.getElementById('timerdisplay').innerHTML = timeDisplay;
  }

  /*
   * Stops the timer and pushes it to the database
   */
  function stopTimer() {
    if (timeoutStore) {
      clearInterval(timeoutStore);
      uploadTime();
    }
  }

  /*
   * uploads the time for the current user
   */
  function uploadTime() {
    var currentUser = findCurrentUser();
    var payload = {
      "user": currentUser,
      "time": currentTime
    };
    ajax('add', handleAddTime, "POST", payload);
  }

  /*
   * handles response of adding time
   */
  function handleAddTime() {
    console.log('async returnnnn');
    currentTime = 0;
  }

  /*
   * Generic function for ajax calls
   */
  function ajax(query, functionName, method, payload) {
    var req = new XMLHttpRequest();
    req.onload = functionName;
    req.open(method, '/' + query, true);
    if (method == "POST") {
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    req.send(JSON.stringify(payload));
  }

  /*
   * gets the current user
   */
  function findCurrentUser() {
    return "stefan"
  }

  init();



})();
