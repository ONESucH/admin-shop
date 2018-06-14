'use strict';
let findUser = localStorage.getItem('nick');

if (!findUser) window.location.href = '/';

let chat = false;

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

$(document).ready(() => {
    $('.chat').hide(); // hide chat
});

/* Рендерим чат */
$('#paste-message').on('click', () => {
    let message = $('#user-text').val();

    if (message == '') return false;

    // отправляем команде данные
    socket.on('chat message', (msg) => {
        $('.all-message').prepend('<div class="user-chat mt-2 p-2"><p class="m-0"><span>'+findUser+'</span>: '+msg+'</p></div>');
    });
    socket.emit('chat message', message);

    $('#user-text').val('');
});


/* бегаем по столам */
function eventUser(event) {
    window.location.href = event;
}