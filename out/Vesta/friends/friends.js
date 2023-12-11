function init() {
    let header = document.querySelector('.header');
    let friends = document.querySelector('.friends');
    let active = document.querySelector('.active-friends');

    friends.style.left = header.offsetWidth + 'px';
    active.style.left = header.offsetWidth + friends.offsetWidth + 'px';
    active.style.width = window.innerWidth - header.offsetWidth - friends.offsetWidth + 'px';
};

window.onresize = function() {
    let header = document.querySelector('.header');
    let friends = document.querySelector('.friends');
    let active = document.querySelector('.active-friends');

    friends.style.left = header.offsetWidth + 'px';
    active.style.left = header.offsetWidth + friends.offsetWidth + 'px';
    active.style.width = window.innerWidth - header.offsetWidth - friends.offsetWidth + 'px';
};