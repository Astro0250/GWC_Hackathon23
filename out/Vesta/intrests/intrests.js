activeTopic = "sports";

function swapTopic(topic) {
    activeTopic = topic;
    console.log(activeTopic);
    switch(activeTopic) {
        case "sports":
            document.getElementById("Sports Interests").style.display = "static";
            document.getElementById("Music Interests").style.display = "none";
            document.getElementById("Movies Interests").style.display = "none";
            document.getElementById("Other Interests").style.display = "none";
            break;
        case "music":
            document.getElementById("Sports Interests").style.display = "none";
            document.getElementById("Music Interests").style.display = "static";
            document.getElementById("Movies Interests").style.display = "none";
            document.getElementById("Other Interests").style.display = "none";
            break;
        case "movies":
            document.getElementById("Sports Interests").style.display = "none";
            document.getElementById("Music Interests").style.display = "none";
            document.getElementById("Movies Interests").style.display = "static";
            document.getElementById("Other Interests").style.display = "none";
            break;
        case "other":
            document.getElementById("Sports Interests").style.display = "none";
            document.getElementById("Music Interests").style.display = "none";
            document.getElementById("Movies Interests").style.display = "none";
            document.getElementById("Other Interests").style.display = "static";
            break;
    }
}