
console.log("XDDXDXD YIPPPPEEEEEE");


DoTrolling();
DoNuking();

chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.edit === "startEdit") {
            console.log("Got message!");
            ParseNewData();
            setTimeout(()=>{DoTrolling()}, 25);
        } else if (request.edit === "startEditExcel") {
            await chrome.storage.local.set({miss_ids: ""});
            StoreAllIDs();
            DoNuking();
        } else if (request.edit === "listids") {
            LogAllIDs();
            LogAllNames();
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

async function StoreAllIDs() {
    let id_array = [];
    let ids = document.getElementsByClassName("w35 center");
    for (let i = 0; i < ids.length; i++) {
        const row_id = ids[i].childNodes[0].innerHTML;
        id_array.push(row_id);
    }
    await chrome.storage.local.set({rem_ids: id_array});
    await chrome.storage.local.set({rem_id_n: id_array.length});
    return id_array;
}

function LogAllIDs() {
    let str_out = "";
    let ids = document.getElementsByClassName("w35 center");
    for (let i = 0; i < ids.length; i++) {
        const row_id = ids[i].childNodes[0].innerHTML;
        str_out += (row_id + '\n');
    }
    console.log(str_out);
}

function LogAllNames() {
    let str_out = "";
    let ids = document.getElementsByClassName("w500");
    for (let i = 0; i < ids.length; i++) {
        const row_id = ids[i].childNodes[0].innerHTML;
        str_out += (row_id + '\n');
    }
    console.log(str_out);
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
    
    id_a.splice(0, 1);
    await chrome.storage.local.set({id_p: id_a});

    kod_a = removeWhitespaceElements(kod_a);
    if (kod_a.length > 0) {
        let text_field = row_elem.getElementsByClassName("w90 center")[0].getElementsByTagName("input")[0];
        text_field.value = kod_a[0];
        kod_a.splice(0, 1);
        await chrome.storage.local.set({kod_p: kod_a});
    }

    dost_a = removeWhitespaceElements(dost_a);
    if (dost_a.length > 0) {
        text_field = row_elem.getElementsByClassName("w40 center")[0].getElementsByTagName("input")[0];
        text_field.value = dost_a[0];
        dost_a.splice(0, 1);
        await chrome.storage.local.set({dost_p: dost_a});
    }

    cena_a = removeWhitespaceElements(cena_a);
    if (cena_a.length > 0) {
        text_field = row_elem.getElementsByClassName("w40 center")[1].getElementsByTagName("input")[0];
        text_field.value = cena_a[0];
        cena_a.splice(0, 1);
        await chrome.storage.local.set({cena_p: cena_a});
    }

    prio_a = removeWhitespaceElements(prio_a);
    if (prio_a.length > 0) {
        text_field = row_elem.getElementsByClassName("w75 center")[0].getElementsByTagName("input")[0];
        text_field.value = prio_a[0];
        prio_a.splice(0, 1);
        await chrome.storage.local.set({prio_p: prio_a});
    }


    let submit_button = row_elem.getElementsByClassName("w75 center")[0].getElementsByTagName("input")[1];
    submit_button.click(); // YIPPPEEEEEEE :steamhappy:
}


function removeWhitespaceElements(arr) {
    return arr.filter(element => element.trim() !== '');
}

async function DoNuking() {
    let opts = (await chrome.storage.sync.get(["excelOptions"])).excelOptions;
    const sheet_name = opts.sheet; // grab from options later
    const id_col = opts.id; // grab from options
    const kod_col = opts.kod; // grab from
    const dost_col = opts.dost; // grab
    const cena_col = opts.cena;
    const prio_col = opts.prio;
    const wb = (await chrome.storage.local.get(["workbook"])).workbook;
    const ws = wb.Sheets[sheet_name];

    let ids = (await chrome.storage.local.get(["rem_ids"])).rem_ids;

    if (ids.length < 1) {return;}

    let row_elem = FindByID(ids[0]);
    if (!row_elem) {chrome.storage.local.set({rem_ids: []});chrome.storage.local.set({rem_id_n: 0});alert("ERROR-missing ID on page that should exist");return;}

    let found_id = [false, ids[0]];
    let n_rows;

    try {
        n_rows = XLSX.utils.decode_range(ws["!ref"]).e.r + 1;
    } catch (error) {
        chrome.storage.local.set({rem_ids: []});
        chrome.storage.local.set({rem_id_n: 0})
        alert("ERROR: Excel is probably empty.")
        return;
    }


    for (let i = 0; i < n_rows; i++) {
        if (ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(id_col), r:i})] == undefined) {
            //chrome.storage.local.set({rem_ids: []});
            //chrome.storage.local.set({rem_id_n: 0})
            //alert("ERROR: ID column in excel is probably empty.")
            continue;
        }

        if (ids[0] == ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(id_col), r:i})].w) {
            found_id = [true, -1];
            await chrome.storage.local.get(["rem_id_n"], (data) =>{chrome.storage.local.set({rem_id_n: data.rem_id_n-1})});

            let text_field = row_elem.getElementsByClassName("w90 center")[0].getElementsByTagName("input")[0];
            let new_value = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(kod_col), r:i})];
            if (new_value != undefined) {text_field.value = new_value.w;}

            text_field = row_elem.getElementsByClassName("w40 center")[0].getElementsByTagName("input")[0];
            new_value = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(dost_col), r:i})];
            if (new_value != undefined) {text_field.value = new_value.w;}

            text_field = row_elem.getElementsByClassName("w40 center")[1].getElementsByTagName("input")[0];
            new_value = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(cena_col), r:i})];
            if (new_value != undefined) {text_field.value = new_value.w;}

            text_field = row_elem.getElementsByClassName("w75 center")[0].getElementsByTagName("input")[0];
            new_value = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(prio_col), r:i})];
            if (new_value != undefined) {text_field.value = new_value.w;}
        }
    }

    ids.splice(0, 1);
    await chrome.storage.local.set({rem_ids: ids});

    if (!found_id[0]) {
        chrome.storage.local.get(["miss_ids"], (data) => {chrome.storage.local.set({miss_ids: data.miss_ids+found_id[1]+'\n'});});
    }
    
    let not_done_n = (await chrome.storage.local.get(["rem_id_n"])).rem_id_n;
    if (ids.length == 0 && not_done_n != 0) {
        chrome.storage.local.get(["miss_ids"], (data) => {alert(not_done_n+" IDs not found.\n"+data.miss_ids)});
    }


    let submit_button = row_elem.getElementsByClassName("w75 center")[0].getElementsByTagName("input")[1];
    submit_button.click(); // YIPPPEEEEEEE :steamhappy:
}
