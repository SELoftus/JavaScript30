let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  //clear existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;//now in milliseconds, now in seconds
  displayTimeLeft(seconds);
  displayEndTime(then);

  //display amount of time left
  countdown = setInterval(() => {
    //figure out how much time left
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if we should stop timer
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    //display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display; //changes page title to display time left
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour //converts from military time
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer () {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault(); //stops it from refreshing & clearing data
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins *60);
  this.reset(); //clear out submit form value
})
