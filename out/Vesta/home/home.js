function init() {
    let header = document.querySelector('.header');
    let feed = document.querySelector('.feed');
    let other = document.querySelector('.other-stuff');

    feed.style.left = header.offsetWidth + 'px';
    other.style.left = header.offsetWidth + feed.offsetWidth + 'px';
    other.style.width = window.innerWidth - header.offsetWidth - feed.offsetWidth + 'px';
};

window.onresize = function () {
    let header = document.querySelector('.header');
    let feed = document.querySelector('.feed');
    let other = document.querySelector('.other-stuff');

    feed.style.left = header.offsetWidth + 'px';
    other.style.left = header.offsetWidth + feed.offsetWidth + 'px';
    other.style.width = window.innerWidth - header.offsetWidth - feed.offsetWidth + 'px';
};

document.getElementById("createPostBtn").addEventListener('click', (e) => {
    document.getElementById("postContent").value = "";
    postOverlay.style.display = "block";
});

document.getElementById("cancelBtn").addEventListener('click', (e) => {
    postOverlay.style.display = "none";
});