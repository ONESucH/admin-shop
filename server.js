'use strict';
const express = require('express'), // сервер
    app = express(), // запуск сервера
    path = require('path'),
    port = 3000; // порт

app.use(express.static(__dirname + '/client'));

app.listen(port, () => { // запуск сервера по порту
    console.log('Сервер запущен: localhost' + port);
});