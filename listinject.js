
console.log("XDDXDXD YIPPPPEEEEEE");

//UpdateRowElementOnRefresh();

window.onload = function() {    
    UpdateRowElementOnRefresh();
};

/*
document.addEventListener('DOMContentLoaded', function() {
    UpdateRowElementOnRefresh();
});
*/


chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.edit === "startEditExcel") {
            await chrome.storage.local.set({miss_ids: ""});
            //StoreAllIDs();
            //DoNuking();
            // new part
            FindAndStoreRowIDs();
            UpdateRowElementOnRefresh();
        } else if (request.edit === "listids") {
            LogAllIDs();
            LogAllNames();
        }
    }
);


function GetRowObjectByID(id) {
    let row_element;
    let row_elements = document.getElementsByClassName("w35 center");
    
    for (let i = 0; i < row_elements.length; i++) {
        if (parseInt(row_elements[i].childNodes[0].innerHTML) == id) {
            row_element = row_elements[i].parentElement;
            break;
        }
    }

    return {
        kod_e: row_element.querySelector("#kodZbozi1"),
        dost_e: row_element.querySelector("#dostupnost"),
        cena_e: row_element.querySelector("#prodejnicena"),
        prio_e: row_element.querySelector("#prioritazbozi"),
        button_e: row_element.getElementsByClassName("w75 center")[0].getElementsByTagName("input")[1]
    }
}


function FindAndStoreRowIDs() {
    let row_ids = [];
    let ids = document.getElementsByClassName("w35 center");
    
    for (let i = 0; i < ids.length; i++) {
        row_ids.push(parseInt(ids[i].childNodes[0].innerHTML));
    }

    chrome.storage.local.set({row_ids: row_ids});
}


async function UpdateRowElementOnRefresh() {
    const opts = (await chrome.storage.sync.get(["excelOptions"])).excelOptions;
    const wb = (await chrome.storage.local.get(["workbook"])).workbook;
    const ws = wb.Sheets[opts.sheet];
    let row_ids = (await chrome.storage.local.get(["row_ids"])).row_ids;
    let row;
    // if no rows are left to update, return
    if (row_ids.length < 1) {return;} 

    // try getting row count from excel, if empty, throw error
    try {
        ex_n_rows = XLSX.utils.decode_range(ws["!ref"]).e.r + 1;
    } catch (error) {
        chrome.storage.local.set({row_ids: []});
        alert("ERROR: Excel is probably empty.")
        return;
    }

    for (let j = 0; j < row_ids.length; j++) {
        // prepare row object to be used
        let row_id = row_ids[0];
        let found_id = false;
        let do_save = false;
        
        // for every row in excel
        for (let i = 0; i < ex_n_rows; i++) {
            // if row in excel is empty, skip it
            if (ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.id), r:i})] == undefined) {
                continue;
            }
            
            // check if row id is equal to excel row id
            if (row_id == ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.id), r:i})].w) {
                found_id = true;
                
                row = GetRowObjectByID(row_id);

                const ex_kod = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.kod), r:i})];
                const ex_dost = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.dost), r:i})];
                const ex_cena = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.cena), r:i})];
                const ex_prio = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.prio), r:i})];

                if (ex_kod != undefined && ex_kod.w != row.kod_e.value) {row.kod_e.value = ex_kod.w; do_save = true;}
                if (ex_dost != undefined && ex_dost.w != row.dost_e.value) {row.dost_e.value = ex_dost.w; do_save = true;}
                if (ex_cena != undefined && ex_cena.w != row.cena_e.value) {row.cena_e.value = ex_cena.w; do_save = true;}
                if (ex_prio != undefined && ex_prio.w != row.prio_e.value) {row.prio_e.value = ex_prio.w; do_save = true;}
                
                break;
            }
        }
    
        if (!found_id) {
            // TODO: save to persistent storage, alert all not found ids at the end
        }
        
        row_ids.shift();
        chrome.storage.local.set({row_ids: row_ids});

        if (do_save) {
            row.button_e.click();
            return;
        }
    }
}



/*
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
    //submit_button.click(); // YIPPPEEEEEEE :steamhappy:
}
*/