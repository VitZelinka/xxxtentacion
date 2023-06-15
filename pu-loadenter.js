
let kodEl = document.getElementById("kod");
let goodsname_pEl = document.getElementById("nazevzbozi-p");
let goodsname_pnEl = document.getElementById("nazevzbozi-pn");
let distributorEl = document.getElementById("distributor");
let priorityEl = document.getElementById("priorita");
let p1El = document.getElementById("p1");
let p2El = document.getElementById("p2");
let p3El = document.getElementById("p3");
let p4El = document.getElementById("p4");
let p5El = document.getElementById("p5");
let priceTempEl = document.getElementById("sablonacen");
let deliveryTempEl = document.getElementById("sablonadopravy");
let avai = document.getElementById("dostupnost");
let params = document.getElementById("parametry");
let popis = document.getElementById("popis");


let loadButton = document.getElementById("loadButton");
let clearButton = document.getElementById("clearButton");
let enterButton = document.getElementById("enterButton");
let incButton = document.getElementById("incButton");


loadButton.onclick = LoadData;
clearButton.onclick = ClearData;
enterButton.onclick = EnterData;
incButton.onclick = IncrementData;


chrome.storage.local.get(["activeSite"], (data) => {
    switch (data.activeSite) {
        case "UpdateGoods":
            loadButton.style.display = "inline";
            clearButton.style.display = "inline";
            incButton.style.display = "inline";
            break;
        case "NewGoods":
            enterButton.style.display = "inline";
            incButton.style.display = "inline";
            break;
        default:
            break;
    }
})


UpdateData();

function SaveIncrementInput(name, new_val) {
    chrome.storage.local.get(["inc_data"], (data) => {
        data.inc_data[name] = Number(new_val);
        chrome.storage.local.set({inc_data: data.inc_data});
    });
}

p1El.getElementsByTagName("input")[0].addEventListener("blur", () => SaveIncrementInput("p1_inc", p1El.getElementsByTagName("input")[0].value));
p2El.getElementsByTagName("input")[0].addEventListener("blur", () => SaveIncrementInput("p2_inc", p2El.getElementsByTagName("input")[0].value));
p3El.getElementsByTagName("input")[0].addEventListener("blur", () => SaveIncrementInput("p3_inc", p3El.getElementsByTagName("input")[0].value));
p4El.getElementsByTagName("input")[0].addEventListener("blur", () => SaveIncrementInput("p4_inc", p4El.getElementsByTagName("input")[0].value));
p5El.getElementsByTagName("input")[0].addEventListener("blur", () => SaveIncrementInput("p5_inc", p5El.getElementsByTagName("input")[0].value));



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

function IncrementData() {
    alert("xdxdxd");
    return;
}

function UpdateData() {
    console.log("popup data updated");
    chrome.storage.local.get(["code"], (data) => {kodEl.getElementsByTagName("p")[1].innerHTML = data.code});
    chrome.storage.local.get(["g_name_p"], (data) => {goodsname_pEl.getElementsByTagName("p")[1].innerHTML = data.g_name_p});
    chrome.storage.local.get(["g_name_pn"], (data) => {goodsname_pnEl.getElementsByTagName("p")[1].innerHTML = data.g_name_pn});
    chrome.storage.local.get(["distributor"], (data) => {distributorEl.getElementsByTagName("p")[1].innerHTML = data.distributor});
    chrome.storage.local.get(["priority"], (data) => {priorityEl.getElementsByTagName("p")[1].innerHTML = data.priority});
    chrome.storage.local.get(["p1"], (data) => {p1El.getElementsByTagName("p")[1].innerHTML = data.p1});
    chrome.storage.local.get(["p2"], (data) => {p2El.getElementsByTagName("p")[1].innerHTML = data.p2});
    chrome.storage.local.get(["p3"], (data) => {p3El.getElementsByTagName("p")[1].innerHTML = data.p3});
    chrome.storage.local.get(["p4"], (data) => {p4El.getElementsByTagName("p")[1].innerHTML = data.p4});
    chrome.storage.local.get(["p5"], (data) => {p5El.getElementsByTagName("p")[1].innerHTML = data.p5});
    chrome.storage.local.get(["priceTempl"], (data) => {priceTempEl.getElementsByTagName("p")[1].innerHTML = data.priceTempl});
    chrome.storage.local.get(["deliveryTempl"], (data) => {deliveryTempEl.getElementsByTagName("p")[1].innerHTML = data.deliveryTempl});
    chrome.storage.local.get(["avai"], (data) => {avai.getElementsByTagName("p")[1].innerHTML = data.avai});
    chrome.storage.local.get(["params"], (data) => {params.getElementsByTagName("p")[1].innerHTML = data.params});
    chrome.storage.local.get(["popis"], (data) => {popis.getElementsByTagName("p")[1].innerHTML = data.popis});

    chrome.storage.local.get(["inc_data"], (data) => {p1El.getElementsByTagName("input")[0].value = data.inc_data.p1_inc});
    chrome.storage.local.get(["inc_data"], (data) => {p2El.getElementsByTagName("input")[0].value = data.inc_data.p2_inc});
    chrome.storage.local.get(["inc_data"], (data) => {p3El.getElementsByTagName("input")[0].value = data.inc_data.p3_inc});
    chrome.storage.local.get(["inc_data"], (data) => {p4El.getElementsByTagName("input")[0].value = data.inc_data.p4_inc});
    chrome.storage.local.get(["inc_data"], (data) => {p5El.getElementsByTagName("input")[0].value = data.inc_data.p5_inc});
}
