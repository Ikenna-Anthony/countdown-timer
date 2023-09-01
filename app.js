const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const item = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// set time and date for giveaway deadline
//let futureDate = new Date(2023, 8, 11, 11, 30, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);


//print time and date to html
const year = futureDate.getFullYear();
const hour = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

let month = futureDate.getMonth();
month = months[month];
//OR
//const month = months[futureDate.getMonth()];

const day = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${day}, ${date} ${month} ${year}, ${hour}:${minutes}am`;

//set coutdown timer
// first get future time in millisecs
const futureTime = futureDate.getTime();

//secondly get the remaining date by subracting present date from future date in millisecs
function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60mins
  // 1d = 24hr

  //values in milisecs
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  //calculate all values
  let days = t / oneDay;
  days = Math.floor(days)
  
  let hours = Math.floor((t % oneDay) / oneHour);
  
  let mins = Math.floor((t % oneHour) / oneMin);

  let secs = Math.floor((t % oneMin) / 1000);
  

  // set values arrays
  const value = [days, hours, mins, secs];

  // function that displays double number if less than 10
  function format (items) {
    if(items < 10){
      return (items = `0${items}`);
    }
    return items;
  }

  item.forEach(function (items, index) {
    items.innerHTML = format(value[index]);
  });
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}

//set countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();