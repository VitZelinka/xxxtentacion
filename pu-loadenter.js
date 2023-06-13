

let kodEl = document.getElementById("kod").getElementsByTagName("p")[1];
let goodsname_pEl = document.getElementById("nazevzbozi-p").getElementsByTagName("p")[1];
let goodsname_pnEl = document.getElementById("nazevzbozi-pn").getElementsByTagName("p")[1];
let distributorEl = document.getElementById("distributor").getElementsByTagName("p")[1];
let priorityEl = document.getElementById("priorita").getElementsByTagName("p")[1];
let p1El = document.getElementById("p1").getElementsByTagName("p")[1];
let p2El = document.getElementById("p2").getElementsByTagName("p")[1];
let p3El = document.getElementById("p3").getElementsByTagName("p")[1];
let p4El = document.getElementById("p4").getElementsByTagName("p")[1];
let p5El = document.getElementById("p5").getElementsByTagName("p")[1];
let priceTempEl = document.getElementById("sablonacen").getElementsByTagName("p")[1];
let deliveryTempEl = document.getElementById("sablonadopravy").getElementsByTagName("p")[1];
let avai = document.getElementById("dostupnost").getElementsByTagName("p")[1];

let loadButton = document.getElementById("loadButton");
let clearButton = document.getElementById("clearButton");
let enterButton = document.getElementById("enterButton");

loadButton.onclick = LoadData;
clearButton.onclick = ClearData;
enterButton.onclick = EnterData;

chrome.storage.local.get(["activeSite"], (data) => {
    switch (data.activeSite) {
        case "UpdateGoods":
            loadButton.style.display = "inline";
            clearButton.style.display = "inline";
            break;
        case "NewGoods":
            enterButton.style.display = "inline";
            break;
        default:
            break;
    }
})


UpdateData();

function LoadData() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {toDataGrabber: "load_data"}, (response) => {
            if (response.toPopupDataGrab === "data_loaded") {
                UpdateData();
            }
        });
    });
}


function ClearData() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {toDataGrabber: "clear_data"}, (response) => {
            if (response.toPopupDataGrab === "data_cleared") {
                UpdateData();
            }
        });
    });
}

function EnterData() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {toDataEnter: "enter_data"}, (response) => {
            if (response.toPopupDataEnter === "data_entered") {
                console.log("data entered");
                return;
            }
        });
    });
}


function UpdateData() {
    console.log("popup data updated");
    chrome.storage.local.get(["code"], (data) => {kodEl.innerHTML = data.code});
    chrome.storage.local.get(["g_name_p"], (data) => {goodsname_pEl.innerHTML = data.g_name_p});
    chrome.storage.local.get(["g_name_pn"], (data) => {goodsname_pnEl.innerHTML = data.g_name_pn});
    chrome.storage.local.get(["distributor"], (data) => {distributorEl.innerHTML = data.distributor});
    chrome.storage.local.get(["priority"], (data) => {priorityEl.innerHTML = data.priority});
    chrome.storage.local.get(["p1"], (data) => {p1El.innerHTML = data.p1});
    chrome.storage.local.get(["p2"], (data) => {p2El.innerHTML = data.p2});
    chrome.storage.local.get(["p3"], (data) => {p3El.innerHTML = data.p3});
    chrome.storage.local.get(["p4"], (data) => {p4El.innerHTML = data.p4});
    chrome.storage.local.get(["p5"], (data) => {p5El.innerHTML = data.p5});
    chrome.storage.local.get(["priceTempl"], (data) => {priceTempEl.innerHTML = data.priceTempl});
    chrome.storage.local.get(["deliveryTempl"], (data) => {deliveryTempEl.innerHTML = data.deliveryTempl});
    chrome.storage.local.get(["avai"], (data) => {avai.innerHTML = data.avai});
}
