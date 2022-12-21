// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(validationObject.inputErrorClass);
  errorElement.classList.remove(validationObject.errorClass);
  errorElement.textContent = "";
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(validationObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObject.errorClass);
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationObject.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (validationObject) => {
  const formList = Array.from(
    document.querySelectorAll(validationObject.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });
};

enableValidation(validationObject);
