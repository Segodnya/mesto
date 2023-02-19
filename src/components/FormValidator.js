// класс FormValidator настраивает валидацию полей формы
export class FormValidator {
  // принимает в конструктор объект настроек
  // с селекторами и классами формы;
  // принимает вторым параметром элемент той формы, которая валидируется;
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  // устанавливают все обработчики;
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._errorElement = this._formElement.querySelector(
          `.${inputElement.name}-input-error`
        );
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Скрыть ошибки при открытии модального окна
  hideInputErros() {
    this._toggleButtonState(this._buttonElement);
    this._inputList.forEach((input) => {
      this._errorElement = this._formElement.querySelector(
        `.${input.name}-input-error`
      );
      this._hideInputError(input);
    });
  }

  // проверяют валидность поля,
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  // имеет приватные методы, которые обрабатывают форму:
  _hideInputError(inputElement) {
    if (!this._errorElement) return;
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // изменяют состояние кнопки сабмита,
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // имеет публичный метод enableValidation,
  // который включает валидацию формы.
  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
