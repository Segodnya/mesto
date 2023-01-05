import { openPopupImage } from "./index.js";

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

// Создайте класс Card, который создаёт карточку
// с текстом и ссылкой на изображение
export class Card {
  // принимает в конструктор её данные
  // и селектор её template-элемента;
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  // содержит приватные методы, которые работают с разметкой,
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".content__card")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }
  // устанавливают слушателей событий;
  _setEventListeners() {
    this._element
      .querySelector(".content__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._element
      .querySelector(".content__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    this._element
      .querySelector(".content__image")
      .addEventListener("click", () => {
        this._handleCardPopup();
      });
  }
  // содержит приватные методы для каждого обработчика;
  _handleLikeButton() {
    this._element
      .querySelector(".content__like-button")
      .classList.toggle("content__like-button_active");
  }
  _handleDeleteButton() {
    this._element.remove();
  }
  _handleCardPopup() {
    openPopupImage(this._image, this._title);
  }

  // содержит один публичный метод, который возвращает
  // полностью работоспособный и наполненный данными
  // элемент карточки.
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Установим обработчики
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector(".content__image").src = this._image;
    this._element.querySelector(".content__image").alt =
      "Фотография " + this._title;
    this._element.querySelector(".content__title").textContent = this._title;

    // Вернём элемент наружу
    return this._element;
  }
}
