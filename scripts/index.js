// import { openPopup, closePopup } from "../utils/util.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from ".//PopupWithImage.js";
import { PopupWithForm } from ".//PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { initialCards, validationConfig } from "../utils/constants.js";

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddContent = document.querySelector(".popup_type_add-content");
const popupShowImage = document.querySelector(".popup_type_image");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddContent = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const contentListNode = document.querySelector(".content__list");
const formEditProfile = document.querySelector(
  ".popup__form_type_edit-profile"
);
const formAddContent = document.querySelector(".popup__form_type_add-content");

// Добавление карточек из массива
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      // Добавляем в DOM
      cardList.addItem(card);
    },
  },
  contentListNode
);
cardList.renderItems();

// Добавление карточек
// Для каждой карточки создайте экземпляр класса Card.
function createCard(data) {
  // Создадим экземпляр карточки
  const card = new Card(data, "#content__card-template", showPopupWithImage);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
}

//Открытие увеличенной картинки
function showPopupWithImage(name, link) {
  popupImage.open(name, link);
}

// Форма редактирования профиля
function renderEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}
function handleSubmitFormEditProfile(data) {
  userInfo.setUserInfo(data);
}

// Форма добавления карточек
function handleSubmitFormAddContent(obj) {
  const card = createCard(obj);
  cardList.addItem(card);
  popupAdd.close();
}

// Попап редактирования профиля
buttonEditProfile.addEventListener(
  "click",
  () => {
    popupEdit.open();
    renderEditProfile();
    validatorFormEditProfile.hideInputErros();
  },
  false
);

// Попап добавления карточек
buttonAddContent.addEventListener(
  "click",
  () => {
    popupAdd.open();
    validatorFormAddContent.disableSubmitButton();
    validatorFormAddContent.hideInputErros();
  },
  false
);

// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
const validatorFormEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
const validatorFormAddContent = new FormValidator(
  validationConfig,
  formAddContent
);

validatorFormEditProfile.enableValidation();
validatorFormAddContent.enableValidation();

// Для каждого попапа создавайте свой экземпляр класса PopupWithForm
const popupImage = new PopupWithImage(popupShowImage);
const popupAdd = new PopupWithForm(popupAddContent, handleSubmitFormAddContent);
const popupEdit = new PopupWithForm(
  popupEditProfile,
  handleSubmitFormEditProfile
);

popupImage.setEventListeners();
popupAdd.setEventListeners();
popupEdit.setEventListeners();

const userInfo = new UserInfo({
  name: nameProfile,
  job: jobProfile,
});
