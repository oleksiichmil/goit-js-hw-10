import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import octagonIcon from '../img/bi_x-octagon.svg';

let userSelectedDate;
const startButton = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minutesTimer = document.querySelector('span[data-minutes]');
const secondsTimer = document.querySelector('span[data-seconds]');
startButton.disabled = true;
const input = document.querySelector('input#datetime-picker');
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1,
  },
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startButton.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        iconUrl: octagonIcon,
        iconColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        progressBarColor: '#B51B1B',
      });
      return;
    }
    startButton.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

startButton.addEventListener('click', e => {
  startButton.disabled = true;
  input.disabled = true;
  let intervalId = setInterval(() => {
    let diff = userSelectedDate - Date.now();
    let { days, hours, minutes, seconds } = convertMs(diff);
    daysTimer.innerHTML = addLeadingZero(days);
    hoursTimer.innerHTML = addLeadingZero(hours);
    minutesTimer.innerHTML = addLeadingZero(minutes);
    secondsTimer.innerHTML = addLeadingZero(seconds);
    if (diff < 1000) {
      clearInterval(intervalId);
      input.disabled = false;
    }
  }, 1000);
});

flatpickr('input#datetime-picker', options);
