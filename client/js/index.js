'use strict';
$(document).ready(function () {
    
    $('.form').submit(function(e) {
        
        e.preventDefault();
        
        let inp1 = $('#inp1').val(),
            inp2 = $('#inp2').val();

        if (inp1.length < 2 || inp2.length < 2) {
            return false; // Если данные пустые
        }

        let form = $('.form'),
            data = form.serialize();
        
        console.log('data', data);
        
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