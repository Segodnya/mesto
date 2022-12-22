// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });
};

enableValidation(validationConfig);
