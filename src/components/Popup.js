// класс Popup отвечает за открытие и закрытие попапа
export class Popup {
  // принимает в конструктор селектор попапа
  constructor(popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // приватный метод _handleEscClose
  // содержит логику закрытия попапа клавишей Esc
  _handleEscClose(e) {
    if (e.key === "Escape") {
      const isNotCombinedKey = !(e.ctrlKey || e.altKey || e.shiftKey);
      if (isNotCombinedKey && this._popup.classList.contains("popup_opened")) {
        this.close();
      }
    }
  }

  // публичный метод open отвечают за открытие попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // публичный метод close отвечают за закрытие попапа
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // публичный метод setEventListeners
  // добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup__close-button")) {
        this.close();
      }
      // Модальное окно также закрывается при клике
      // на затемнённую область вокруг формы.
      if (e.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}
