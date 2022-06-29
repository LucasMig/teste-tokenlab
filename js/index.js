"use strict";

//MODULES
import { User } from "./user.js";

//GLOBAL VARIABLES
const signingPage = document.querySelector(".main--loginRegister");
const mainAppPage = document.querySelector(".mainapp__container");

//SIGNING PAGE
const btnRegister = document
  .querySelector("#form--register")
  .querySelector(".btn--submit");
const btnLogin = document
  .querySelector("#form--login")
  .querySelector(".btn--submit");
const linkLogin = document.querySelector("#form--login").querySelector(".link");
const linkRegister = document
  .querySelector("#form--register")
  .querySelector(".link");

//MAINAPP PAGE
export const months = [
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
const viewSwitch = document.querySelector(".switcher__container");
const dateSelector = document.querySelector(".date__selector__container");
const btnLogout = document.querySelector(".link--leave");

//EVENT BUTTONS
const btnCloseModal = document
  .querySelector("#form--event")
  .querySelector(".btn--cancel");
// const btnSaveEvent = document.querySelector("#teste--lucas");
const btnSaveEvent = document
  .querySelector("#form--event")
  .querySelector(".btn--submit");
const btnEditEvent = document.querySelector(".btn--edit");
const btnDeleteEvent = document.querySelector(".btn--delete");

//OO PARADIGM VERSION

class Calendar {
  #monthEl;
  #yearEl;
  #daysWrapperEl;
  #curDate;
  #eventListContainer;
  #eventDays;
  currentEvent;
  #latestEvent;
  #user;
  constructor(User) {
    //Assigning variables
    this.#user = User;
    this.#monthEl = document.querySelector("#month");
    this.#yearEl = document.querySelector("#year");
    this.#daysWrapperEl = document.querySelector(".days__wrapper");
    this.#curDate = new Date();
    this.#eventListContainer = document.querySelector(".event__list");
    this.#latestEvent = this.#user.events[-1];

    //Calling methods to build page
    this.renderCalendar();
    this.renderEvents();
    this.renderList();

    //Adding event listeners
    dateSelector.addEventListener("click", this._switchDate.bind(this));
    this.#daysWrapperEl.addEventListener(
      "click",
      this._pickDateFromCalendar.bind(this)
    );
    this.#eventListContainer.addEventListener(
      "click",
      this._pickDateFromList.bind(this)
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
    this.#yearEl.innerHTML = this.#curDate.getFullYear();

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
    this.#eventDays = this.#user.events.map((event) =>
      event.ISOdate.slice(0, 10)
    );
    const dayDivs = Array.from(this.#daysWrapperEl.querySelectorAll(".date"));
    const eventDivs = Array.from(
      this.#daysWrapperEl.querySelectorAll(".event--tag__container")
    );

    const monthDays = dayDivs.map((el) => {
      if (el.parentElement.classList.contains("prev__date"))
        return new Date(
          +this.#yearEl.innerHTML,
          months.indexOf(this.#monthEl.innerHTML) - 1,
          el.innerHTML
        )
          .toISOString()
          .slice(0, 10);
      if (el.parentElement.classList.contains("next__date"))
        return new Date(
          +this.#yearEl.innerHTML,
          months.indexOf(this.#monthEl.innerHTML) + 1,
          el.innerHTML
        )
          .toISOString()
          .slice(0, 10);

      return new Date(
        +this.#yearEl.innerHTML,
        months.indexOf(this.#monthEl.innerHTML),
        el.innerHTML
      )
        .toISOString()
        .slice(0, 10);
    });

    eventDivs.forEach((day) => {
      day.innerHTML = "";
    });

    monthDays.forEach((day, i) => {
      if (this.#eventDays.includes(day)) {
        const eventEl = this.#user.events.find((el) => {
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

    const prevRenderedList =
      eventListContainer.querySelectorAll(".event__wrapper");

    if (prevRenderedList)
      prevRenderedList.forEach((el) => eventListContainer.removeChild(el));

    const sortedEvents = this.#user.events.sort((aEl, bEl) => {
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
          <p class="event__date event__date--day">Dia <span>${eventDate.getDate()}</span></p>
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

  _switchDate(event) {
    if (event.target.classList.contains("prev__month"))
      this.#curDate.setMonth(this.#curDate.getMonth() - 1);

    if (event.target.classList.contains("next__month"))
      this.#curDate.setMonth(this.#curDate.getMonth() + 1);

    this.renderCalendar();
    this.renderEvents();
  }

  _pickDateFromCalendar(event) {
    const clickedDate = event?.target
      ?.closest(".date__container")
      ?.querySelector(".date")?.innerHTML
      ? new Date(
          +this.#yearEl.innerHTML,
          months.indexOf(this.#monthEl.innerHTML),
          event.target
            .closest(".date__container")
            .querySelector(".date").innerHTML
        )
          .toISOString()
          .slice(0, 10)
      : null;

    if (!clickedDate) btnAddEvent.classList.add("inactive");
    if (clickedDate) btnAddEvent.classList.remove("inactive");

    this.currentEvent = this.#eventDays.some((el) => el === clickedDate)
      ? this.#user.events.find(
          (eventEl) => eventEl.ISOdate.slice(0, 10) === clickedDate
        )
      : undefined;

    Array.from(this.#daysWrapperEl.querySelectorAll(".date")).forEach((el) =>
      el.closest(".date__container").classList.remove("current__date")
    );
    event?.target?.closest(".date__container")?.classList.add("current__date");

    this.viewEvent(clickedDate);
    console.log(clickedDate);
  }

  _pickDateFromList(event) {
    const clickedEvent = new Date(
      +this.#yearEl.innerHTML,
      months.indexOf(
        event.target.closest(".event").querySelector(".event__date--month")
          .innerHTML
      ),
      +event.target.closest(".event__wrapper").querySelector("span").innerHTML
    )
      .toISOString()
      .slice(0, 10);

    this.currentEvent = this.#eventDays.some((el) => el === clickedEvent)
      ? this.#user.events.find(
          (eventEl) => eventEl.ISOdate.slice(0, 10) === clickedEvent
        )
      : undefined;

    Array.from(this.#eventListContainer.querySelectorAll(".event")).forEach(
      (el) => el.classList.remove("current__date")
    );
    event.target.closest(".event").classList.add("current__date");

    this.viewEvent(clickedEvent);
  }

  viewEvent(datePicked) {
    if (!datePicked) return;

    const eventInfoContainer = document.querySelector(
      ".event__info__container"
    );

    const prevPickedEvent = eventInfoContainer.querySelector(".event__info");

    if (prevPickedEvent) eventInfoContainer.removeChild(prevPickedEvent);

    if (this.#eventDays.some((el) => el === datePicked)) {
      const eventPicked = this.#user.events.find(
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
        </div>
      `;

      eventInfoContainer
        .querySelector(".btn__container--horizontal")
        .classList.remove("hidden");

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

      eventInfoContainer
        .querySelector(".btn__container--horizontal")
        .classList.add("hidden");

      eventInfoContainer.insertAdjacentHTML("afterbegin", html);
    }
  }
}

class App {
  // #accounts = []
  #accounts = [
    new User(
      "Lucas Migliori",
      "48964901851",
      "lucasmigliori@gmail.com",
      "lucasmig"
    ),
    new User("Priscila Amorim", "44753602850", "pri@gmail.com", "lucasmig"),
    new User(
      "Marcos Migliori",
      "19847020841",
      "marcosmigliori@gmail.com",
      "lucasmig"
    ),
  ];
  #currentUser;
  #calendar;
  #eventFormContainer;
  #username;
  constructor() {
    //Assigning variables
    this.#username = document.querySelector("#username");
    this.#eventFormContainer = document.querySelector(
      ".event__form__container"
    );

    //Login and register pages event listeners for methods
    btnRegister.addEventListener("click", this._createAccount.bind(this));
    btnLogin.addEventListener("click", this._logIn.bind(this));
    linkRegister.addEventListener("click", this._switchForm.bind(this));
    linkLogin.addEventListener("click", this._switchForm.bind(this));

    //Main app page event listeners for methods
    viewSwitch.addEventListener("click", this._switchView.bind(this));
    btnAddEvent.addEventListener("click", this._showForm.bind(this));
    btnCloseModal.addEventListener("click", this._hideForm.bind(this));
    btnLogout.addEventListener("click", this._logOut.bind(this));
  }

  _switchForm() {
    document.querySelector("#form--register").classList.toggle("hidden");
    document.querySelector("#form--login").classList.toggle("hidden");
  }

  _createAccount(event) {
    event.preventDefault();

    const inputName = document
      .querySelector("#form--register")
      .querySelector("#name");
    const inputDoc = document
      .querySelector("#form--register")
      .querySelector("#doc");
    const inputEmail = document
      .querySelector("#form--register")
      .querySelector("#new--email");
    const inputPassword = document
      .querySelector("#form--register")
      .querySelector("#new--password");
    let account;

    if (!inputName.value || !inputEmail.value || !inputPassword.value) {
      alert("Confira as informações preenchidas");
    } else {
      account = new User(
        inputName.value,
        inputDoc.value,
        inputEmail.value,
        inputPassword.value
      );
      this.#accounts.push(account);
      // this._setLocalStorage;

      alert("Cadastro criado com sucesso!");

      inputName.value =
        inputDoc.value =
        inputEmail.value =
        inputPassword.value =
          "";

      document.querySelector("#form--register").classList.toggle("hidden");
      document.querySelector("#form--login").classList.toggle("hidden");
    }
  }

  _logIn(event) {
    event.preventDefault();

    const inputEmail = document
      .querySelector("#form--login")
      .querySelector("#login--email");
    const inputPassword = document
      .querySelector("#form--login")
      .querySelector("#login--password");

    const currentAcc = this.#accounts.find(
      (user) => user.email === inputEmail.value
    );

    if (!currentAcc)
      return alert(
        "Cadastro não localizado. Por favor, confira seu e-mail ou crie um novo cadastro."
      );
    if (currentAcc.password !== inputPassword.value)
      return alert("Encontramos seu cadastro, porém sua senha está incorreta!");
    else {
      inputEmail.value = inputPassword.value = "";
      this._goToApp(currentAcc);
    }
  }

  _goToApp(account) {
    signingPage.classList.add("hidden");
    this.#currentUser = account;
    this._renderMainApp();
  }

  _renderMainApp() {
    mainAppPage.classList.remove("hidden");

    this._greetUser();
    this.#calendar = new Calendar(this.#currentUser);

    btnSaveEvent.addEventListener(
      "click",
      this.#currentUser._newEvent.bind(this.#currentUser, this.#calendar)
    );
    btnEditEvent.addEventListener(
      "click",
      this.#currentUser._editEvent.bind(this.#currentUser, this.#calendar)
    );
    btnDeleteEvent.addEventListener(
      "click",
      this.#currentUser._deleteEvent.bind(this.#currentUser, this.#calendar)
    );
  }

  _greetUser() {
    this.#username.innerHTML = this.#currentUser.name.split(" ")[0];
  }

  _switchView() {
    const listContainer = document.querySelector(".view--list");
    const calendarContainer = document.querySelector(".view--calendar");

    calendarContainer.classList.toggle("hidden");
    listContainer.classList.toggle("hidden");
    Array.from(viewSwitch.querySelectorAll("button")).forEach((el) =>
      el.classList.toggle("active")
    );
    dateSelector.classList.toggle("invisible");
    btnAddEvent.classList.toggle("inactive");
  }

  _showForm() {
    this.#eventFormContainer.classList.add("open");

    Array.from(
      document.querySelector("#form--event").querySelectorAll("input")
    ).forEach((inp) => (inp.value = ""));
  }

  _hideForm() {
    this.#eventFormContainer.classList.remove("open");
  }

  _logOut(event) {
    event.preventDefault();
    mainAppPage.classList.add("hidden");
    signingPage.classList.remove("hidden");
    this.#currentUser = undefined;
  }
}

const app = new App();
