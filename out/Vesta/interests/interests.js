activeTopic = "sports";
userInterests = {
    "Sports Interests": [],
    "Music Interests": [],
    "Movies Interests": [],
    "Other Interests": []
};

function swapTopic(topic) {
    activeTopic = topic;
    switch(activeTopic) {
        case "sports":
            document.getElementById("Sports Interests").style.display = "table-row-group";
            document.getElementById("Music Interests").style.display = "none";
            document.getElementById("Movies Interests").style.display = "none";
            document.getElementById("Other Interests").style.display = "none";
            break;
        case "music":
            document.getElementById("Sports Interests").style.display = "none";
            document.getElementById("Music Interests").style.display = "table-row-group";
            document.getElementById("Movies Interests").style.display = "none";
            document.getElementById("Other Interests").style.display = "none";
            break;
        case "movies":
            document.getElementById("Sports Interests").style.display = "none";
            document.getElementById("Music Interests").style.display = "none";
            document.getElementById("Movies Interests").style.display = "table-row-group";
            document.getElementById("Other Interests").style.display = "none";
            break;
        case "other":
            document.getElementById("Sports Interests").style.display = "none";
            document.getElementById("Music Interests").style.display = "none";
            document.getElementById("Movies Interests").style.display = "none";
            document.getElementById("Other Interests").style.display = "table-row-group";
            break;
    }
}

function updateInterests(interest, topic) {
    if (userInterests[topic].includes(interest.innerHTML)) {
        userInterests[topic].splice(userInterests[topic].indexOf(interest.innerHTML));
        interest.className = "Interest-notSelected";
    } else {
        userInterests[topic].push(interest.innerHTML);
        interest.className = "Interest-Selected";
    }
}

function submit(){
    console.log(userInterests);
}