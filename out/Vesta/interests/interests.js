
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

function toggleCategory(category, id)
{
    console.log("toggled");

    if(document.getElementById(id).className.includes("on"))
    {
        document.getElementById(id).className = "category-btn off";
    }
    else
    {
        document.getElementById(id).className = "category-btn on";
    }

    divs = document.querySelectorAll(`[selection-group='${category}']`);
    divs.forEach((div) => {
        if (div.style.display === "none")
        {
            div.style.display = "block";
        }
        else
        {
            div.style.display = "none";
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