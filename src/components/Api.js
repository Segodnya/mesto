// Для работы с API создайте класс Api.
// Все запросы должны быть методами этого класса.
export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Err: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  async getCurrentUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  // Загрузка карточек с сервера
  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  // Редактирование профиля
  async editUserInfo(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    console.log(res);
    return this._handleResponse(res);
  }

  // Добавление новой карточки
  async addCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._handleResponse(res);
  }

  // Обновление аватара пользователя:
  async updateUserAvatar(avatarUrl) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
    return this._handleResponse(res);
  }
}
