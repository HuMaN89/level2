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

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 15500); // окно каждые 5 сек

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

  document.querySelector("a").addEventListener("click", (e) => {
    console.log(e);
    e.target.style.backgroundColor = "red";
  });
  // классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 400;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
      <img src=${this.src} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
        ${this.descr}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> тенге/день</div>
      </div>`;
      this.parent.append(element);
    }
  }
  const getResourses = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getResourses("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
  // Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  // function bindPostData(form) {
  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     const statusMessage = document.createElement("div");
  //     statusMessage.classList.add("status");
  //     statusMessage.textContent = message.loading;
  //     form.append(statusMessage);

  //     const request = new XMLHttpRequest();
  //     request.open("POST", "server.php");
  //     // request.setRequestHeader("Content-type", "multipart/form-data");
  //     const formData = new FormData(form);
  //     request.send(formData);
  //     request.addEventListener("load", () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         statusMessage.textContent = message.success;
  //         form.reset();
  //         setTimeout(() => {
  //           statusMessage.textContent = " ";
  //         }, 2000);
  //       } else {
  //         statusMessage.textContent = message.failure;
  //       }
  //     });
  //   });
  // }

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: data,
    });
    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showTanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showTanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showTanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    prevModalDialog.classList.remove("show");
    openModal();
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  //Пример работы с сервером
  // fetch("https://jsonplaceholder.typicode.com/todos/1")
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  //Пример работы с сервером  POST
  // fetch("https://jsonplaceholder.typicode.com/posts", {
  //   method: 'POST',
  //   body: JSON.stringify({name: 'Alex'}),
  //   headers: {
  //     'Content-type': 'aplication/json'
  //   }
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  // fetch("http://localhost:3000/requests")
  //   .then((data) => data.json())
  //   .then((res) => console.log(res));

  // fetch("http://localhost:3000/requests", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     title: "foo",
  //     body: "bar",
  //     userId: 1,
  //   }),
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  // Слайдер

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;

  current.textContent = getZero(slideIndex);
  total.textContent = getZero(slides.length);

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
`;
    if (i === slideIndex - 1) {
      dot.style.opacity = "1";
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener("click", () => {
    if (offset === +width.replace(/\d/g, "") * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.replace(/\d/g, "");
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    current.textContent = getZero(slideIndex);
    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = "1";
  });

  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = +width.replace(/\d/g, "") * (slides.length - 1);
    } else {
      offset -= -width.replace(/\d/g, "");
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    current.textContent = getZero(slideIndex);

    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = "1";
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = +width.replace(/\d/g, "") * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      current.textContent = getZero(slideIndex);
      dots.forEach((dot) => (dot.style.opacity = "0.5"));
      dots[slideIndex - 1].style.opacity = "1";
    });
  });
  // let counter = 0;

  // const hideSlides = () => {
  //   slides.forEach((item) => {
  //     item.classList.add("hide");
  //     item.classList.remove("show");
  //   });
  // };

  // const showSlide = (index) => {
  //   hideSlides();
  //   slides[index].classList.remove("hide");
  //   slides[index].classList.add("show");
  //   current.innerHTML = getZero(index + 1);
  //   counter = index;
  // };
  // showSlide(0);

  // total.innerHTML = getZero(slides.length);

  // next.addEventListener("click", () => {
  //   counter++;
  //   if (counter >= slides.length) {
  //     counter = 0;
  //   }
  //   showSlide(counter);
  // });
  // prev.addEventListener("click", () => {
  //   counter--;
  //   if (counter === -1) {
  //     counter = slides.length - 1;
  //   }
  //   showSlide(counter);
  // });

  //Calculator

  let result = document.querySelector(".calculating__result span"),
    sex,
    age,
    height,
    weight,
    activiti;

  function calcTotal() {
    if (!sex || !age || !height || !weight || !activiti) {
      result.textContent = "_____";
      return;
    }
    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + weight * 9.2 + height * 3.1 - age * 4.3) * activiti
      );
    } else {
      result.textContent = Math.round(
        (88.36 + weight * 13.4 + height * 4.8 - age * 5.7) * activiti
      );
    }
  }
  calcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    document.querySelector(parentSelector).addEventListener("click", (e) => {
      if (e.target.getAttribute("data-active")) {
        activiti = +e.target.getAttribute("data-active");
      } else {
        sex = e.target.getAttribute("id");
      }

      elements.forEach((elem) => {
        elem.classList.remove(activeClass);
      });
      e.target.classList.add(activeClass);
      calcTotal();
    });
  }

  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      switch (input.getAttribute("id")) {
        case "age":
          age = +input.value;
          console.log(age);
          break;

        case "weight":
          weight = +input.value;
          console.log(weight);
          break;

        case "height":
          height = +input.value;
          console.log(height);
          break;
      }
      calcTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
});
