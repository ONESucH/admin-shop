'use strict';
$(document).ready(() => {

    /* Делаем запрос для получения спика пользователей */
    $('.form-sign-in').submit((e) => {
        
        e.preventDefault();
        
        $.ajax({
            url: '/reg',
            method: 'GET',
            success: (users) => {
                console.log('users', users);
                
                if (!users) return false;
                
                /* Проверяем есть ли этот пользователь */
                let nick = String($('#nick').val()),
                    pass = String($('#pass').val()),
                    name = '',
                    proccess;

                proccess = false;

                /* Проверяем на совпадения */
                users.forEach((item) => {
                    if (item.nick !== nick || item.pass !== pass) {
                        //alert('Неверные данные');
                        console.log('Неверные данные');
                        proccess = true;
                    }
                });

                if (proccess) return false; // Если данных нет в БД стопим
                
                console.log('Вошли');

                /* Вошли и схранили в LocalStorage */
                localStorage.setItem('nick', nick);
                localStorage.setItem('name', name);
                
                //window.location.href = '/game-table'; // перешли в основной стол

                //e.target.reset();
            }
        })
    })

});