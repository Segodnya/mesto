// класс UserInfo отвечает за управление отображением
// информации о пользователе на странице;
export class UserInfo {
  // Принимает в конструктор объект с селекторами двух элементов:
  // элемента имени пользователя и элемента информации о себе;
  constructor({ name, about }) {
    this._name = name;
    this._about = about;
  }

  // публичный метод getUserInfo возвращает объект
  // с данными пользователя. Этот метод пригодится
  // когда данные пользователя нужно будет подставить в форму при открытии;
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  // публичный метод setUserInfo принимает новые данные пользователя
  // и добавляет их на страницу;
  setUserInfo(data) {
    if (data.name) this._name.textContent = data.name;
    if (data.about) this._about.textContent = data.about;
  }
}
