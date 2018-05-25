'use strict';

$(document).ready(() => {

    let findUser;

    /* Делаем запрос для получения спика пользователей */
    $('.form-sign-in').submit((e) => {
        
        e.preventDefault();
        
        let proccess = false;
        
        $.ajax({
            url: '/reg',
            method: 'GET',
            success: (users) => {
                
                if (!users) return false;
                
                /* Проверяем есть ли этот пользователь */
                const nick = String($('#nick').val()),
                    pass = String($('#pass').val());

                proccess = false;

                /* Проверяем на совпадения */
                users.forEach((item) => {
                    if (String(item.nick) == nick && String(item.pass) == pass) {
                        findUser = item;
                        proccess = true;
                    }
                });
                
                if (!proccess) return false; // Если данных нет в БД стопим

                /* Вошли и сохранили в LocalStorage */
                localStorage.setItem('nick', nick);
                
                e.target.reset();

                window.location.href = '/game-table'; // перешли в основной стол
            }
        })
    });
});