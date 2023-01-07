import { openPopupImage } from "../utils/util.js";

export class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".content__card")
      .cloneNode(true);
    return cardElement;
  }

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

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".content__image").src = this._image;
    this._element.querySelector(".content__image").alt =
      "Фотография " + this._title;
    this._element.querySelector(".content__title").textContent = this._title;

    return this._element;
  }
}
