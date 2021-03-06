'use strict';
const express = require('express'), // наше приложение с использованием express
    app = express(), // запуск main страницы
    http = require('http').Server(app), // сервер socket.io
    io = require('socket.io')(http), // для socket.io укажем сервер
    port = 3000, // порт
    mongoose = require('mongoose'), // драйвер для подключения к mongodb
    logger = require('morgan'), // отслеживание ошибок
    path = require('path'), // дает возможность бегать по папкам
    bodyParser = require('body-parser'), // парсим в json
    nunjucks = require('nunjucks'), // шаблонизатор - nunjucks
    cookieParser = require('cookie-parser'), // Парсер куки
    registration = require('./server/routers/user-router'); // роутер

/* Подключаем mongodb */
mongoose.connect('mongodb://localhost/admin-shop', (err, db) => {
    
    if (err) throw err;
    
    db.collection('users').find().toArray((err, result) => { // подключаемся к коллекции
        if (err) throw err;
        console.log('mongodb connected in collection success');
    });
    
    console.log('Mongodb working');
});
/* ------------------ */

/* Шаблонизатор - Nunjucks */
nunjucks.configure('./client', { // путь до корня проекта index.html
    autoescape: true,
    express: app,
    watch: true
});
/* ------------ */

/* Парсим в json */
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/* ------------- */

/* Под нужным url подгружаем html с внешними скриптами, стилями */
app.use('/', express.static(__dirname + '/client'));
app.use('/game-table', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/game-table/game-table.html'));
    res.render('html/game-table/game-table.html', {title: 'Игровые новости'});
});
app.use('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/sign-in/sign-in.html'));
    res.render('html/sign-in/sign-in.html', {hash: 'hash'}); // Отправим hash пользователя
});
app.use('/page-1', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-1/page-1.html'));
    res.render('html/page-1/page-1.html', {title: 'Paper'});
});
app.use('/page-2', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-2/page-2.html'));
    res.render('html/page-2/page-2.html', {title: 'Brainshtorm'});
});
app.use('/page-3', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-3/page-3.html'));
    res.render('html/page-3/page-3.html', {title: 'Kube'});
});
app.use('/page-4', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-4/page-4.html'));
    res.render('html/page-4/page-4.html', {title: 'Title-4'});
});
app.use('/page-5', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/page-5/page-5.html'));
    res.render('html/page-5/page-5.html', {title: 'Title-5'});
});
/* ------------------ */

/* Следим за састоянием(роутинг) */
app.use(['/reg'], registration);
/* ------------------ */

/* Socket.IO */
io.on('connection', (socket) => {
    console.log('user connected');
    
    // User disconnect
    socket.on('disconnect', () => console.log('User disconnect'));
    
    // User message
    socket.on('chat message', (nick, msg) => {
        socket.broadcast.emit('user connected');
        io.emit('chat message', nick, msg);
    });
});
/* --------- */

/* error 404 */
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/client/html/404/404.html');
});

/* error 500 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то сломалось!');
});

/* Запуск сервера по порту */
http.listen(port, () => {
    console.log('Сервер запущен localhost:' + port);
});