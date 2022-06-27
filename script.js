"use strict";

//GLOBAL VARIABLES
const accounts = [];
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
const btnAddEvent = document.querySelector(".btn--add");
const btnCloseModal = document.querySelector(".btn--cancel");
const viewSwitch = document.querySelector(".switcher__container");
const [fullDateSelector, basicDateSelector] = Array.from(
  document.querySelectorAll(".date__selector__container")
);

//OO PARADIGM VERSION

class LoginRegister {
  constructor() {}

  _switchForm() {}

  _createAccount() {
    //push new user to accounts array
    //redirect to login form
  }

  _logIn() {
    //find user in accounts array
    //check if password matches
    //go to app
  }

  _goToApp() {
    //build app with user's info
  }
}

class UserEvent {
  id = (Date.now() + "").slice(-10);
  constructor(
    name,
    ISOdate,
    startTime,
    endTime,
    description = "Nenhuma informação adicional para este evento"
  ) {
    this.name = name;
    this.ISOdate = ISOdate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.description = description;
  }
}

// const testEvent = [
//   new UserEvent(
//     "Eventão massa",
//     new Date().toISOString(),
//     "13:00",
//     "17:00",
//     "Jiraya ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
//   ),
//   new UserEvent(
//     "Pepino",
//     new Date(2022, 5, 3).toISOString(),
//     "15:00",
//     "16:00",
//     "Naruto ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
//   ),
//   new UserEvent(
//     "Testinho",
//     new Date(2022, 5, 22).toISOString(),
//     "09:00",
//     "11:00",
//     "Sasuke ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
//   ),
// ];

class User {
  #events = [];
  constructor(name, doc, email, password) {
    //Assigning variables
    this.name = name;
    this.doc = doc;
    this.email = email;
    this.password = password;

    //TEST SECTION
    this.#events = [
      new UserEvent(
        "Eventão massa",
        new Date().toISOString(),
        "13:00",
        "17:00",
        "Jiraya ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
      ),
      new UserEvent(
        "Pepino",
        new Date(2022, 5, 3).toISOString(),
        "15:00",
        "16:00",
        "Naruto ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
      ),
      new UserEvent(
        "Testinho",
        new Date(2022, 5, 22).toISOString(),
        "09:00",
        "11:00",
        "Sasuke ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
      ),
    ];

    //Adding event listeners
  }

  _getLocalStorage() {}

  _setLocalStorage() {}

  _newEvent() {
    this.#events.push(new UserEvent());
  }

  _editEvent() {}

  _deleteEvent() {}

  get events() {
    return this.#events;
  }
}

const lucas = new User(
  "Lucas Migliori",
  "48964901851",
  "lucasmigliori@gmail.com",
  "lucasmig"
);

class Calendar {
  #monthEl;
  #yearEl;
  #daysWrapperEl;
  #curDate;
  #eventDays;
  constructor() {
    //Assigning variables
    this.#monthEl = document.querySelector("#month");
    this.#yearEl = document.querySelectorAll("#year");
    this.#daysWrapperEl = document.querySelector(".days__wrapper");
    this.#curDate = new Date();
    this.#eventDays = lucas.events.map((event) => event.ISOdate.slice(0, 10));
    this.renderCalendar();
    this.renderEvents();
    this.renderList();

    //Adding event listeners
    fullDateSelector.addEventListener("click", this._switchFullDate.bind(this));
    this.#daysWrapperEl.addEventListener("click", this._pickDate.bind(this));
    basicDateSelector.addEventListener(
      "click",
      this._switchBasicDate.bind(this)
    );
  }

  renderCalendar() {
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
      days += `<div class="date__container prev__date"><div class="date">${
        previousLastDay - x + 1
      }</div></div>`;
    }

    for (let i = 1; i <= curLastDay; i++) {
      if (
        i === new Date().getDate() &&
        this.#curDate.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="date__container current__date"><div class="date">${i}</div><div class="event--tag__container"></div></div>`;
      } else {
        days += `<div class="date__container"><div class="date">${i}</div><div class="event--tag__container"></div></div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="date__container next__date"><div class="date">${j}</div><div class="event--tag__container"></div></div>`;
      this.#daysWrapperEl.innerHTML = days;
    }
  }

  renderEvents() {
    const dayDivs = Array.from(this.#daysWrapperEl.querySelectorAll(".date"));
    const monthDays = dayDivs.map((el) => {
      if (el.classList.contains("prev__date"))
        return new Date(
          +this.#yearEl[0].innerHTML,
          months.indexOf(this.#monthEl.innerHTML) - 1,
          el.innerHTML
        )
          .toISOString()
          .slice(0, 10);
      if (el.classList.contains("next__date"))
        return new Date(
          +this.#yearEl[0].innerHTML,
          months.indexOf(this.#monthEl.innerHTML) + 1,
          el.innerHTML
        )
          .toISOString()
          .slice(0, 10);

      return new Date(
        +this.#yearEl[0].innerHTML,
        months.indexOf(this.#monthEl.innerHTML),
        el.innerHTML
      )
        .toISOString()
        .slice(0, 10);
    });

    monthDays.forEach((day, i) => {
      if (this.#eventDays.includes(day)) {
        const eventEl = lucas.events.find((el) => {
          return el.ISOdate.slice(0, 10) === day;
        });

        const eventHTML = `
          <p class="event--tag">${eventEl.name}</p>
        `;
        dayDivs[i].parentElement
          .querySelector(".event--tag__container")
          .insertAdjacentHTML("beforeend", eventHTML);
      }
    });
  }

  renderList() {
    const eventListContainer = document.querySelector(".event__list");
    const sortedEvents = lucas.events.sort((aEl, bEl) => {
      return new Date(bEl.ISOdate) - new Date(aEl.ISOdate);
    });

    sortedEvents.forEach((el) => {
      const eventDate = new Date(el.ISOdate);
      const html = `
      <li class="event__wrapper">
        <div class="event">
          <p class="event__date event__date--month">${
            months[eventDate.getMonth()]
          }</p>
          <p class="event__date event__date--day">Dia ${eventDate.getDate()}</p>
          <p class="event__name">${el.name}</p>
          <div class="event__time">
            <span class="event--start">${el.startTime}</span>-
            <span class="event--end">${el.endTime}</span>
          </div>
        </div>
      </li>
      `;
      eventListContainer.insertAdjacentHTML("afterbegin", html);
    });
  }

  _switchFullDate(event) {
    if (event.target.classList.contains("prev__month"))
      this.#curDate.setMonth(this.#curDate.getMonth() - 1);

    if (event.target.classList.contains("next__month"))
      this.#curDate.setMonth(this.#curDate.getMonth() + 1);

    this.renderCalendar();
    this.renderEvents();
  }

  _pickDate(event) {
    const clickedDate = event?.target
      ?.closest(".date__container")
      ?.querySelector(".date")?.innerHTML
      ? new Date(
          +this.#yearEl[0].innerHTML,
          months.indexOf(this.#monthEl.innerHTML),
          event.target
            .closest(".date__container")
            .querySelector(".date").innerHTML
        )
          .toISOString()
          .slice(0, 10)
      : null;

    Array.from(this.#daysWrapperEl.querySelectorAll(".date")).forEach((el) =>
      el.closest(".date__container").classList.remove("current__date")
    );
    event?.target?.closest(".date__container")?.classList.add("current__date");

    this._viewEvent(clickedDate);
  }

  _switchBasicDate(event) {
    if (event.target.classList.contains("prev__year"))
      this.#curDate.setFullYear(this.#curDate.getFullYear() - 1);

    if (event.target.classList.contains("next__year"))
      this.#curDate.setFullYear(this.#curDate.getFullYear() + 1);

    this.renderCalendar();
    this.renderEvents();
    this.renderList();
  }

  _viewEvent(datePicked) {
    if (!datePicked) return;

    const eventInfoContainer = document.querySelector(
      ".event__info__container"
    );

    const prevPickedEvent = eventInfoContainer.querySelector(".event__info");

    if (prevPickedEvent) eventInfoContainer.removeChild(prevPickedEvent);

    if (this.#eventDays.some((el) => el === datePicked)) {
      const eventPicked = lucas.events.find(
        (eventEl) => eventEl.ISOdate.slice(0, 10) === datePicked
      );

      const html = `
        <div class="event__info">
          <h3 class="heading heading--event__info">
            ${eventPicked.name}
          </h3>
          <p class="info__title">
            Início:
            <span class="info">${eventPicked.startTime}</span>
          </p>
          <p class="info__title">
            Término:
            <span class="info">${eventPicked.endTime}</span>
          </p>
          <p class="info__title">
            Detalhes:<br />
            <span class="info">${eventPicked.description}</span>
          </p>
          <div class="btn__container--horizontal">
            <button class="btn btn--delete">Excluir</button>
            <button class="btn btn--edit">Editar</button>
          </div>
        </div>
      `;

      eventInfoContainer.insertAdjacentHTML("afterbegin", html);
    } else {
      const html = `
        <div class="event__info">
          <h3 class="heading heading--event__info">
            Nenhum evento pra essa data!
          </h3>
          <p class="info__title">
            Detalhes:<br />
            <span class="info">Você está com o dia livre. Pra adicionar um evento para essa data, é só clicar no botão verde ali em cima! :)</span>
          </p>
        </div>
      `;

      eventInfoContainer.insertAdjacentHTML("afterbegin", html);
    }
  }
}

class App {
  #account;
  #calendar;
  #eventFormContainer;
  constructor() {
    //Assigning variables
    this.#eventFormContainer = document.querySelector(
      ".event__form__container"
    );
    this.#calendar = new Calendar();

    //Get local storage
    // this._getLocalStorage();

    //Add event listeners for methods
    viewSwitch.addEventListener("click", this._switchView.bind(this));
    btnAddEvent.addEventListener("click", this._showForm.bind(this));
    btnCloseModal.addEventListener("click", this._hideForm.bind(this));
  }

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

  _showForm() {
    this.#eventFormContainer.classList.add("open");
  }

  _hideForm() {
    this.#eventFormContainer.classList.remove("open");
  }
}

const app = new App();
