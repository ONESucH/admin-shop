'use strict';

$(document).ready(() => {

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
                proccess = false;

                /* Проверяем на совпадения */
                users.forEach((item) => {
                    if (String(item.nick) === String($('#nick').val()) && String(item.pass) === String($('#pass').val())) {
                        proccess = true;
                        
                        /* Вошли и сохранили в LocalStorage */
                        localStorage.setItem('id', item._id);
                    }
                });
                
                if (!proccess) return false; // Если данных нет в БД стопим
                
                e.target.reset(); // чистим форму

                window.location.href = '/game-table'; // перешли в основной стол
            }
        })
    });
});