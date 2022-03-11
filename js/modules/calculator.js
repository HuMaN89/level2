function calculator() {
  //Calculator

  let result = document.querySelector(".calculating__result span"),
    sex,
    age,
    height,
    weight,
    activiti;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    localStorage.setItem("sex", "female");
    sex = "female";
  }

  if (localStorage.getItem("activiti")) {
    activiti = localStorage.getItem("activiti");
  } else {
    localStorage.setItem("activiti", 1.375);
    activiti = 1.375;
  }

  function setLocalData(parentSelector, activeClass) {
    const elements = document.querySelectorAll(parentSelector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }
      if (
        elem.getAttribute("data-active") === localStorage.getItem("activiti")
      ) {
        elem.classList.add(activeClass);
      }
    });
    calcTotal();
  }

  setLocalData("#gender div", "calculating__choose-item_active");
  setLocalData(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

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

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-active")) {
          activiti = +e.target.getAttribute("data-active");
          localStorage.setItem("activiti", activiti);
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", sex);
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
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
      if (input.value.match(/\D/g)) {
        //проверка ввода регулярным выражением
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "age":
          age = +input.value;
          break;

        case "weight":
          weight = +input.value;
          break;

        case "height":
          height = +input.value;
          break;
      }
      calcTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}
export default calculator;
