// класс Section отвечает за отрисовку элементов на странице
// У класса нет своей разметки.
// Он получает разметку через функцию-колбэк и вставляет её в контейнер.
export class Section {
  // первым параметром конструктора принимает объект
  // с двумя свойствами: items и renderer;
  // items — это массив данных,
  // которые нужно добавить на страницу при инициализации класса;
  // renderer — это функция, которая отвечает
  // за создание и отрисовку данных на странице
  // (за отрисовку каждого отдельного элемента);
  // второй параметр конструктора — селектор контейнера,
  // в который нужно добавлять созданные элементы
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  clear() {
    this._container.innerHTML = "";
  }

  // метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this.clear();
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  // метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
