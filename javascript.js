//function to convert time in seconds into HH:MM:SS Display 
function convertToTime(y){
  var hours = Math.floor(y / 3600);
  var minutes = Math.floor((y % 3600) / 60);
  var seconds = y % 60;
      if (minutes < 10){
        var minuteDisplay = "0"+minutes
      } else {
        minuteDisplay = minutes;
      }

      if (hours < 10 )
    {
        var hoursDisplay = "0"+hours;
    } else {
        hoursDisplay = hours;
    }

      if (seconds < 10) {
        var secondsDiplay = "0"+seconds;
      } else {
        secondsDiplay = seconds;
      }
  if (y >= 3600){
    //if (minutes>=10){
    var minutesSecondsDisplay = hoursDisplay+ ":" + minuteDisplay +":"+secondsDiplay;
      //} else {
      //  var minutesSecondsDisplay = hours+ ":" + "0" minutes +":"+seconds;
      //}
  }  else if (y >= 60) {
  var minutesSecondsDisplay = minuteDisplay +":"+secondsDiplay;
  } else {
  var minutesSecondsDisplay = "00"+":"+secondsDiplay;
  }
  return minutesSecondsDisplay
}

//Work Timer Stuff
var defaultWorkTime = 1500;//starts with this value but changes if user enters a custom value, work timer always starts with this value
var timerDuration = defaultWorkTime;  // timerDuration is used in active work timer, will always start as the default value


//Starting and Stopping the Countdown
var nIntervID; // setting variable that'll be used to start and stop countdown

//starts the countdown
function startCountdown() {
      nIntervID = window.setInterval(countdown, 1000);
}
//stops the countdown by clearing nIntervID when it is called
function stopCountdown(){
  window.clearInterval(nIntervID);
}

//evertyime this function is called it subtract 1 from the countdown
function countdown() {
    if (timerDuration > 0){
      timerDuration -= 1;
      productivityTimeDuration +=1;
      } else {
        stopCountdown();
        startBreakCountdown();
        timerDuration = defaultWorkTime;
        document.getElementById('breakTimerSection').classList.remove('breakTimerHidden');
        document.getElementById('workTimerSection').classList.add('workTimerHidden');
        alert("Time for a break");
      }
      
      document.getElementById("timer").innerHTML = convertToTime(timerDuration);
      document.getElementById("productivityTime").innerHTML = convertToTime(productivityTimeDuration);
}


//add time button 
function addMinute() {

    timerDuration += 60;
    document.getElementById("timer").innerHTML = convertToTime(timerDuration);}


//subtract time from mian timer button
function subtractMinute(){
  if (timerDuration >=60){ // can't go below 0 seconds
  timerDuration -= 60;
  document.getElementById("timer").innerHTML = convertToTime(timerDuration);}
}

//break timer
var defaultBreakTime = 300; //default break time
var breakTimerDuration = defaultBreakTime; // set breakTimerDuration to deafultBreakTime

var bIntervID; // setting variable that'll be used to start and stop break timer countdown

//function that runs the break countdown every second until bIntervID is cleared
function startBreakCountdown(){
  bIntervID = window.setInterval(breakCountdown, 1000);
}

//stops break timer - active on stop button and when work timer hits 0
function stopBreakCountdown(){
  window.clearInterval(bIntervID);
}

//evertyime this function is called it subtract 1 from the break countdown
function breakCountdown() {
    if (breakTimerDuration > 0){
      breakTimerDuration -= 1;
      } else {
        stopBreakCountdown();
        breakTimerDuration = defaultBreakTime;
        startCountdown();
        document.getElementById('breakTimerSection').classList.add('breakTimerHidden');
        document.getElementById('workTimerSection').classList.remove('workTimerHidden');
        alert("Time for work!");
      }
      document.getElementById("breakTimer").innerHTML = convertToTime(breakTimerDuration);

}

//subtract minute from break timer
function subtractBreakMinute(){
  if (breakTimerDuration >=60){ // can't go below 0 seconds
  breakTimerDuration -= 60;
  document.getElementById("breakTimer").innerHTML = convertToTime(breakTimerDuration);
  }
}

//add minute to break timer
function addBreakMinute(){
  if (breakTimerDuration < 3540){ //can't go over 60 minutes
  breakTimerDuration += 60;
  document.getElementById("breakTimer").innerHTML = convertToTime(breakTimerDuration);}
}

//productivity time counter gets added to from time taken off work timer. 
var productivityTimeDuration = 0;

//change Work and Break Time Defaults with user input
function changeDefaultWorkTime(){
  defaultWorkTime = document.getElementById("customWorkTime").value * 60;
  timerDuration = defaultWorkTime;
  document.getElementById("timer").innerHTML = convertToTime(timerDuration);
  document.getElementById("defaultWork").innerHTML = "Current Work Time: "+ convertToTime(defaultWorkTime);
  document.getElementById("customWorkTime").value = '';
}

function changeDefaultBreakTime(){
  defaultBreakTime = document.getElementById("customBreakTime").value * 60;
  breakTimerDuration = defaultBreakTime;
  document.getElementById("breakTimer").innerHTML = convertToTime(breakTimerDuration);
  document.getElementById("defaultBreak").innerHTML = "Current Break Time: "+ convertToTime(breakTimerDuration);
  document.getElementById("customBreakTime").value = '';
}

//twitter button to tweet productivity time

function tweetIt () {

  var phrase = "I tracked " + convertToTime(productivityTimeDuration) + " HH:MM:SS of productivity using Mark's Productivity Timer";
  var tweetUrl = 'https://twitter.com/share?text=' +
    encodeURIComponent(phrase) +
    '.' +
    '&url=' +
    'http://codepen.io/markloeser/pen/NRYxGp';
    
  window.open(tweetUrl);
}

//puts start time in the html for the timer when page loads
document.getElementById("timer").innerHTML = convertToTime(timerDuration);

document.getElementById("breakTimer").innerHTML = convertToTime(breakTimerDuration);

document.getElementById("productivityTime").innerHTML = convertToTime(productivityTimeDuration);

document.getElementById("defaultWork").innerHTML = "Current Work Sessions Are Set At: "+ convertToTime(defaultWorkTime);

document.getElementById("defaultBreak").innerHTML = "Current Break Sessions Are Set At: "+ convertToTime(breakTimerDuration);