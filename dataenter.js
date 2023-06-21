console.log("Dataenter loaded!");


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.toDataEnter === "enter_data") {
            EnterData();
            sendResponse({toPopupDataEnter: "data_entered"});
        }
    }
);
    

function SetSelectedIndex(menuElem, val) {
    for ( let i = 0; i < menuElem.options.length; i++ ) {
        if ( menuElem.options[i].value == val ) {
            menuElem.options[i].selected = true;
            return;
        }
    }
}

function EnterData() {
    chrome.storage.local.get(["code"], (data) => {
        if (data.code === "notloaded" || typeof data.code !== "string") return;
        let curElem = document.getElementsByName("kodZbozi1")[0];
        curElem.value = data.code;
    });
    
    chrome.storage.local.get(["g_name_p"], (data) => {
        if (data.g_name_p === "notloaded" || typeof data.g_name_p !== "string") return;
        let curElem = document.getElementsByName("nazevzbozi")[0];
        curElem.value = data.g_name_p;
    });
    
    chrome.storage.local.get(["g_name_pn"], (data) => {
        if (data.g_name_pn === "notloaded" || typeof data.g_name_pn !== "string") return;
        let curElem = document.getElementsByName("zb_productname")[0];
        curElem.value = data.g_name_pn;
    });
    
    chrome.storage.local.get(["distributor"], (data) => {
        if (data.distributor === "notloaded" || typeof data.distributor !== "string") return;
        let curElem = document.getElementsByName("distributor")[0];
        curElem.value = data.distributor;
    });
    
    chrome.storage.local.get(["priority"], (data) => {
        if (data.priority === "notloaded" || typeof data.priority !== "string") return;
        let curElem = document.getElementsByName("priorita")[0];
        curElem.value = data.priority;
    });
    
    chrome.storage.local.get(["p1"], (data) => {
        if (data.p1 === "notloaded" || typeof data.p1 !== "string") return;
        let curElem = document.getElementsByName("p1")[0];
        curElem.value = data.p1;
    });
    
    chrome.storage.local.get(["p2"], (data) => {
        if (data.p2 === "notloaded" || typeof data.p2 !== "string") return;
        let curElem = document.getElementsByName("p2")[0];
        curElem.value = data.p2;
    });
    
    chrome.storage.local.get(["p3"], (data) => {
        if (data.p3 === "notloaded" || typeof data.p3 !== "string") return;
        let curElem = document.getElementsByName("p3")[0];
        curElem.value = data.p3;
    });
    
    chrome.storage.local.get(["p4"], (data) => {
        if (data.p4 === "notloaded" || typeof data.p4 !== "string") return;
        let curElem = document.getElementsByName("p4")[0];
        curElem.value = data.p4;
    });
    
    chrome.storage.local.get(["p5"], (data) => {
        if (data.p5 === "notloaded" || typeof data.p5 !== "string") return;
        let curElem = document.getElementsByName("p5")[0];
        curElem.value = data.p5;
    });
    
    chrome.storage.local.get(["priceTempl"], (data) => {
        let curElem = document.getElementsByName("sablonaceny")[0];
        SetSelectedIndex(curElem, data.priceTempl);
    });
    
    chrome.storage.local.get(["deliveryTempl"], (data) => {
        let curElem = document.getElementsByName("sabonadopravy")[0];
        SetSelectedIndex(curElem, data.deliveryTempl);
    });
    
    chrome.storage.local.get(["avai"], (data) => {
        if (data.avai === "notloaded" || typeof data.avai !== "string") return;
        let curElem = document.getElementsByName("dostupnost")[0];
        curElem.value = data.avai;
    });
   
    /*
    curElem = document.getElementsByName("sabonadostupnost")[0].querySelectorAll("[selected=selected]");
    curElem.forEach(element => {
        if (element.value !== "0"){
            curElem = element.value;
        }
    });
    */

    chrome.storage.local.get(["params"], (data) => {
        if (data.params === "notloaded" || typeof data.params !== "string") return;
        let curElem = document.getElementsByName("parametry")[0];
        curElem.value = data.params;
    });

    chrome.storage.local.get(["popis"], (data) => {
        if (data.popis === "notloaded" || typeof data.popis !== "string") return;
        let curElem = document.getElementsByName("popis")[0];
        curElem.value = data.popis;
    });

    console.log("data entered");
}