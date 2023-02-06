// добавьте импорт главного файла стилей
import "./index.css";

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
  jobProfile,
  contentListNode,
  formEditProfile,
  formAddContent,
  initialCards,
  validationConfig,
} from "../utils/constants.js";

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
    popupEdit.setInputsValues(userInfo.getUserInfo());
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
