"use strict";

//CALENDAR VARIABLES
const calendarContainer = document.querySelector(".view--calendar");
const listContainer = document.querySelector(".view--list");
const monthEl = document.querySelector("#month");
const yearEl = document.querySelectorAll("#year");
const daysWrapperEl = document.querySelector(".days__wrapper");
const [fullDateSelector, basicDateSelector] = Array.from(
  document.querySelectorAll(".date__selector__container")
);
const viewSwitch = document.querySelector(".switcher__container");

const curDate = new Date();

const renderCalendar = function () {
  curDate.setDate(1);
  const firstDayIndex = curDate.getDay();

  const curLastDay = new Date(
    curDate.getFullYear(),
    curDate.getMonth() + 1,
    0
  ).getDate();
  const lastDayIndex = new Date(
    curDate.getFullYear(),
    curDate.getMonth() + 1,
    0
  ).getDay();
  const previousLastDay = new Date(
    curDate.getFullYear(),
    curDate.getMonth(),
    0
  ).getDate();
  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  monthEl.innerHTML = months[curDate.getMonth()];
  yearEl.forEach((el) => (el.innerHTML = curDate.getFullYear()));

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev__date">${previousLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= curLastDay; i++) {
    if (
      i === new Date().getDate() &&
      curDate.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="current__date">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next__date">${j}</div>`;
    daysWrapperEl.innerHTML = days;
  }
};

fullDateSelector.addEventListener("click", function (event) {
  if (event.target.classList.contains("prev__month"))
    curDate.setMonth(curDate.getMonth() - 1);

  if (event.target.classList.contains("next__month"))
    curDate.setMonth(curDate.getMonth() + 1);

  renderCalendar();
});

daysWrapperEl.addEventListener("click", function (event) {
  Array.from(daysWrapperEl.querySelectorAll("div")).forEach((el) =>
    el.classList.remove("current__date")
  );
  event.target.classList.add("current__date");
});

renderCalendar();

basicDateSelector.addEventListener("click", function (event) {
  if (event.target.classList.contains("prev__year"))
    curDate.setFullYear(curDate.getFullYear() - 1);

  if (event.target.classList.contains("next__year"))
    curDate.setFullYear(curDate.getFullYear() + 1);

  renderCalendar();
});

//SWITCH VIEWS
viewSwitch.addEventListener("click", function () {
  calendarContainer.classList.toggle("hidden");
  listContainer.classList.toggle("hidden");
  Array.from(viewSwitch.querySelectorAll("button")).forEach((el) =>
    el.classList.toggle("active")
  );
  console.log(fullDateSelector, basicDateSelector);
  fullDateSelector.classList.toggle("hidden");
  basicDateSelector.classList.toggle("hidden");
});

//OO PARADIGM VERSION
