function slider() {
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
}
module.exports = slider;
