'use strict';
let chat = false;

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