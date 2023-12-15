function init() {
    // let header = document.querySelector('.header');
    // let orgs = document.querySelector('.find-friend');
    // orgs.style.left = header.offsetWidth + 'px';
};

function reroute(routeIndex){
    switch(routeIndex){
        case 1:
            window.location.href = "friends.html";
        break;
        case 2:
            window.location.href = "../friendr/friends.html";
        break;
    }
}