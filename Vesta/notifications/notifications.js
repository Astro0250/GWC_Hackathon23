function init() {
    let header = document.querySelector('.header');
    let notifs = document.querySelector('.notifs');
    notifs.style.left = header.offsetWidth + 'px';
};

window.onresize = function() {
    let header = document.querySelector('.header');
    let notifs = document.querySelector('.notifs');
    notifs.style.left = header.offsetWidth + 'px';
};