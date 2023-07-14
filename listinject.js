console.log("XDDXDXD YIPPPPEEEEEE");

DoTrolling();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.edit === "startEdit") {
            console.log("Got message!");
            ParseNewData();
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
    console.log(id_a.length);
    if (id_a.length < 1) {return;}
    let row_elem = FindByID(id_a[0]);
    if (!row_elem) {return;}

    let text_field = row_elem.getElementsByClassName("w90 center")[0].getElementsByTagName("input")[0];
    text_field.value = kod_a[0];

    text_field = row_elem.getElementsByClassName("w40 center")[0].getElementsByTagName("input")[0];
    text_field.value = dost_a[0];

    text_field = row_elem.getElementsByClassName("w40 center")[1].getElementsByTagName("input")[0];
    text_field.value = cena_a[0];

    text_field = row_elem.getElementsByClassName("w75 center")[0].getElementsByTagName("input")[0];
    text_field.value = prio_a[0];

    id_a.splice(0, 1);
    await chrome.storage.local.set({id_p: id_a});
    kod_a.splice(0, 1);
    await chrome.storage.local.set({kod_p: kod_a});
    dost_a.splice(0, 1);
    await chrome.storage.local.set({dost_p: dost_a});
    cena_a.splice(0, 1);
    await chrome.storage.local.set({cena_p: cena_a});
    prio_a.splice(0, 1);
    await chrome.storage.local.set({prio_p: prio_a});

    let submit_button = row_elem.getElementsByClassName("w75 center")[0].getElementsByTagName("input")[1];
    submit_button.click(); // YIPPPEEEEEEE :steamhappy:
}