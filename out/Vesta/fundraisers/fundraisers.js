function init() {
    let header = document.querySelector('.header');
    let fundraisers = document.querySelector('.fundraisers');
    fundraisers.style.left = header.offsetWidth + 'px';
};

window.onresize = function() {
    let header = document.querySelector('.header');
    let fundraisers = document.querySelector('.fundraisers');
    fundraisers.style.left = header.offsetWidth + 'px';
};