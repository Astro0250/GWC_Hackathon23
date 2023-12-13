document.getElementById("submit-button").addEventListener("click", function () {
    console.log("submitting");
    submitInterests();
});

function submitInterests() {
    var interests = document.getElementsByClassName("Interest-Selected");
    var interestsArray = {
        "sports": [],
        "music": [],
        "movies": [],
        "other": []
    };
    for (var i = 0; i < interests.length; i++) {
        var interest = interests[i];
        var topic = interest.parentElement.parentElement.parentElement.id;
        interestsArray[topic].push(interest.innerHTML);
    }
    console.log(interestsArray);
    sendToDatabase(interestsArray);
}
function sendToDatabase(interestsArray) {
    // :) implement this later :)
}