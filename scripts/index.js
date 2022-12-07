const contentListContainer = document.querySelector(".content__list");
let popup = document.querySelector(".popup");
let popupEditProfile = document.querySelector(".popup_type_edit-profile");
let popupAddContent = document.querySelector(".popup_type_add-content");
let formElementEditProfile = document.querySelector(
  "#popup__container_type_edit-profile"
);
let formElementAddContent = document.querySelector(
  "#popup__contanter_type_add-content"
);
let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonAddContent = document.querySelector(".profile__add-button");
let buttonClosePopupEditProfile = document.querySelector(
  ".popup__close-button_place_edit-profile"
);
let buttonClosePopupAddContent = document.querySelector(
  ".popup__close-button_place_add-content"
);
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let placeInput = document.querySelector(".popup__input_type_place");
let imageLinkInput = document.querySelector(".popup__input_type_image-link");
let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__job");
let buttonsLike = document.querySelectorAll(".content__like-button");
let buttonsDeleteContent = document.querySelectorAll(".content__delete-button");
let images = document.querySelectorAll(".content__image");

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

function renderContentCards(srcValue, titleValue) {
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

  contentListContainer.append(contentCardElement);
}

initialCards.forEach((element) => {
  renderContentCards(element.link, element.name);
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

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

function formAddContentSubmitHandler(evt) {
  evt.preventDefault();
  const contentLink = document.querySelector(".popup__input_type_image-link");
  const contentPlace = document.querySelector("popup__input_type_place");

  renderContentCards(contentLink.value, contentPlace.value);

  contentLink.value = "";
  contentPlace.value = "";
  closePopup();
}

buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddContent.addEventListener("click", openPopupAddContent);
buttonClosePopupEditProfile.addEventListener("click", function () {
  popupEditProfile.classList.remove("popup_opened");
});
buttonClosePopupAddContent.addEventListener("click", function () {
  popupAddContent.classList.remove("popup_opened");
});
formElementEditProfile.addEventListener("submit", formEditProfileSubmitHandler);
formElementAddContent.addEventListener("submit", formAddContentSubmitHandler);

buttonsLike.forEach((button) => {
  button.addEventListener("click", function () {
    button.classList.toggle("content__like-button_active");
  });
});
buttonsDeleteContent.forEach((button) => {
  button.addEventListener("click", function () {
    console.log("Delete Content Function");
  });
});
images.forEach((image) => {
  image.addEventListener("click", function () {
    console.log("Show Image");
  });
});
