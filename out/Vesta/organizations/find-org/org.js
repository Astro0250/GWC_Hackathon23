function init() {
    // let header = document.querySelector('.header');
    // let orgs = document.querySelector('.find-org');
    // orgs.style.left = header.offsetWidth + 'px';
};

function reroute(routeIndex){
    switch(routeIndex){
        case 1:
            window.location.href = "../make-org/org.html";
            break;
        case 2:
            window.location.href = "org.html";
            break;
    }
}