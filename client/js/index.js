'use strict';
/* Ожидаем полную загрузку документа */
$(document).ready(() => {

    /* Ловим событие submit внутри формы */
    $('.form').submit((e) => {

        e.preventDefault();

        let inp1 = String($('#inp1').val()),
            inp2 = String($('#inp2').val());

        if (inp1.length < 2 || inp2.length < 2) {
            return false; // Если данные пустые
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
                //window.location = '/home';
            }, 1000);
        },
        err: (err) => {
            console.log('err', err);
        }
    });

    /* Запишем данные в localstorage */
    localStorage.setItem('nick', inp1);
    localStorage.setItem('name', inp2);

    // Чистим форму
    form[0].reset();

    /* Вытащим данные из localstorage */
    let name = localStorage.getItem('nick'),
        family = localStorage.getItem('name');

    $('.nick').html(name);
    $('.name').html(family);

    $('#nick').html(name);
    $('#name').html(family);
}