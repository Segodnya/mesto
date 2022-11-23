let popupBg = document.querySelector(".popup__bg");
let formElement = document.querySelector(".popup__container");
let openPopupButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close-button");
let nameInput = document.querySelectorAll(".popup__input")[0];
let jobInput = document.querySelectorAll(".popup__input")[1];
let submitButton = document.querySelector(".popup__button");

// Показ всплывающего окна при клике
openPopupButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupBg.classList.add("popup__bg_active");
  formElement.classList.add("popup__container_opened");
});

// Скрытие попап окна при клике на крестик
closePopupButton.addEventListener("click", () => {
  popupBg.classList.remove("popup__bg_active");
  formElement.classList.remove("popup__container_opened");
});

// Скрытие попап окна при клике на "Сохранить"
submitButton.addEventListener("click", () => {
  popupBg.classList.remove("popup__bg_active");
  formElement.classList.remove("popup__container_opened");
});

// Прячем попап окно при клике на фон
document.addEventListener("click", (e) => {
  if (e.target === popupBg) {
    popupBg.classList.remove("popup__bg_active");
    formElement.classList.remove("popup__container_opened");
  }
});

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  let profileName = nameInput.value;
  let profileJob = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let nameProfile = document.querySelector(".profile__name");
  let jobProfile = document.querySelector(".profile__job");
  // Вставьте новые значения с помощью textContent
  nameProfile.textContent = profileName;
  jobProfile.textContent = profileJob;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
