let popupBg = document.querySelector(".popup__bg");
let popup = document.querySelector(".popup__form");
let openPopupButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close-button");

// Показ всплывающего окна при клике
openPopupButton.addEventListener("click", (e) => {
  e.preventDefault();
  popupBg.classList.add("popup__bg_active");
  popup.classList.add("popup__form_active");
});

// Скрытие попап окна при клике на крестик
closePopupButton.addEventListener("click", () => {
  popupBg.classList.remove("popup__bg_active");
  popup.classList.remove("popup__form_active");
});

// Прячем попап окно при клике на фон
document.addEventListener("click", (e) => {
  if (e.target === popupBg) {
    popupBg.classList.remove("popup__bg_active");
    popup.classList.remove("popup__form_active");
  }
});
