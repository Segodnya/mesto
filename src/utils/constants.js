export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupAddContent = document.querySelector(
  ".popup_type_add-content"
);
export const popupShowImage = document.querySelector(".popup_type_image");
export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonAddContent = document.querySelector(".profile__add-button");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_job");
export const nameProfile = document.querySelector(".profile__name");
export const jobProfile = document.querySelector(".profile__job");
export const contentListNode = document.querySelector(".content__list");
export const formEditProfile = document.querySelector(
  ".popup__form_type_edit-profile"
);
export const formAddContent = document.querySelector(
  ".popup__form_type_add-content"
);

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
