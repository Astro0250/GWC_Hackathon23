function init() {
    let header = document.querySelector('.header');
    let friends = document.querySelector('.friends');
    let active = document.querySelector('.active-friends');
    let friendacts = document.querySelector('.friend-actions');

    friends.style.left = header.offsetWidth + 'px';
    
    active.style.left = header.offsetWidth + friends.offsetWidth + 'px';
    active.style.width = window.innerWidth - header.offsetWidth - friends.offsetWidth + 'px';

    friendacts.style.left = header.offsetWidth + friends.offsetWidth + 'px';
    friendacts.style.width = window.innerWidth - header.offsetWidth - friends.offsetWidth + 'px';
};

window.onresize = function() {
    let header = document.querySelector('.header');
    let friends = document.querySelector('.friends');
    let active = document.querySelector('.active-friends');
    let friendacts = document.querySelector('.friend-actions');

    friends.style.left = header.offsetWidth + 'px';

    active.style.left = header.offsetWidth + friends.offsetWidth + 'px';
    active.style.width = window.innerWidth - header.offsetWidth - friends.offsetWidth + 'px';

    friendacts.style.left = header.offsetWidth + friends.offsetWidth + 'px';
    friendacts.style.width = window.innerWidth - header.offsetWidth - friends.offsetWidth + 'px';
};

function reroute(routeIndex){
    switch(routeIndex){
        case 1:
            window.location.href = "find-friend/friends.html";
        break;
        case 2:
            window.location.href = "friendr/friends.html";
        break;
    }
}