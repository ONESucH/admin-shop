'use strict';

let findUser = {};

$(document).ready(() => {
    // Проверяем пользователя на регистрацию
    $.ajax({
        url: 'reg',
        success: (req) => {
            req.forEach((item, i, arr) => {
                if (item._id === localStorage.getItem('id')) {
                    $.extend(findUser, arr[i]);
                }
            });

            if (localStorage.getItem('id') !== findUser._id) window.location.href = '/';
        }
    });
});

console.log('page 1 - js downloading');