/*
 * Stefan Dierauf 2014
 * Runs showertime timer,
 * and handles getting/posting to the server
 * based on username
 */

(function() {

  // The current count of the timer in ms
  var currentTime = 0;
  var timeoutStore;
  var timeIncrementInMs = 10;

  /*
  * Sets up the app and starts the timer
  */
  function init() {
    console.log('init!');
    // setup();
    startTimer();
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
  */

  function updateTimer() {
    currentTime += 10;
    redrawTimer();
  }

  /*
  * Redraws the timer
  */

  function redrawTimer() {
    var timeInSeconds = currentTime / 1000;
    if (timeInSeconds > 60) {
      timeInSeconds = 0;
      var timeInMinutes = parseInt(document.getElementById('timerMinutes'), 10) + 1;
      document.getElementById('timerMinutes').innerHTML = timeInMinutes;
    }
    document.getElementById('timerSeconds').innerHTML = timeInSeconds;
  }

  init();



})();