'use strict';

let findUser = localStorage.getItem('nick');

if (!findUser) window.location.href = '/';

/* Чат игроков */
$('form').submit((e) => {
    e.preventDefault();
    
    let message = $('#user-message').val();
    
    if (message === '') return false;

    $('.all-message-user').prepend(
        '<div class="message-user">\n' +
        '   <p class="d-inline-block w-100">\n'+
        '   <img class="rounded-circle user d-inline-block w-auto m-2" src="../../img/user-undefined.jpg">'+findUser+': '+message+'</p>' +
        '</div>'
    );
    
    // Если много объектов удалем, чтобы не грузить ПК
    if ($('.message-user').length > 20) {
        $('.message-user')[20].remove();
    }
    
    $('#user-message').val('');
});