// добавьте импорт главного файла стилей
import "./index.css";

import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  popupEditProfile,
  popupAddContent,
  popupShowImage,
  popupUpdateAvatar,
  popupDelContent,
  buttonEditProfile,
  buttonAddContent,
  buttonUpdateAvatar,
  nameProfile,
  aboutProfile,
  avatarProfile,
  contentListNode,
  formEditProfile,
  formAddContent,
  formUpdateAvatar,
  validationConfig,
} from "../utils/constants.js";
let userId;

// Добавление карточек
// Для каждой карточки создайте экземпляр класса Card.
function createCard(data) {
  // Создадим экземпляр карточки
  const card = new Card(
    data,
    "#content__card-template",
    showPopupWithImage,
    userId,
    async () => {
      try {
        const res = await api.addLike(data._id);
        card.like();
        card.setLikesCount(res);
      } catch (e) {
        console.warn(e);
      }
    },
    async () => {
      try {
        const res = await api.removeLike(data._id);
        card.dislike();
        card.setLikesCount(res);
      } catch (e) {
        console.warn(e);
      }
    },
    () => {
      popupConfirm.open(card);
    }
  );
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

//Открытие увеличенной картинки
function showPopupWithImage(name, link) {
  popupImage.open(name, link);
}

// Форма редактирования профиля
function handleSubmitFormEditProfile(data) {
  const btnOrigText =
    popupEditProfile.querySelector(".popup__button").textContent;
  popupEditProfile.querySelector(".popup__button").textContent =
    "Сохранение...";
  api
    .editUserInfo(data)
    .then((userData) => {
      currentUser.setUserInfo(userData);
      popupEdit.close();
    })
    .catch((err) => console.log(err));
  popupEditProfile.querySelector(".popup__button").textContent = btnOrigText;
}

// Форма обновления аватара
function handleSubmitFormUpdateAvatar(data) {
  const btnOrigText =
    popupUpdateAvatar.querySelector(".popup__button").textContent;
  popupUpdateAvatar.querySelector(".popup__button").textContent =
    "Сохранение...";
  api
    .updateUserAvatar(data)
    .then((userData) => {
      currentUser.setUserInfo(userData);
      avatarProfile.src = userData.avatar;
      popupAvatar.close();
    })
    .catch((err) => console.log(err));
  popupUpdateAvatar.querySelector(".popup__button").textContent = btnOrigText;
}

// Форма добавления карточек
function handleSubmitFormAddContent(data) {
  const btnOrigText =
    popupAddContent.querySelector(".popup__button").textContent;
  popupAddContent.querySelector(".popup__button").textContent = "Сохранение...";
  api
    .addCard(data)
    .then((newCard) => {
      cardList.addItem(createCard(newCard));
      popupAdd.close();
    })
    .catch((err) => console.log(err));
  popupAddContent.querySelector(".popup__button").textContent = btnOrigText;
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
buttonUpdateAvatar.addEventListener(
  "click",
  () => {
    popupAvatar.open();
    validatorFormUpdateAvatar.hideInputErros();
  },
  false
);

// Попап добавления карточек
buttonAddContent.addEventListener(
  "click",
  () => {
    popupAdd.open();
    validatorFormAddContent.hideInputErros();
  },
  false
);

// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
const validatorFormEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
validatorFormEditProfile.enableValidation();
const validatorFormAddContent = new FormValidator(
  validationConfig,
  formAddContent
);
validatorFormAddContent.enableValidation();
const validatorFormUpdateAvatar = new FormValidator(
  validationConfig,
  formUpdateAvatar
);
validatorFormUpdateAvatar.enableValidation();

// Для каждого попапа создавайте свой экземпляр класса PopupWithForm
const popupImage = new PopupWithImage(popupShowImage);
const popupAdd = new PopupWithForm(popupAddContent, handleSubmitFormAddContent);
const popupEdit = new PopupWithForm(
  popupEditProfile,
  handleSubmitFormEditProfile
);
const popupAvatar = new PopupWithForm(
  popupUpdateAvatar,
  handleSubmitFormUpdateAvatar
);
const popupConfirm = new PopupConfirm(popupDelContent, async (card) => {
  const btnOrigText =
    popupDelContent.querySelector(".popup__button").textContent;
  popupDelContent.querySelector(".popup__button").textContent = "Сохранение...";
  api
    .deleteCard(card._id)
    .then(() => {
      card.remove();
      popupConfirm.close();
    })
    .catch((err) => console.log(err));
  popupDelContent.querySelector(".popup__button").textContent = btnOrigText;
});

popupConfirm.setEventListeners();
popupImage.setEventListeners();
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupAvatar.setEventListeners();

const currentUser = new UserInfo({
  name: nameProfile,
  about: aboutProfile,
  avatar: avatarProfile,
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
    userId = userData._id;
    avatarProfile.src = userData.avatar;
    cardList.renderItems(cards.reverse());
  })
  .catch((e) => console.log(e));
