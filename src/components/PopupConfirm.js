import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  open(card) {
    this._card = card;
    super.open();
  }

  // перезаписывает родительский метод setEventListeners.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      // Отмена стандартной формы отправки
      evt.preventDefault();
      this._handleSubmit(this._card);
    });
  }

  /* close() {
    super.close();
  } */
}
