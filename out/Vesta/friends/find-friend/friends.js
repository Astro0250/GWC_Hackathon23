function init() {
    let header = document.querySelector('.header');
    let orgs = document.querySelector('.find-friend');
    orgs.style.left = header.offsetWidth + 'px';
};

window.onresize = function() {
    let header = document.querySelector('.header');
    let orgs = document.querySelector('.find-friend');
    orgs.style.left = header.offsetWidth + 'px';
};

function findOrg()
{

}
