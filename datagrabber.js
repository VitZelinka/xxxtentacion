console.log("Datagrabber loaded!");


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.toDataGrabber === "load_data") {
            LoadData();
            sendResponse({toPopupDataGrab: "data_loaded"});
        } else if (request.toDataGrabber === "clear_data") {
            ClearData();
            sendResponse({toPopupDataGrab: "data_cleared"});
        }
    }
    );
    
    
function LoadData() {
    let curElem;
    curElem = document.getElementsByName("kodZbozi1")[0].value;
    chrome.storage.local.set({code: curElem});
    
    curElem = document.getElementsByName("nazevzbozi")[0].value;
    chrome.storage.local.set({g_name_p: curElem});
    
    curElem = document.getElementsByName("zb_productname")[0].value;
    chrome.storage.local.set({g_name_pn: curElem});
    
    curElem = document.getElementsByName("distributor")[0].value;
    chrome.storage.local.set({distributor: curElem});
    
    curElem = document.getElementsByName("priorita")[0].value;
    chrome.storage.local.set({priority: curElem});
    
    try {
        curElem = document.getElementsByName("p1")[0].value;
        chrome.storage.local.set({p1: curElem});
    } catch (e) {
        console.log("p1 not found");
    }
    
    try {
        curElem = document.getElementsByName("p2")[0].value;
        chrome.storage.local.set({p2: curElem});
    } catch (e) {
        console.log("p2 not found");
    }
    
    try {
        curElem = document.getElementsByName("p3")[0].value;
        chrome.storage.local.set({p3: curElem});
    } catch (e) {
        console.log("p3 not found");
    }
    
    try {
        curElem = document.getElementsByName("p4")[0].value;
        chrome.storage.local.set({p4: curElem});
    } catch (e) {
        console.log("p4 not found");
    }
    
    try {
        curElem = document.getElementsByName("p5")[0].value;
        chrome.storage.local.set({p5: curElem});
    } catch (e) {
        console.log("p5 not found");
    }
    
    curElem = document.getElementsByName("sablonaceny")[0].querySelectorAll("[selected=selected]");
    curElem.forEach(element => {
        if (element.value !== "0"){
            curElem = element.value;
        }
    });
    chrome.storage.local.set({priceTempl: curElem});
    
    curElem = document.getElementsByName("sabonadopravy")[0].querySelectorAll("[selected=selected]");
    curElem.forEach(element => {
        if (element.value !== "0"){
            curElem = element.value;
        }
    });
    chrome.storage.local.set({deliveryTempl: curElem});

    /*
    curElem = document.getElementsByName("sabonadostupnost")[0].querySelectorAll("[selected=selected]");
    curElem.forEach(element => {
        if (element.value !== "0"){
            curElem = element.value;
        }
    });
    chrome.storage.local.set({avaiTempl: curElem});
    */

    curElem = document.getElementsByName("dostupnost")[0].value;
    chrome.storage.local.set({avai: curElem});

    curElem = document.getElementById("parametry").innerHTML;
    chrome.storage.local.set({params: curElem});

    curElem = document.getElementById("popis").innerHTML;
    console.log(curElem);
    chrome.storage.local.set({popis: curElem});
}

function ClearData() {
    curElem = "notloaded";
    chrome.storage.local.set({code: curElem});
    chrome.storage.local.set({g_name_p: curElem});
    chrome.storage.local.set({g_name_pn: curElem});
    chrome.storage.local.set({distributor: curElem});
    chrome.storage.local.set({priority: curElem});
    chrome.storage.local.set({p1: curElem});
    chrome.storage.local.set({p2: curElem});
    chrome.storage.local.set({p3: curElem});
    chrome.storage.local.set({p4: curElem});
    chrome.storage.local.set({p5: curElem});
    chrome.storage.local.set({priceTempl: curElem});
    chrome.storage.local.set({deliveryTempl: curElem});
    chrome.storage.local.set({avai: curElem});
    chrome.storage.local.set({params: curElem});
    chrome.storage.local.set({popis: curElem});
}