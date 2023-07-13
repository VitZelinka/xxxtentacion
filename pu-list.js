
let idEl = document.getElementsByName("id")[0];
let kodEl = document.getElementsByName("kod")[0];
let dostEl = document.getElementsByName("dost")[0];
let cenaEl = document.getElementsByName("cena")[0];
let prioEl = document.getElementsByName("prio")[0];



let startButton = document.getElementById("start");
startButton.onclick = StartEntering;


UpdateData();


idEl.addEventListener("blur", () => chrome.storage.local.set({id: idEl.value}));
kodEl.addEventListener("blur", () => chrome.storage.local.set({kod: kodEl.value}));
dostEl.addEventListener("blur", () => chrome.storage.local.set({dost: dostEl.value}));
cenaEl.addEventListener("blur", () => chrome.storage.local.set({cena: cenaEl.value}));
prioEl.addEventListener("blur", () => chrome.storage.local.set({prio: prioEl.value}));

async function StartEntering() {
    console.log("YIP YIPY YIP");
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    chrome.tabs.sendMessage(tab.id, {edit: "startEdit"});
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
