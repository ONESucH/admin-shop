'use strict';
let chat = false;
let socket = io();

$(document).ready(function () {

    $('.chat').hide(); // hide chat
    $('#nickname').html(localStorage.getItem('nick')); // paste data - nick

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
$('#chat-form').submit((e) => {
    e.preventDefault();
    
    let data = $('#user-text').val();
    
    $('.all-message').prepend('<div class="user-chat mt-2 p-3" disabled><p class="m-0"><span>' + localStorage.getItem('nick') + '</span>: ' + data +'</p></div>');

    $('#user-text').val('');
});

/* бегаем по столам */
function eventUser(event) {
    window.location.href = event;
}