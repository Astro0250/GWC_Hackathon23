function init() {
    let header = document.querySelector('.header');
    let main = document.querySelector('.settings');
    let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    main.style.left = header.offsetWidth + 'px';
    main.style.width = window.innerWidth - header.offsetWidth - scrollbarWidth + 'px';
};

window.onresize = function() {
    let header = document.querySelector('.header');
    let main = document.querySelector('.settings');
    let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    main.style.left = header.offsetWidth + 'px';
    main.style.width = window.innerWidth - header.offsetWidth - scrollbarWidth + 'px';
};