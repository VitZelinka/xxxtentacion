// Unordered lists
let ulNew = document.getElementById("newGoods");
let ulEdit = document.getElementById("editGoods");
let ulList = document.getElementById("listGoods");

// URL Add-buttons
let bAddNew = document.getElementById("buttonAddNew");
let bAddEdit = document.getElementById("buttonAddEdit");
let bAddList = document.getElementById("buttonAddList");

bAddNew.onclick = () => {AddURLToStorage("new", document.getElementById("addNew").value)};
bAddEdit.onclick = () => {AddURLToStorage("edit", document.getElementById("addEdit").value)};
bAddList.onclick = () => {AddURLToStorage("list", document.getElementById("addList").value)};

UpdateURLLists();

function AddURLToStorage(urlType, urlString) {
    try {
        new URL(urlString);
    } catch (error) {
        console.log("Entered string is not a valid URL.");
        return;
    }
    let storageName;
    switch (urlType) {
        case "new":
            storageName = "newGoodsURLs";
            break;
        case "edit":
            storageName = "editGoodsURLs";
            break;
        case "list":
            storageName = "listGoodsURLs";
            break;
        default:
            return;
    }
    chrome.storage.sync.get([storageName], (data) => {
        let URLarray = [urlString]; 
        if (Object.values(data)[0] != null) {
            Object.values(data)[0].forEach(element => URLarray.push(element));
        }
        let obj = {};
        obj[storageName] = URLarray;
        chrome.storage.sync.set(obj);
        UpdateURLLists();
    });
}


const DelURLFunc = function() {
    let index = parseInt(this.parentElement.getAttribute("name"));
    let urlType = this.parentElement.parentElement.getAttribute("id");
    let storageName;
    switch (urlType) {
        case "newGoods":
            storageName = "newGoodsURLs";
            break;
        case "editGoods":
            storageName = "editGoodsURLs";
            break;
        case "listGoods":
            storageName = "listGoodsURLs";
            break;
        default:
            return;
    }
    chrome.storage.sync.get([storageName], (data) => {
        if (Object.values(data)[0] != null) {
            Object.values(data)[0].splice(index, 1);
        }
        let obj = {};
        obj[storageName] = Object.values(data)[0];
        chrome.storage.sync.set(obj, () => {UpdateURLLists()});
    });
}

function AddListURLItem(ul, urlString) {
    let li = document.createElement("li");
    let delButton = document.createElement("button");
    delButton.onclick = DelURLFunc;
    delButton.innerHTML = "X";
    li.innerHTML = urlString;
    li.setAttribute("name", ul.childElementCount);
    li.appendChild(delButton);
    ul.appendChild(li);
}

//chrome.storage.sync.set({newGoodsURLs: null}); 

function UpdateURLLists() {
    ulNew.innerHTML = '';
    ulEdit.innerHTML = '';
    ulList.innerHTML = '';
    chrome.storage.sync.get(["newGoodsURLs"], (data) => {
        if (data.newGoodsURLs == undefined || data.newGoodsURLs == null) return;
        data.newGoodsURLs.forEach(element => {
            AddListURLItem(ulNew, element);
        });
    });
    chrome.storage.sync.get(["editGoodsURLs"], (data) => {
        if (data.editGoodsURLs == undefined || data.editGoodsURLs == null) return;
        data.editGoodsURLs.forEach(element => {
            AddListURLItem(ulEdit, element);
        });
    });
    chrome.storage.sync.get(["listGoodsURLs"], (data) => {
        if (data.listGoodsURLs == undefined || data.listGoodsURLs == null) return;
        data.listGoodsURLs.forEach(element => {
            AddListURLItem(ulList, element);
        });
    });
}


//chrome.storage.sync.set()