// добавьте импорт главного файла стилей
import "./index.css";

import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  popupEditProfile,
  popupAddContent,
  popupShowImage,
  buttonEditProfile,
  buttonAddContent,
  nameProfile,
  aboutProfile,
  contentListNode,
  formEditProfile,
  formAddContent,
  validationConfig,
} from "../utils/constants.js";
let userId;

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
function handleSubmitFormEditProfile(data) {
  api
    .editUserInfo(data)
    .then((userData) => {
      currentUser.setUserInfo(userData);
      popupEdit.close();
    })
    .catch((err) => console.log(err));
}

// Форма добавления карточек
function handleSubmitFormAddContent(data) {
  api
    .addCard(data)
    .then((newCard) => {
      cardList.addItem(createCard(newCard));
      popupAdd.close();
    })
    .catch((err) => console.log(err));
}

// Попап редактирования профиля
buttonEditProfile.addEventListener(
  "click",
  () => {
    popupEdit.open();
    popupEdit.setInputsValues(currentUser.getUserInfo());
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

const currentUser = new UserInfo({
  name: nameProfile,
  about: aboutProfile,
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "38c8a8c8-7306-4445-b79c-2958495ffcfd",
    "Content-Type": "application/json",
  },
});

// Добавление карточек из массива с сервера
const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      // Добавляем в DOM
      cardList.addItem(card);
    },
  },
  contentListNode
);

// Получаем карточки с сервера после того,
// как получим данные пользователя
Promise.all([api.getCurrentUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUser.setUserInfo(userData);
    currentUser.id = userData._id;
    cardList.renderItems(cards.reverse());
  })
  .catch((e) => console.log(e));
