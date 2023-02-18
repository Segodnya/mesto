import { Popup } from "./Popup.js";

export class PopupWithDeleteBtn extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  // перезаписывает родительский метод setEventListeners.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      // Отмена стандартной формы отправки
      e.preventDefault();
      console.log("click");
      this.close();
    });
  }

  close() {
    super.close();
  }
}
