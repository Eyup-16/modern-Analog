const hourEl = document.querySelector('.hours');
const minuteEl = document.querySelector('.minutes');
const secondsEl = document.querySelector('.seconds');
const timeEl = document.querySelector('.time');
const date = document.querySelector('.date');
const year = document.querySelector('.year');
const toggle = document.querySelector('.toggle');
const html = document.querySelector('html');

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Augest',
  'September',
  'October',
  'November',
  'December',
];

// Dark/Light Modes
toggle.addEventListener('click', (e) => {
  html.classList.toggle('dark');
  if (html.classList.contains('dark')) {
    e.target.innerText = 'Light Mode';
  } else {
    e.target.innerText = 'Dark Mode';
  }
});

// Set Time

let previousSeconds = 0;
let secondsRotation = 0;
function SetTime() {
  const time = new Date();
  const month = time.getMonth();
  const dayOfMonth = time.getDate();
  const dayOfweek = time.getDay();
  const hours = time.getHours();
  const hoursForClock = hours % 12 || 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const years = time.getFullYear();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  if (previousSeconds === 59 && seconds === 0) {
    secondsEl.style.transition = `transform .005s ease-in-out`;
  } else {
    secondsEl.style.transition = `transform .5s ease-in-out`;
  }

  //   rotate calculations
  let hoursRotaion = scale(hoursForClock, 0, 12, 0, 360);
  let minutesRotaion = scale(minutes, 0, 59, 0, 360);

  //   It Doesn't Works!

  //   if (seconds === 0 && previousSeconds === 59) {
  //     // Increment the rotation by 360° if it's a full minute
  //     secondsRotation += 360;
  //   } else {
  //     secondsRotation =
  //       scale(seconds, 0, 59, 0, 360) + Math.floor(secondsRotation / 360) * 360;
  //   }
  //   previousSeconds = seconds;

  secondsRotation = scale(seconds, 0, 59, 0, 360);

  hourEl.style.transform = `translate(-50%, -100%) rotate(${hoursRotaion}deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${minutesRotaion}deg)`;
  secondsEl.style.transform = `translate(-50%, -100%) rotate(${secondsRotation}deg)`;

  timeEl.innerHTML = `${hoursForClock}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`;
  date.innerHTML = `${days[dayOfweek]}, ${months[month].slice(
    0,
    3
  )} <span class='day'>${dayOfMonth}</span>`;
  year.innerHTML = `${years}`;
}

const scale = (number, inMin, inMax, outMin, outMax) => {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

SetTime();

setInterval(SetTime, 1000);
