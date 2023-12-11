function init() {
    let header = document.querySelector('.header');
    let orgs = document.querySelector('.make-org');
    orgs.style.left = header.offsetWidth + 'px';
};

window.onresize = function() {
    let header = document.querySelector('.header');
    let orgs = document.querySelector('.make-org');
    orgs.style.left = header.offsetWidth + 'px';
};