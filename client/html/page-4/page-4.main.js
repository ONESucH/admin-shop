'use strict';

let findUser = localStorage.getItem('nick');

if (!findUser) window.location.href = '/';

