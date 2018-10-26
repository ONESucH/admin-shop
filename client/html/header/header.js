'use strict';

$(document).ready(() => {
    $.ajax({
        url: 'reg',
        success: (req) => {
            req.forEach((item, i, arr) => {
                if (item._id === localStorage.getItem('id')) {
                    $('#nickname').html(item.nick);
                }
            });
        }
    });
});