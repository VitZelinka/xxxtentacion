
let idEl = document.getElementsByName("id")[0];
let kodEl = document.getElementsByName("kod")[0];
let dostEl = document.getElementsByName("dost")[0];
let cenaEl = document.getElementsByName("cena")[0];
let prioEl = document.getElementsByName("prio")[0];


let startButton = document.getElementById("start");
startButton.onclick = StartEntering;
let nukeButton = document.getElementById("nukeButton");
nukeButton.onclick = StartNuking;
let idListButton = document.getElementById("idListButton");
idListButton.onclick = ListIDs;


UpdateData();


idEl.addEventListener("blur", () => chrome.storage.local.set({id: idEl.value}));
kodEl.addEventListener("blur", () => chrome.storage.local.set({kod: kodEl.value}));
dostEl.addEventListener("blur", () => chrome.storage.local.set({dost: dostEl.value}));
cenaEl.addEventListener("blur", () => chrome.storage.local.set({cena: cenaEl.value}));
prioEl.addEventListener("blur", () => chrome.storage.local.set({prio: prioEl.value}));

async function StartEntering() {
    console.log("YIP YIPY YIP");
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    chrome.tabs.sendMessage(tab[0].id, {edit: "startEdit"});
    return;
}



function UpdateData() {
    console.log("popup data updated");
    chrome.storage.local.get(["id"], (data) => {idEl.value = data.id});
    chrome.storage.local.get(["kod"], (data) => {kodEl.value = data.kod});
    chrome.storage.local.get(["dost"], (data) => {dostEl.value = data.dost});
    chrome.storage.local.get(["cena"], (data) => {cenaEl.value = data.cena});
    chrome.storage.local.get(["prio"], (data) => {prioEl.value = data.prio});
}


async function StartNuking() {
    let fileInput = document.getElementById('fileInput');
    let data = fileInput.files[0];
    data = await data.arrayBuffer();
    let workbook = XLSX.read(data);
    await chrome.storage.local.set({workbook: workbook});
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {edit: "startEditExcel"});
    });
}

async function ListIDs() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {edit: "listids"});
    });
}