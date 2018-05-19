'use strict';
const express = require('express'), // сервер
    app = express(), // запуск main страницы
    port = 3000, // порт
    logger = require('morgan'),
    path = require('path'),
    mongoose = require('mongoose'); // драйвер для подключения к mongodb

/* Подключаем mongodb */
mongoose.connect('mongodb://localhost:27017/admin-shop', (err, db) => {
    
    if (err) throw err;

    db.collection('users-data').find().toArray((err, result) => {
        if (err) throw err;
        console.log('mongodb connected in collection success');
    });
    console.log('Mongodb working');
});
/* ------------------ */

/* Роутинги для html */
app.use('/', express.static(__dirname + '/client'));

app.use('/page-1', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-1/page-1.html'));
});
app.use('/page-2', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-2/page-2.html'));
});
app.use('/page-3', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-3/page-3.html'));
});
app.use('/page-4', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-4/page-4.html'));
});
app.use('/page-5', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-5/page-5.html'));
});
/* ------------------ */

/* 404 */
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/client/html/404/404.html');
});

/* 500 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то сломалось!');
});

/* Запуск сервера по порту */
app.listen(port, () => {
    console.log('Сервер запущен localhost:' + port);
});