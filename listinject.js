console.log("XDDXDXD YIPPPPEEEEEE");

chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.edit === "startEdit") {
            console.log(FindByID(await chrome.storage.local.get(["id"])));
        }
    }
);

function FindByID(stored_id) {
    let ids = document.getElementsByClassName("w35 center");
    for (let i = 0; i < ids.length; i++) {
        const row_id = ids[i].childNodes[0].innerHTML;
        console.log(row_id, stored_id.id);
        if (row_id == stored_id.id) {
            return ids[i].parentElement;
        }
    }
    return false;
}