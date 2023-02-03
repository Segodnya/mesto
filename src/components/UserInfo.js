// класс UserInfo отвечает за управление отображением
// информации о пользователе на странице;
export class UserInfo {
  // Принимает в конструктор объект с селекторами двух элементов:
  // элемента имени пользователя и элемента информации о себе;
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  // публичный метод getUserInfo возвращает объект
  // с данными пользователя. Этот метод пригодится
  // когда данные пользователя нужно будет подставить в форму при открытии;
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  // публичный метод setUserInfo принимает новые данные пользователя
  // и добавляет их на страницу;
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}
