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

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function renderContentCard(srcValue, titleValue) {
  const contentCardTemplate = document.querySelector(
    "#content__card-template"
  ).content;
  const contentCardElement = contentCardTemplate
    .querySelector(".content__card")
    .cloneNode(true);
  contentCardElement.querySelector(".content__image").src = srcValue;
  contentCardElement.querySelector(".content__title").textContent = titleValue;

  contentCardElement
    .querySelector(".content__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("content__like-button_active");
    });

  contentCardElement
    .querySelector(".content__delete-button")
    .addEventListener("click", deleteContentCard);

  const image = contentCardElement.querySelector(".content__image");
  image.addEventListener("click", function () {
    openPopupImage(image);
  });

  if (imageLinkInput.value === "" && placeInput.value === "") {
    contentListContainer.append(contentCardElement);
  } else {
    contentListContainer.insertAdjacentElement(
      "afterbegin",
      contentCardElement
    );
  }
}

initialCards.forEach((element) => {
  renderContentCard(element.link, element.name);
});

function deleteContentCard(event) {
  var button = event.target;
  button.parentNode.parentNode.removeChild(button.parentNode);
}

function openPopupEditProfile() {
  popupEditProfile.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openPopupAddContent() {
  popupAddContent.classList.add("popup_opened");
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
}

function openPopupImage(image) {
  const currentImage = image.src;
  const currentCaption =
    image.parentNode.querySelector(".content__title").textContent;
  popupImageElement.src = currentImage;
  popupImageCaption.textContent = currentCaption;
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
  console.log(imageLinkInput);
  console.log(placeInput);
  renderContentCard(imageLinkInput.value, placeInput.value);
  closePopup(popupAddContent);
}

buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddContent.addEventListener("click", openPopupAddContent);
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
