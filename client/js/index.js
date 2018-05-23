'use strict';

$(document).ready(function () {
    
    /* Ловим событие submit внутри формы */
    $('.form').submit(function(e) {
        
        e.preventDefault();
        
        let inp1 = $('#inp1').val(),
            inp2 = $('#inp2').val();

        if (inp1.length < 2 || inp2.length < 2) {
            return false; // Если данные пустые
        }

        let form = $('.form');
        
        /* Отправим данные в Mongodb */
        $.ajax({
            url: '/reg',
            method: 'POST',
            dataType: 'json',
            data: form.serialize(),
            success: (result) => {
                console.log('result', result);

                setTimeout(() => {
                    window.location = '/home';
                }, 1000);
            },
            err: (err) => {
                console.log('err', err);
            }
        });
        
        /* Запишем данные в localstorage */
        localStorage.setItem('name', inp1);
        localStorage.setItem('family', inp2);
        
        // Чистим форму
        form[0].reset();
        
        /* Вытащим данные из localstorage */
        let name = localStorage.getItem('name'), 
            family = localStorage.getItem('family');
        
        $('.name').html(name);
        $('.family').html(family);
        
        $('#name').html(name);
        $('#family').html(family);
    })
    
});