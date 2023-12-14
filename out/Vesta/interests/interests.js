
function updateInterests(interest, topic) 
{
    if (userInterests[topic].includes(interest.innerHTML)) {
        userInterests[topic].splice(userInterests[topic].indexOf(interest.innerHTML));
        interest.className = "Interest-notSelected";
    } else {
        userInterests[topic].push(interest.innerHTML);
        interest.className = "Interest-Selected";
    }
}

function toggleCategory(category)
{
    console.log("toggled");
    divs = document.querySelectorAll(`[selection-group='${category}']`);
    divs.forEach((div) => {
        if (div.getAttribute("visible") == "true")
        {
            div.setAttribute("visible", "false");
        }
        else
        {
            div.setAttribute("visible", "true");
        }
    });
}

import("./interestModule.js").then(({ sendToDatabase }) => {
    document.getElementById("submit-button").addEventListener("click", () => {
        selected = document.querySelectorAll(`[selected='true']`);
        let interests = [];
        selected.forEach((div) => {
            interests.push(div.getAttribute("id"));
        });
        sendToDatabase(interests);
    });
});