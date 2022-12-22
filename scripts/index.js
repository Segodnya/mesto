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
  const contentCardImage = contentCardElement.querySelector(".content__image");
  contentCardImage.src = srcValue;
  contentCardImage.alt = "Фотография " + titleValue;
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

  contentCardImage.addEventListener("click", function () {
    openPopupImage(srcValue, titleValue);
  });

  return contentCardElement;
}

function insertCard(contentCardElement) {
  contentListContainer.prepend(contentCardElement);
}

initialCards.forEach((element) => {
  const newCard = renderContentCard(element.link, element.name);
  insertCard(newCard);
});

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
  if (currentPopup.classList.contains("popup_type_add-content")) {
    currentPopup
      .querySelector(".button")
      .classList.add("popup__button_disabled");
  }
  document.addEventListener("keydown", closePopupByEsc);
}

function renderEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function openPopupImage(srcValue, titleValue) {
  popupImageElement.src = srcValue;
  popupImageElement.alt = "Фотография " + titleValue;
  popupImageCaption.textContent = titleValue;
  openPopup(popupImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddContentFormSubmit(evt) {
  evt.preventDefault();
  const card = renderContentCard(imageLinkInput.value, placeInput.value);
  insertCard(card);
  evt.target.reset();
  closePopup(popupAddContent);
}

const closePopupByEsc = (event) => {
  if (event.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
    const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
    if (isNotCombinedKey && currentPopup.classList.contains("popup_opened")) {
      closePopup(currentPopup);
    }
  }
};

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

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

formElementEditProfile.addEventListener("submit", handleProfileFormSubmit);
formElementAddContent.addEventListener("submit", handleAddContentFormSubmit);
