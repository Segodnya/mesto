import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = this._popupForm.querySelectorAll(".popup__input");
  }

  // приватный метод _getInputValues собирает данные всех полей формы
  _getInputValues() {
    this._inputValues = {};
    this._inputsList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  // Возвращение input
  setInputsValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // перезаписывает родительский метод setEventListeners.
  // Метод setEventListeners класса PopupWithForm не только добавляет обработчик клика иконке закрытия,
  // но и добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      // Отмена стандартной формы отправки
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  // Перезаписывает родительский метод close,
  // так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._popupForm.reset();
  }
}
