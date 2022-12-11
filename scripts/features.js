document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
    const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
    if (isNotCombinedKey && currentPopup.classList.contains("popup_opened")) {
      closePopup(currentPopup);
    }
  }
});

document.addEventListener("click", function (event) {
  const currentPopup = document.querySelector(".popup_opened");
  if (
    event.target.classList.contains("popup") &&
    !event.target.classList.contains("popup__container")
  ) {
    closePopup(currentPopup);
  }
});
