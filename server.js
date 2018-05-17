'use strict';
const express = require('express'), // сервер
    app = express(), // запуск сервера
    port = 3000, // порт
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

/* Используя созданный роутинг передаём данные */
/*app.get('/page-1', (req, res) => {

});

app.get('/page-2', (req, res) => {

});*/
/* ------------------ */

/* Роутинги для html */
app.use('/', express.static(__dirname + '/client'));
app.use('/page-1', express.static(__dirname + '/client/html/page-1/page-1.html'));
app.use('/page-2', express.static(__dirname + '/client/html/page-2/page-2.html'));
app.use('/page-3', express.static(__dirname + '/client/html/page-2/page-3.html'));
app.use('/page-4', express.static(__dirname + '/client/html/page-2/page-4.html'));
app.use('/page-5', express.static(__dirname + '/client/html/page-2/page-5.html'));
/* ------------------ */

app.listen(port, () => { // запуск сервера по порту
    console.log('Сервер запущен localhost:' + port);
});