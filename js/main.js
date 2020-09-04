"use strict";
const defalutElem = {
  clockContainer: document.querySelector(".clock__wrap"),
  clockTitle: document.querySelector(".clock__title"),
  nameForm: document.querySelector(".name__form"),
  nameInput: document.querySelector(".name__form input"),
  greeting: document.querySelector(".name__value"),
  todoForm: document.querySelector(".todo__form"),
  todoInput:document.querySelector(".todo__form input")
  todoList: document.querySelector(".todo__list"),
};
const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  defalutElem.clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = defalutElem.nameInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  defalutElem.nameForm.classList.add(SHOWING_CN);
  defalutElem.nameForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  defalutElem.nameForm.classList.remove(SHOWING_CN);
  defalutElem.greeting.classList.add(SHOWING_CN);
  defalutElem.greeting.innerText = `안녕하세요. ${text}님`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

addEventListener("load", () => {
  getTime();
  setInterval(getTime, 1000);
  loadName();
});
