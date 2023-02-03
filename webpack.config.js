// подключаем path к конфигу вебпак
const path = require("path");
// подключили плагинs
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports — это синтаксис экспорта в Node.js
module.exports = {
  // добавили режим разработчика
  mode: "development",
  // указали первое место, куда заглянет webpack, — файл index.js в папке src
  entry: { main: path.resolve(__dirname, "src", "pages", "index.js") },
  // указали в какой файл будет собираться весь js и дали ему имя
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    clean: true,
  },
  // настройки локального сервера
  devServer: {
    // путь, куда "смотрит" режим разработчика
    static: path.resolve(__dirname, "./dist"),
    // это ускорит загрузку в режиме разработки
    compress: true,
    // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    port: 8080,
    // сайт будет открываться сам при запуске npm run dev
    open: true,
    hot: true,
    watchFiles: ["*/**/*.html"],
  },
  module: {
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // добавьте объект options
            // Если вы используете директиву @import в css-файлах
            options: { importLoaders: 1 },
          },
          // Добавьте postcss-loader
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // путь к файлу index.html
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(), // использовали плагин
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
};
