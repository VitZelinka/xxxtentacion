
let button = document.getElementById("TestButton");
let activeSiteHTML = document.getElementById("ActiveSite");
let activeSiteCache = null;

chrome.storage.local.get(["activeSite"], (data) => {
    activeSiteHTML.innerHTML = data.activeSite;
    activeSiteCache = data.activeSite;
    switch (data.activeSite) {
        case "UpdateGoods":
            break;
        case "NewGoods":
            break;
        case "ListGoods":
            break;
        default:
            break;
    }
});


button.addEventListener("click", () => {
    chrome.runtime.sendMessage({wakeup: "yo"});
});


// chrome.browserAction.setPopup({popup: "new.html"});

/*
switch (request.activeSite) {
    case "UpdateGoods":
        break;
    case "NewGoods":
        break;
    case "ListGoods":
        break;
    default:
        break;
}
*/