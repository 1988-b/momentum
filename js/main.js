"use strict";
const defalutElem = {
  clockContainer: document.querySelector(".clock__wrap"),
  clockTitle: document.querySelector(".clock__title"),
};

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  defalutElem.clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

addEventListener("load", () => {
  getTime();
  setInterval(getTime, 1000);
});
