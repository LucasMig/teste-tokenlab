"use strict";

//GLOBAL VARIABLES
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
const viewSwitch = document.querySelector(".switcher__container");
const [fullDateSelector, basicDateSelector] = Array.from(
  document.querySelectorAll(".date__selector__container")
);

//OO PARADIGM VERSION

class User {
  constructor(name, doc, email, password) {
    this.name = name;
    (this.doc = doc), (this.email = email);
    this.password = password;
  }

  _getLocalStorage() {}

  _setLocalStorage() {}

  _newEvent() {}
}

class UserEvent {
  constructor(name, ISOdate, startTime, endTime, description) {
    this.name = name;
    this.ISOdate = ISOdate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.description = description;
  }

  _editEvent() {}

  _deleteEvent() {}
}

class Calendar {
  #monthEl;
  #yearEl;
  #daysWrapperEl;
  #curDate;
  constructor() {
    //Assigning variables
    this.#monthEl = document.querySelector("#month");
    this.#yearEl = document.querySelectorAll("#year");
    this.#daysWrapperEl = document.querySelector(".days__wrapper");
    this.#curDate = new Date();
    this._renderCalendar();

    //Adding event listeners
    fullDateSelector.addEventListener("click", this._switchFullDate.bind(this));
    this.#daysWrapperEl.addEventListener("click", this._pickDate.bind(this));
    basicDateSelector.addEventListener(
      "click",
      this._switchBasicDate.bind(this)
    );
  }

  _renderCalendar() {
    this.#curDate.setDate(1);
    const firstDayIndex = this.#curDate.getDay();

    const curLastDay = new Date(
      this.#curDate.getFullYear(),
      this.#curDate.getMonth() + 1,
      0
    ).getDate();

    const lastDayIndex = new Date(
      this.#curDate.getFullYear(),
      this.#curDate.getMonth() + 1,
      0
    ).getDay();

    const previousLastDay = new Date(
      this.#curDate.getFullYear(),
      this.#curDate.getMonth(),
      0
    ).getDate();

    const nextDays = 7 - lastDayIndex - 1;

    this.#monthEl.innerHTML = months[this.#curDate.getMonth()];
    this.#yearEl.forEach((el) => (el.innerHTML = this.#curDate.getFullYear()));

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev__date">${previousLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= curLastDay; i++) {
      if (
        i === new Date().getDate() &&
        this.#curDate.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="current__date">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next__date">${j}</div>`;
      this.#daysWrapperEl.innerHTML = days;
    }
  }

  _switchFullDate(event) {
    if (event.target.classList.contains("prev__month"))
      this.#curDate.setMonth(this.#curDate.getMonth() - 1);

    if (event.target.classList.contains("next__month"))
      this.#curDate.setMonth(this.#curDate.getMonth() + 1);

    this._renderCalendar();
  }

  _pickDate(event) {
    Array.from(this.#daysWrapperEl.querySelectorAll("div")).forEach((el) =>
      el.classList.remove("current__date")
    );
    event.target.classList.add("current__date");
  }

  _switchBasicDate(event) {
    if (event.target.classList.contains("prev__year"))
      this.#curDate.setFullYear(this.#curDate.getFullYear() - 1);

    if (event.target.classList.contains("next__year"))
      this.#curDate.setFullYear(this.#curDate.getFullYear() + 1);

    this._renderCalendar();
  }
}

class App {
  #accounts;
  #calendar;
  #events;
  constructor() {
    this.#calendar = new Calendar();
    //Get local storage
    // this._getLocalStorage();
    //Add event listeners for methods

    viewSwitch.addEventListener("click", this._switchView.bind(this));
  }

  _renderCalendar() {}

  _renderList() {}

  _switchView() {
    const listContainer = document.querySelector(".view--list");
    const calendarContainer = document.querySelector(".view--calendar");

    calendarContainer.classList.toggle("hidden");
    listContainer.classList.toggle("hidden");
    Array.from(viewSwitch.querySelectorAll("button")).forEach((el) =>
      el.classList.toggle("active")
    );
    fullDateSelector.classList.toggle("hidden");
    basicDateSelector.classList.toggle("hidden");
  }

  _showForm() {}

  _hideForm() {}

  _viewEvent() {}

  _renderEventList() {}
}

const testEvent = new UserEvent(
  "Eventão massa",
  new Date().toISOString(),
  "13:00",
  "17:00",
  "Jiraya ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
);

const viewEvent = function (Event) {
  const eventInfoContainer = document.querySelector(".event__info__container");
  const html = `
    <div class="event__info">
      <h3 class="heading heading--event__info">
        ${Event.name}
      </h3>
      <p class="info__title">
        Início:
        <span class="info">${Event.startTime}</span>
      </p>
      <p class="info__title">
        Término:
        <span class="info">${Event.endTime}</span>
      </p>
      <p class="info__title">
        Detalhes:<br />
        <span class="info">${Event.description}</span>
      </p>
    </div>
  `;

  eventInfoContainer.insertAdjacentHTML("afterbegin", html);
};

viewEvent(testEvent);

const app = new App();
