import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__caption");
  }

  // класс перезаписывает родительский метод open
  // в методе open нужно вставлять в попап
  // картинку с src изображения и подписью к картинке.
  open(name, link) {
    this._image.src = link;
    this._image.alt = "Фотография " + name;
    this._title.textContent = name;
    super.open();
  }
}
