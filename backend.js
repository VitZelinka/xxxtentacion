
let dataGrabGate = true;
let dataEnterGate = true;
let listInjectGate = true;
let dataGrabTabID = null;
let dataEnterTabID = null;
let listInjectTabID = null;

async function GetCurrentTabURL() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    try {
        return new URL(tab.url);
    } catch (error) {
        console.log("ERROR:")
        console.log(error);
        console.log("Tried to make new URL object from: ");
        console.log(tab);
    }
}

function OnTabChange(tab) {
    GetCurrentTabURL().then(url => {
        let shouldReturn = false;
        chrome.storage.sync.get(["editGoodsURLs"], (data) => {
            data.editGoodsURLs.forEach(element => {
                let storedURL = new URL(element);
                if (url.host + url.pathname === storedURL.host + storedURL.pathname) {
                    chrome.storage.local.set({activeSite: "UpdateGoods"});
                    chrome.action.setPopup({popup: "./pu-loadenter.html"});
                    console.log("Vyplnene zbozi website!!");
                    shouldReturn = true;
                }
            });
            if (shouldReturn == true) return;
            chrome.storage.sync.get(["newGoodsURLs"], (data) => {
                data.newGoodsURLs.forEach(element => {
                    let storedURL = new URL(element);
                    if (url.host + url.pathname === storedURL.host + storedURL.pathname) {
                        chrome.storage.local.set({activeSite: "NewGoods"});
                        chrome.action.setPopup({popup: "./pu-loadenter.html"});
                        console.log("New zbozi website!!");
                        shouldReturn = true;
                    }
                });
                if (shouldReturn == true) return;
                chrome.storage.sync.get(["listGoodsURLs"], (data) => {
                    data.listGoodsURLs.forEach(element => {
                        let storedURL = new URL(element);
                        if (url.host + url.pathname === storedURL.host + storedURL.pathname) {
                            chrome.storage.local.set({activeSite: "ListGoods"});
                            chrome.action.setPopup({popup: "./pu-list.html"});
                            console.log("Kapitola website!!");
                            shouldReturn = true;
                        }
                    });
                    if (shouldReturn == true) return;
                    chrome.storage.local.set({activeSite: "unknown"});
                    chrome.action.setPopup({popup: "./popup.html"});
                    console.log("Unknown website!!");
                });
            });
        });
    });
}

function InjectContentScript(tabId) {
    chrome.storage.local.get(["activeSite"], (data) => {
        switch (data.activeSite) {
            case "UpdateGoods":
                if (dataGrabGate == true) {
                    dataGrabGate = false;
                    dataGrabTabID = tabId;
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ['datagrabber.js']
                    });
                } else {
                    dataGrabGate = true;
                }
                break;
            case "NewGoods":
                if (dataEnterGate == true) {
                    dataEnterGate = false;
                    dataEnterTabID = tabId;
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ['dataenter.js']
                    });
                } else {
                    dataEnterGate = true;
                }
                break;
            case "ListGoods":
                if (listInjectGate == true) {
                    listInjectGate = false;
                    listInjectTabID = tabId;
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ['cdn.sheetjs.com_xlsx-0.20.0_package_dist_xlsx.full.min.js']
                    });
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ['listinject.js']
                    });
                } else {
                    listInjectGate = true;
                }
                break;
            default:
                break;
        }
    });
}


chrome.runtime.onInstalled.addListener((reason) => {
      console.log("Extension loaded.");
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.wakeup === "yo") {
            OnTabChange();
        }
    }
);

chrome.tabs.onUpdated.addListener(() => OnTabChange());
chrome.tabs.onUpdated.addListener((tabId) => InjectContentScript(tabId));

chrome.tabs.onRemoved.addListener((tabId) => {if (tabId === dataGrabTabID) dataGrabGate = true;});
chrome.tabs.onRemoved.addListener((tabId) => {if (tabId === dataEnterTabID) dataEnterGate = true;});

chrome.tabs.onHighlighted.addListener(() => OnTabChange());