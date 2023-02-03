# Проект: Место

Mesto: интерактивный сервис, куда можно добавлять фотографии, удалять их и ставить лайки.

### Обзор

- Github Pages
- Figma-макет
- Технологии
- Функциональность
- Настройка сборки (Webpack)
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
- Изменена файловая структура проекта в соответствии с требования сборки Webpack-ом;

**Настройка сборки (Webpack)**

1. Создать packaje.json (после этого - дополнить свойство author):

- npm init -y

2. Обновить NPM до последней версии:

- sudo npm upgrade -g npm

3. Переключение между репозиториями:

- npm set registry https://npm.prakticum-team.ru
- npm set registry https://registry.npmjs.org/

4. Установить Webpack:

- npm i webpack --save-dev
- npm i webpack-cli --save-dev

5. Установить локальный сервер:

- npm i webpack-dev-server --save-dev

6. Новый синтаксис при сборке превращают в старый (транспиляция):

- npm i @babel/core --save-dev
- npm i @babel/preset-env --save-dev

7. Иногда «переделка» синтаксиса не помогает. Это можно обойти — загрузить недостающую функциональность в браузер пользователя вместе с нашим проектом. Такие самодельные аналоги новой функциональности называются полифилы.

- npm i core-js --save

8. Установить пакет, который позволяет подключить Babel к Webpack:

- npm i babel-loader --save-dev

9. Подключение HTML:

- npm i html-webpack-plugin --save-dev

10. Нам нужен плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist:

- npm i clean-webpack-plugin --save-dev

11. Работа с изображениями:
    11.1. JS:

- import jordanImage from './images/jordan.jpg';
- const jordanImage = new URL('./images/jordan.jpg', import.meta.url);

  11.2. HTML:

- <img src="<%=require('./images/logo.png')%>" alt="Логотип">

  11.3. CSS:

- можно оставить относительные пути.

12. Обработка CSS:

- npm i css-loader --save-dev
- npm i mini-css-extract-plugin --save-dev

13. Минификация CSS и добавление префиксов:

Первый пакет postcss-loader нужен, чтобы подключить PostCSS к «Вебпаку». Плагин autoprefixer научит PostCSS добавлять вендорные префиксы, а cssnano займётся минификацией css-кода.

- npm i postcss-loader --save-dev
- npm i autoprefixer --save-dev
- npm i cssnano --save-dev

Собрать проект одной из команд:

- npm run build
- npm run dev

Остановка работы локального сервера - Ctrl + C в терминале.

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
