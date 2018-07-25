'use strict';
let socket = io(),
    findUser = {},
    chat = false;

$(document).ready(() => {
    
    $('.chat').hide(); // hide chat

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

/* Toogle chat */
function chatShowHide() {
    chat = !chat;

    if (chat) {
        $('.chat').fadeIn('slow', function () {
            $(this).show();
        });
    } else {
        $('.chat').fadeOut('slow', function () {
            $(this).hide();
        });
    }
}

/* Рендерим чат */
$('#paste-message').on('click', () => {
    let message = $('#user-text').val();

    if (message !== '') socket.emit('chat message', findUser.nick, message);

    $('#user-text').val('');
});

/* отправляем команде данные(не сувать внутрь функций - будет плагиат) */
socket.on('chat message', (nick, msg) => {
    $('.all-message').prepend('' +
        '<div class="user-chat mt-2 pt-2 pb-2 pl-3 pr-3">' +
            '<p class="m-0"><span>'+nick+'&#8195;</span>'+msg+'</p>' +
        '</div>');
});

/* бегаем по столам */
function eventUser(event) {
    window.location.href = event;
}