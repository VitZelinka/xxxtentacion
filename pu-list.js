
let nukeButton = document.getElementById("nukeButton");
nukeButton.onclick = StartNuking;
let idListButton = document.getElementById("idListButton");
idListButton.onclick = ListIDs;


async function StartNuking() {
    let fileInput = document.getElementById('fileInput');
    console.log(fileInput.files.length);
    if (fileInput.files.length > 0) {
        let data = fileInput.files[0];
        data = await data.arrayBuffer();
        let workbook = XLSX.read(data);
        await chrome.storage.local.set({workbook: workbook});
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {edit: "startEditExcel"});
    });
}


async function ListIDs() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {edit: "listids"});
    });
}