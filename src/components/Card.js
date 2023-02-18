// класс Card создаёт карточку
// с текстом и ссылкой на изображение
export class Card {
  // принимает в конструктор её данные
  // и селектор её template-элемента;
  constructor(
    data,
    templateSelector,
    handleCardClick,
    userId,
    like,
    dislike,
    deleteCard
  ) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    // класс Card cвязан с попапом.
    // Card принимает в конструктор функцию handleCardClick.
    // Эта функция открывает попап с картинкой при клике на карточку.
    this._handleCardClick = handleCardClick;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._like = like;
    this._dislike = dislike;
    this._deleteCard = deleteCard;
  }

  // содержит приватные методы, которые работают с разметкой,
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".content__card")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  // устанавливают слушателей событий;
  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      if (this._likeBtn.classList.contains("content__like-button_active")) {
        this._dislike();
      } else {
        this._like();
      }
    });
    this._deleteBtn.addEventListener("click", () => {
      this._deleteCard(this._id);
    });
    this._imgElement.addEventListener("click", () => {
      this._handleCardClick(this._title, this._image);
    });
  }

  // Проверим, есть ли лайк текущего пользователя у карточки
  _isLiked() {
    this._likes.forEach((user) => {
      user._id === this._userId ? this.like() : this.dislike();
    });
  }

  like() {
    this._likeBtn.classList.add("content__like-button_active");
  }

  dislike() {
    this._likeBtn.classList.remove("content__like-button_active");
  }

  setLikesCount(res) {
    this._likesQty.textContent = `${res.likes.length}`;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  // содержит один публичный метод, который возвращает
  // полностью работоспособный и наполненный данными
  // элемент карточки.
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".content__like-button");
    // Устанавливаем кол-во лайков
    this._likesQty = this._element.querySelector(".content__like-count");
    this._likesQty.textContent = this._likes.length;
    this._deleteBtn = this._element.querySelector(".content__delete-button");
    if (this._ownerId !== this._userId) {
      this._deleteBtn.remove();
    }
    // Добавим данные
    this._imgElement = this._element.querySelector(".content__image");
    this._imgElement.src = this._image;
    this._imgElement.alt = "Фотография " + this._title;
    this._element.querySelector(".content__title").textContent = this._title;
    // Установим обработчики
    this._setEventListeners();
    this._isLiked();
    // Вернём элемент наружу
    return this._element;
  }
}
