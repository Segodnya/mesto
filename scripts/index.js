const contentCardTemplate = document.querySelector(
  "#content__card-template"
).content;
const contentListContainer = document.querySelector(".content__list");
const placeInput = document.querySelector(".popup__input_type_place");
const imageLinkInput = document.querySelector(".popup__input_type_image-link");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddContent = document.querySelector(".popup_type_add-content");
const popupImage = document.querySelector(".popup_type_image");
const formElementEditProfile = document.querySelector(
  "#popup__container_type_edit-profile"
);
const formElementAddContent = document.querySelector(
  "#popup__container_type_add-content"
);
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddContent = document.querySelector(".profile__add-button");
const buttonClosePopupEditProfile = document.querySelector(
  ".popup__close-button_place_edit-profile"
);
const buttonClosePopupAddContent = document.querySelector(
  ".popup__close-button_place_add-content"
);
const buttonClosePopupImage = document.querySelector(
  ".popup__close-button_place_image"
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const popupImageElement = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");

function renderContentCard(srcValue, titleValue) {
  const contentCardElement = contentCardTemplate
    .querySelector(".content__card")
    .cloneNode(true);
  contentCardElement.querySelector(".content__image").src = srcValue;
  contentCardElement.querySelector(".content__image").alt =
    "Фотография " + titleValue;
  contentCardElement.querySelector(".content__title").textContent = titleValue;

  contentCardElement
    .querySelector(".content__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("content__like-button_active");
    });

  contentCardElement
    .querySelector(".content__delete-button")
    .addEventListener("click", function () {
      contentCardElement.remove();
    });

  contentCardElement
    .querySelector(".content__image")
    .addEventListener("click", function () {
      openPopupImage(contentCardElement);
    });

  return contentCardElement;
}

function insertCard(contentCardElement) {
  contentListContainer.insertAdjacentElement("afterbegin", contentCardElement);
}

initialCards.forEach((element) => {
  const newCard = renderContentCard(element.link, element.name);
  insertCard(newCard);
});

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
}

function renderEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
}

function openPopupImage(contentCardElement) {
  popupImageElement.src =
    contentCardElement.querySelector(".content__image").src;
  popupImageElement.alt =
    contentCardElement.querySelector(".content__image").alt;
  popupImageCaption.textContent =
    contentCardElement.querySelector(".content__title").textContent;
  popupImage.classList.add("popup_opened");
}

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function formAddContentSubmitHandler(evt) {
  evt.preventDefault();
  const card = renderContentCard(imageLinkInput.value, placeInput.value);
  insertCard(card);
  closePopup(popupAddContent);
}

buttonEditProfile.addEventListener(
  "click",
  function () {
    openPopup(popupEditProfile);
    renderEditProfile();
  },
  false
);
buttonAddContent.addEventListener(
  "click",
  function () {
    openPopup(popupAddContent);
  },
  false
);
buttonClosePopupEditProfile.addEventListener(
  "click",
  function () {
    closePopup(popupEditProfile);
  },
  false
);
buttonClosePopupAddContent.addEventListener(
  "click",
  function () {
    closePopup(popupAddContent);
  },
  false
);
buttonClosePopupImage.addEventListener(
  "click",
  function () {
    closePopup(popupImage);
  },
  false
);
formElementEditProfile.addEventListener("submit", formEditProfileSubmitHandler);
formElementAddContent.addEventListener("submit", formAddContentSubmitHandler);
