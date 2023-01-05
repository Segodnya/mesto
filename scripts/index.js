const placeInput = document.querySelector(".popup__input_type_place");
const imageLinkInput = document.querySelector(".popup__input_type_image-link");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddContent = document.querySelector(".popup_type_add-content");
const popupImage = document.querySelector(".popup_type_image");
const formElementEditProfile = document.querySelector(
  "#popup__container_type_edit-profile"
);
const formElementAddContent = document.querySelector(
  "#popup__container_type_add-content"
);
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddContent = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const popupImageElement = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function renderEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

export function openPopupImage(srcValue, titleValue) {
  popupImageElement.src = srcValue;
  popupImageElement.alt = "Фотография " + titleValue;
  popupImageCaption.textContent = titleValue;
  openPopup(popupImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddContentFormSubmit(evt) {
  evt.preventDefault();
  const item = {};
  item.link = imageLinkInput.value;
  item.name = placeInput.value;
  const card = new Card(item, "#content__card-template");
  const cardElement = card.generateCard();
  document.querySelector(".content__list").prepend(cardElement);
  evt.target.reset();
  closePopup(popupAddContent);
}

const closePopupByEsc = (event) => {
  if (event.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
    const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
    if (isNotCombinedKey && currentPopup.classList.contains("popup_opened")) {
      closePopup(currentPopup);
    }
  }
};

import { initialCards, Card } from "./Card.js";
// Для каждой карточки создайте экземпляр класса Card.
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, "#content__card-template");
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector(".content__list").prepend(cardElement);
});

import { FormValidator, validationConfig } from "./FormValidator.js";
// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);
formList.forEach((formElement) => {
  const form = new FormValidator(validationConfig, formElement);
  form.enableValidation();
});

buttonEditProfile.addEventListener(
  "click",
  function () {
    openPopup(popupEditProfile);
    renderEditProfile();
  },
  false
);
buttonAddContent.addEventListener(
  "click",
  function () {
    openPopup(popupAddContent);
    popupAddContent
      .querySelector(".button")
      .classList.add("popup__button_disabled");
    popupAddContent.querySelector(".button").disabled = true;
  },
  false
);

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

formElementEditProfile.addEventListener("submit", handleProfileFormSubmit);
formElementAddContent.addEventListener("submit", handleAddContentFormSubmit);
