import { months } from "./index.js";

export class UserEvent {
  // id = (Date.now() + "").slice(-10);
  id;
  constructor(
    id,
    name,
    ISOdate,
    startTime,
    endTime,
    description = "Nenhuma informação adicional para este evento"
  ) {
    this.id = id;
    this.name = name;
    this.ISOdate = ISOdate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.description = description;
  }
}

export class User {
  #events = [];
  #eventForm;
  #eventId;
  #eventName;
  #eventISOdate;
  #eventStartTime;
  #eventEndTime;
  #eventDescription;
  #pickedDate;
  #currentEvent;
  constructor(name, doc = "Documento não informado", email, password) {
    //User variables
    this.name = name;
    this.doc = doc;
    this.email = email;
    this.password = password;

    //Event variables
    this.#eventForm = document.querySelector("#form--event");
    this.#eventName = this.#eventForm.querySelector("#event--name");
    this.#eventStartTime = this.#eventForm.querySelector("#event--start--time");
    this.#eventEndTime = this.#eventForm.querySelector("#event--end--time");
    this.#eventDescription = this.#eventForm.querySelector("#event--details");

    //TEST SECTION
    this.#events = [
      new UserEvent(
        "001",
        "Eventão massa",
        new Date(2022, 5, 25).toISOString(),
        "13:00",
        "17:00",
        "Jiraya ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
      ),
      new UserEvent(
        "002",
        "Pepino",
        new Date(2022, 5, 3).toISOString(),
        "15:00",
        "16:00",
        "Naruto ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
      ),
      new UserEvent(
        "003",
        "Testinho",
        new Date(2022, 5, 22).toISOString(),
        "09:00",
        "11:00",
        "Sasuke ipsum dolor, sit amet consectetur adipisicing elit. Nostrum blanditiis quae odio itaque nihil esse nobis temporibus fugiat dignissimos corrupti, ipsam aliquam possimus reprehenderit illo, dolorem magni, natus dolor! Sed?"
      ),
    ];

    //Adding event listeners
  }

  _newEvent(calendar) {
    this.#currentEvent = calendar.currentEvent;
    console.log("clicado");

    const eventId = (Date.now() + "").slice(-10);
    this.#eventISOdate = new Date(
      +document.querySelector("#year").innerHTML,
      months.indexOf(document.querySelector("#month").innerHTML),
      +document
        .querySelector(".days__wrapper")
        .querySelector(".current__date")
        .querySelector(".date").innerHTML
    ).toISOString();
    this.#pickedDate = this.#eventISOdate.slice(0, 10);

    if (
      !this.#eventName.value ||
      !this.#eventStartTime.value ||
      !this.#eventEndTime.value
    )
      return;

    if (!this.#currentEvent) {
      this.#events.push(
        new UserEvent(
          eventId,
          this.#eventName.value,
          this.#eventISOdate,
          this.#eventStartTime.value,
          this.#eventEndTime.value,
          this.#eventDescription.value
        )
      );

      this.#currentEvent = this.#events.find((el) => el.id === eventId);
    }

    if (this.#currentEvent) {
      this.#currentEvent.name = this.#eventName.value;
      this.#currentEvent.startTime = this.#eventStartTime.value;
      this.#currentEvent.endTime = this.#eventEndTime.value;
      this.#currentEvent.description = this.#eventDescription.value;

      this.#currentEvent = this.#events.find((el) => el.id === eventId);
    }

    calendar.renderEvents();
    calendar.renderList();
    calendar.viewEvent(this.#pickedDate);
    this.#eventForm.parentNode.classList.remove("open");

    console.log("Adicionei:", this.#events);
  }

  _editEvent(calendar) {
    this.#currentEvent = calendar.currentEvent
      ? calendar.currentEvent
      : this.#currentEvent;

    this.#eventISOdate = new Date(
      +document.querySelector("#year").innerHTML,
      months.indexOf(document.querySelector("#month").innerHTML),
      +document
        .querySelector(".days__wrapper")
        .querySelector(".current__date")
        .querySelector(".date").innerHTML
    ).toISOString();
    this.#pickedDate = this.#eventISOdate.slice(0, 10);

    this.#eventName.value = this.#currentEvent.name;
    this.#eventStartTime.value = this.#currentEvent.startTime;
    this.#eventEndTime.value = this.#currentEvent.endTime;
    this.#eventDescription.value = this.#currentEvent.description;
    this.#eventForm.parentNode.classList.add("open");

    calendar.renderEvents();
    calendar.renderList();
    calendar.viewEvent(this.#pickedDate);
    console.log("Editei:", this.#events);
  }

  _deleteEvent(calendar) {
    this.#currentEvent = calendar.currentEvent
      ? calendar.currentEvent
      : this.#currentEvent;

    const eventIndex = this.#events.indexOf(this.#currentEvent);
    this.#eventISOdate = new Date(
      +document.querySelector("#year").innerHTML,
      months.indexOf(document.querySelector("#month").innerHTML),
      +document
        .querySelector(".days__wrapper")
        .querySelector(".current__date")
        .querySelector(".date").innerHTML
    ).toISOString();
    this.#pickedDate = this.#eventISOdate.slice(0, 10);

    if (eventIndex > -1) {
      this.#events.splice(eventIndex, 1);
    }

    this.#currentEvent = calendar.currentEvent
      ? calendar.currentEvent
      : this.#currentEvent;

    calendar.renderEvents();
    calendar.renderList();
    calendar.viewEvent(this.#pickedDate);
    console.log("Deletei:", this.#events);
  }

  get events() {
    return this.#events;
  }
}
