import { openPopup, closePopup } from "../utils/util.js";

const placeInput = document.querySelector(".popup__input_type_place");
const imageLinkInput = document.querySelector(".popup__input_type_image-link");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddContent = document.querySelector(".popup_type_add-content");
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
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const contentListNode = document.querySelector(".content__list");

function renderEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

const createCard = (item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, "#content__card-template");
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
};

function handleAddContentFormSubmit(evt) {
  evt.preventDefault();
  const item = {};
  item.link = imageLinkInput.value;
  item.name = placeInput.value;
  contentListNode.prepend(createCard(item));
  evt.target.reset();
  closePopup(popupAddContent);
}

import { Card } from "./Card.js";
import { initialCards } from "../utils/constants.js";
// Для каждой карточки создайте экземпляр класса Card.
initialCards.forEach((item) => {
  // Добавляем в DOM
  contentListNode.prepend(createCard(item));
});

import { FormValidator } from "./FormValidator.js";
import { validationConfig } from "../utils/constants.js";
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
    const form = new FormValidator(
      validationConfig,
      popupAddContent.querySelector(".popup__form")
    );
    form.enableValidation();
    form.disableSubmitButton();
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
