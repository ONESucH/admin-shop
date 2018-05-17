'use strict';
$(document).ready(function () {
    
    $('.btn-dark').on('click', function(e) {
        
        if (!$('#inp1').val() || !$('#inp2').val()) return false; // Если данные пустые
        
        e.preventDefault();
        
        let form = $('form'),
            data = form.serialize(),
            inp1 = $('#inp1').val(),
            inp2 = $('#inp2').val();
        
        /* Запишем данные в localstorage */
        localStorage.setItem('inp1', inp1);
        localStorage.setItem('inp2', inp2);
        /* Вытащим данные из localstorage */
        let name = localStorage.getItem('inp1'), 
            family = localStorage.getItem('inp2');
        
        $('.name').html(name);
        $('.family').html(family);
        
        $('#name').html(name);
        $('#family').html(family);

        form[0].reset();
    })
    
});