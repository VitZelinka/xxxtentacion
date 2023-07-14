console.log("XDDXDXD YIPPPPEEEEEE");

chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.edit === "startEdit") {
            console.log("Got message!");
            ParseNewData();
            await chrome.storage.local.set({stage: 1});
            DoTrolling();
        }
    }
);


function FindByID(stored_id) {
    let ids = document.getElementsByClassName("w35 center");
    for (let i = 0; i < ids.length; i++) {
        const row_id = ids[i].childNodes[0].innerHTML;
        if (row_id == stored_id) {
            return ids[i].parentElement;
        }
    }
    return false;
}


function ParseNewData() {
    chrome.storage.local.get(["id"], (data) => {chrome.storage.local.set({id_p: data.id.split(" ")})});
    chrome.storage.local.get(["kod"], (data) => {chrome.storage.local.set({kod_p: data.kod.split(" ")})});
    chrome.storage.local.get(["dost"], (data) => {chrome.storage.local.set({dost_p: data.dost.split(" ")})});
    chrome.storage.local.get(["cena"], (data) => {chrome.storage.local.set({cena_p: data.cena.split(" ")})});
    chrome.storage.local.get(["prio"], (data) => {chrome.storage.local.set({prio_p: data.prio.split(" ")})});
}


async function DoTrolling() {
    let id_a = (await chrome.storage.local.get(["id_p"])).id_p;
    let kod_a = (await chrome.storage.local.get(["kod_p"])).kod_p;
    let dost_a = (await chrome.storage.local.get(["dost_p"])).dost_p;
    let cena_a = (await chrome.storage.local.get(["cena_p"])).cena_p;
    let prio_a = (await chrome.storage.local.get(["prio_p"])).prio_p;
    if (id_a.length < 1) {return;}
    
    let row_elem = FindByID(id_a[0]);
    if (!row_elem) {return;}
    let stage = (await chrome.storage.local.get(["stage"])).stage;

    switch (stage) {
        case 1:
            let text_field = row_elem.getElementsByClassName("w90 center")[0].childNodes[0];
            text_field.value = kod_a[0];
            PressEnter(text_field);
            break;
    
        default:
            break;
    }
}


function PressEnter(textField) {
    const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true});
    textField.dispatchEvent(event);
  }