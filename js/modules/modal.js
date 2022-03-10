function modal() {
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
}
module.exports = modal;
