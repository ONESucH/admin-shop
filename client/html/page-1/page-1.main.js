'use strict';

let findUser = localStorage.getItem('nick');

if (!findUser) window.location.href = '/';

console.log('page 1 - js downloading');