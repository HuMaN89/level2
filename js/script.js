"use strict";
window.addEventListener("DOMContentLoaded", () => {
  //Tabs

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  };
  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  };
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer

  const deadline = "2022-02-09";

  function getTimeRemaning(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaning(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  //modal

  // const btn1 = document.querySelector(".btn_white"),
  //   btn2 = document.querySelector(".btn_dark"),
  //   modal = document.querySelector(".modal"),
  //   modalWindow = modal.querySelector(".modal__dialog"),
  //   close = modal.querySelector(".modal__close");

  // function showModal() {
  //   modal.classList.toggle("show");
  // }

  // btn1.addEventListener("click", showModal);
  // btn2.addEventListener("click", showModal);
  // modal.addEventListener("click", showModal);
  // close.addEventListener("click", showModal);
  // modalWindow.addEventListener("click", (e) => {
  //   e.stopPropagation();
  // });

  const openBtns = document.querySelectorAll("[data-modal]"),
    close = document.querySelector("[data-close]"),
    modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }
  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
  openBtns.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  close.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 1500);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
});
