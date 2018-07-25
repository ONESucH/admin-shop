'use strict';

let socket = io(),
    findUser = {};

$(document).ready(() => {
    // Проверяем пользователя на регистрацию
    $.ajax({
        url: 'reg',
        success: (req) => {
            req.forEach((item, i, arr) => {
                if (item._id === localStorage.getItem('id')) {
                    $.extend(findUser, arr[i]);
                }
            });

            if (localStorage.getItem('id') !== findUser._id) window.location.href = '/';
        }
    });
});

/* Чат игроков */
$('form').submit((e) => {
    e.preventDefault();
    
    let message = String($('#user-message').val().split(/<script>/)); // Чистим спец. символы
    console.log('message', message);
    
    if (message === '') return false;

    socket.emit('chat guess', findUser.nick, message);
    
    // Если много объектов удалем, чтобы не грузить ПК
    if ($('.message-user').length > 20) {
        $('.message-user')[20].remove();
    }
    
    $('#user-message').val('');
});

/* Рендерим чат в игре guess */
socket.on('chat guess', (nick, msg) => {
    $('.all-message-user').prepend(
        '<div class="message-user">'+
        '   <p class="d-inline-block w-100">'+
        '   <img class="rounded-circle user d-inline-block w-auto m-2" src="../../img/user-undefined.jpg"><span>'+nick+'&#8195;</span>'+msg+'</p>'+
        '</div>'
    );
});