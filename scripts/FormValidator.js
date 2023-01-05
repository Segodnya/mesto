export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Создайте класс FormValidator,
// который настраивает валидацию полей формы:

export class FormValidator {
  // принимает в конструктор объект настроек
  // с селекторами и классами формы;
  // принимает вторым параметром элемент той формы, которая валидируется;
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  // имеет приватные методы, которые обрабатывают форму:
  _hideInputError(_formElement, inputElement, _config) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _showInputError(_formElement, inputElement, errorMessage, _config) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // проверяют валидность поля,
  _checkInputValidity(_formElement, inputElement, _config) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        _formElement,
        inputElement,
        inputElement.validationMessage,
        _config
      );
    } else {
      this._hideInputError(_formElement, inputElement, _config);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // изменяют состояние кнопки сабмита,
  _toggleButtonState(inputList, buttonElement, _config) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // устанавливают все обработчики;
  _setEventListeners(_formElement, _config) {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement, _config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(_formElement, inputElement, _config);
        this._toggleButtonState(inputList, buttonElement, _config);
      });
    });
  }

  // имеет публичный метод enableValidation,
  // который включает валидацию формы.
  enableValidation(_config, _formElement) {
    this._setEventListeners(_formElement, _config);
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  }
}
