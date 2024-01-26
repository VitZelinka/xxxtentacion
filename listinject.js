
console.log("XDDXDXD YIPPPPEEEEEE");

setTimeout(() => {
    UpdateRowElementOnRefresh();  
}, 100);

//UpdateRowElementOnRefresh();

/*
window.onload = function() {    
    UpdateRowElementOnRefresh();
};
*/
/*
document.addEventListener('DOMContentLoaded', function() {
    UpdateRowElementOnRefresh();
});
*/


chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.edit === "startEditExcel") {
            FindAndStoreRowIDs();
            UpdateRowElementOnRefresh();
        } else if (request.edit === "listids") {
            UpdateRowElementOnRefresh();
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
    try {
        if (row_ids.length < 1) {return;} 
    } catch (error) {
        chrome.storage.local.set({row_ids: []});
        return;
    }

    let ex_n_rows;
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
        let do_save = false;
        
        // for every row in excel
        for (let i = 0; i < ex_n_rows; i++) {
            // if row in excel is empty, skip it
            if (ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.id), r:i})] == undefined) {
                continue;
            }
            
            // check if row id is equal to excel row id
            if (row_id == ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.id), r:i})].w) {
                
                row = GetRowObjectByID(row_id);

                const ex_kod = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.kod), r:i})];
                const ex_dost = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.dost), r:i})];
                const ex_cena = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.cena), r:i})];
                const ex_prio = ws[XLSX.utils.encode_cell({c:XLSX.utils.decode_col(opts.prio), r:i})];

                if (ex_kod != undefined && ex_kod.w != row.kod_e.value) {row.kod_e.value = ex_kod.w; do_save = true;}
                if (ex_dost != undefined && ex_dost.w != row.dost_e.value) {row.dost_e.value = ex_dost.w; do_save = true;}
                if (ex_cena != undefined && parseInt(ex_cena.w) != parseInt(row.cena_e.value)) {row.cena_e.value = ex_cena.w; do_save = true;}
                if (ex_prio != undefined && ex_prio.w != row.prio_e.value) {row.prio_e.value = ex_prio.w; do_save = true;}
                
                break;
            }
        }
        
        row_ids.shift();
        await chrome.storage.local.set({row_ids: row_ids});

        if (do_save) {
            row.button_e.click();
            return;
        }
    }
}