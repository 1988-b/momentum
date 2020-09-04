"use strict";
const defalutElem = {
  clockContainer: document.querySelector(".clock__wrap"),
  clockTitle: document.querySelector(".clock__title"),
  nameForm: document.querySelector(".name__form"),
  nameInput: document.querySelector(".name__form input"),
  greeting: document.querySelector(".name__value"),
  todoForm: document.querySelector(".todo__form"),
  todoInput: document.querySelector(".todo__form input"),
  todoList: document.querySelector(".todo__list"),
  background: document.querySelector(".bg__wrap"),
};

//시간을 나타내는 함수
function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  defalutElem.clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

//이름을 설정하는 함수

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

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
  localStorage.clear();
  defalutElem.nameForm.classList.add(SHOWING_CN);
  defalutElem.todoForm.classList.remove(SHOWING_CN);
  defalutElem.nameForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  defalutElem.nameForm.classList.remove(SHOWING_CN);
  defalutElem.greeting.classList.add(SHOWING_CN);
  defalutElem.todoForm.classList.add(SHOWING_CN);
  defalutElem.greeting.innerText = `${text}님, 오늘도 힘내세요!`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

//TODOLIST 함수

const TODOS_LS = "toDos";

let todoArray = [];

function deleteTodo(e) {
  e.preventDefault();
  const btn = e.target;
  const li = btn.parentNode;
  defalutElem.todoList.removeChild(li);
  const cleanTodos = todoArray.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  todoArray = cleanTodos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todoArray));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("i");
  delBtn.setAttribute("class", "fas fa-times");
  delBtn.addEventListener("click", deleteTodo);
  const span = document.createElement("span");
  span.innerText = text;
  const newId = todoArray.length + 1;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  defalutElem.todoList.appendChild(li);
  const todoObj = {
    text: text,
    id: newId,
  };
  todoArray.push(todoObj);
  saveToDos();
}

function handleTodoSubmit(e) {
  e.preventDefault();
  const currentValue = defalutElem.todoInput.value;
  paintToDo(currentValue);
  defalutElem.todoInput.value = "";
}

function something(todoArray) {
  console.log(todoArray);
}

function loadTodo() {
  const currentList = localStorage.getItem(TODOS_LS);
  if (currentList !== null) {
    const parsedTodos = JSON.parse(currentList);
    parsedTodos.forEach(function (todoArray) {
      paintToDo(todoArray.text);
    });
  }
  defalutElem.todoForm.addEventListener("submit", handleTodoSubmit);
}

//background

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
  const imgs = `/imgs/${imgNumber + 1}.jpg`;
  defalutElem.background.style.backgroundImage = `url('${imgs}')`;
  defalutElem.background.style.height = `${innerHeight}px`;
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  paintImage(number);
}

addEventListener("load", () => {
  getTime();
  setInterval(getTime, 1000);
  loadName();
  loadTodo();
  genRandom();
});
