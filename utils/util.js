const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

export function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

export function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

export function openPopupImage(srcValue, titleValue) {
  popupImageElement.src = srcValue;
  popupImageElement.alt = "Фотография " + titleValue;
  popupImageCaption.textContent = titleValue;
  openPopup(popupImage);
}

export const closePopupByEsc = (event) => {
  if (event.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
    const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
    if (isNotCombinedKey && currentPopup.classList.contains("popup_opened")) {
      closePopup(currentPopup);
    }
  }
};
