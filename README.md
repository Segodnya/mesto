# Проект: Место

Mesto: интерактивный сервис, куда можно добавлять фотографии, удалять их и ставить лайки.

### Обзор

- Github Pages
- Figma-макет
- Технологии
- Функциональность
- TODO

**Github Pages**

Проект опубликован на [Github Pages](https://segodnya.github.io/mesto/)

**Figma-макет**

[Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

**Технологии**

- Адаптивная (mobile-first) вёрстка по макету.
- BEM (Nested) файловая структура.
- [Оптимизация](https://tinypng.com/) изображений, чтобы сайт загружался быстрее.

**Функциональность**

- [Реализация](https://webdevtips.pro/js/pure-js-popup/) pop-up диалогового окна "Редактировать профиль" с сохранением введенной пользователем информации до перезагрузки страницы на чистом JS;
- Рендер карточек при загрузке страницы из массива;
- Форма добавления карточки - по нажатию на кнопку "Сохранить" добавленная карточка оказывается в начале списка;
- Возможность ставить карточкам отметки "Нравится";
- Удаление карточек по выбору пользователя по кнопке;
- Поп-ап для просмотра полноразмерных изображений;
- [Плавная анимация](https://stackoverflow.com/a/50546888/16375377) открытия и закрытия модальных окон;
- Закрытие поп-апов кликом на оверлей или нажатием клавиши Esc;
- Валидация форм «Редактировать профиль» и «Новое место»;
- Создан класс Card, который создаёт карточку с текстом и ссылкой на изображение;
- Создать класс FormValidator, который настраивает валидацию полей формы.
- В .gitignore добавлены папки node_modules и dist;

**TODO**

- Создайте класс Section, который отвечает за отрисовку элементов на странице;
- Section первым параметром конструктора принимает объект с двумя свойствами: items и renderer;
- Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса;
- Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице;
- Второй параметр конструктора Section — селектор контейнера, в который нужно добавлять созданные элементы;
- Section содержит публичный метод, который отвечает за отрисовку всех элементов;
- Отрисовка каждого отдельного элемента должна осуществляться функцией renderer;
- Section содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер;
- У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.

- Создайте класс Popup, который отвечает за открытие и закрытие попапа;
- Popup принимает в конструктор единственный параметр — селектор попапа;
- cодержит публичные методы open и close, которые отвечают за открытие и закрытие попапа;
- Содержит приватный метод \_handleEscClose, который содержит логику закрытия попапа клавишей Esc;
- Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа;
- Модальное окно также закрывается при клике на затемнённую область вокруг формы.

- Создайте класс PopupWithImage, который наследует от Popup;
- класс должен перезаписывать родительский метод open;
- В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.

- Создайте класс PopupWithForm, который наследует от Popup;
- Кроме селектора попапа принимает в конструктор колбэк сабмита формы;
- Содержит приватный метод \_getInputValues, который собирает данные всех полей формы;
- Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы;
- Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
- Для каждого попапа создавайте свой экземпляр класса PopupWithForm;

- Создайте класс UserInfo, который отвечает за управление отображением информации о пользователе на странице;
- Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе;
- Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии;
- Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу;

- Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.

- Настройте сборку Вебпаком
- Инициализируйте npm в проекте.
- Установите webpack, webpack-cli и webpack-dev-server.
- Настройте две сборки: build и dev. Создайте соответствующие скрипты в package.json.
- Скрипт build должен пересоздавать папку dist с собранным проектом.
- Скрипт dev запускать проект на локальном сервере.
- Настройте минификацию и транспиляцию JS бабелем.
- Из index.html уберите теги script с подключением скриптов. Вебпак должен собирать весь JavaScript в один файл и автоматически добавлять в HTML тег script со ссылкой на него.
- Настройте обработку CSS: в HTML больше не должно быть тега link со ссылкой на CSS-файл. За обработку и подключение CSS должен отвечать Webpack.
- Настройте минификацию CSS и автоматическое добавление вендорных префиксов.
- Настройте обработку изображений и шрифтов.
- Настройте обработку HTML: если в HTML есть ссылки на локальные картинки, при сборке всё должно работать.
- HTML, CSS и JS-файлы должны быть в папке src.
