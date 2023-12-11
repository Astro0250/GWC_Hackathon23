function init() {
    let header = document.querySelector('.header');
    let fund = document.querySelector('.make-fund');
    fund.style.left = header.offsetWidth + 'px';
};

window.onresize = function() {
    let header = document.querySelector('.header');
    let fund = document.querySelector('.make-fund');
    fund.style.left = header.offsetWidth + 'px';
};