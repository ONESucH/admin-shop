'use strict';
/* Ожидаем полную загрузку документа */
$(document).ready(() => {

    /* Ловим событие submit внутри формы */
    $('.form').submit((e) => {

        e.preventDefault();

        let inp1 = String($('#inp1').val()),
            inp2 = String($('#inp2').val()),
            pass = String($('#pass').val()),
            resPass = String($('#rep_pass').val());

        if (inp1.length < 2 || inp2.length < 2) {
            alert('Данные пустые или имеют не больше 3 символов');
            return false;
        } else if (pass !== resPass) {
            alert('Пароли не совпадают');
            return false;
        } 

        let form = $('.form');

        /* Проверяем есть ли совпадения в mongodb */
        $.ajax({
            url: '/reg',
            method: 'GET',
            success: (users) => {
                console.log('users', users);
                if (!users) return false;

                let json = form.serialize(),
                    proccess;
                
                proccess = false;

                /* Проверяем на совпадения */
                users.forEach((item) => {
                    if (item.nick === inp1) {
                        alert('Никнейм занят');
                        console.log('Никнейм занят');
                        proccess = true;
                    }
                });
                
                if (proccess) return false; // Если данные есть в БД стопим

                saveData(inp1, inp2, form, json); // сохраняем
            },
            err: () => {
                console.log('disconnect');
            }
        });
    })

});

/* Сохраняем данные в Mongodb и LocalStorage */
function saveData(inp1, inp2, form, json) {

    if (!json) return false;

    /* Отправим данные в Mongodb */
    $.ajax({
        url: '/reg',
        method: 'POST',
        dataType: 'json',
        data: json,
        success: (result) => {
            console.log('result', result);
            setTimeout(() => {
                window.location = '/sign-in';
            }, 1000);
        },
        err: (err) => {
            console.log('err', err);
        }
    });

    // Чистим форму
    form[0].reset();
}