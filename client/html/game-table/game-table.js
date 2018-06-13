'use strict';
console.log('Game-table downloding');
let chat = false;

$(document).ready(function () {
    
    $('.chat').hide();
    
});

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