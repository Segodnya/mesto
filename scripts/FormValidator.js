export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );
  }

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

  _hasInvalidInput(_inputList) {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(_inputList, _buttonElement, _config) {
    if (this._hasInvalidInput(_inputList)) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners(_formElement, _config) {
    this._toggleButtonState(this._inputList, this._buttonElement, _config);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(_formElement, inputElement, _config);
        this._toggleButtonState(this._inputList, this._buttonElement, _config);
      });
    });
  }

  disableSubmitButton(_buttonElement, _formElement) {
    this._buttonElement.classList.add("popup__button_disabled");
    this._buttonElement.disabled = true;
  }

  enableValidation(_config, _formElement) {
    this._setEventListeners(_formElement, _config);
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
