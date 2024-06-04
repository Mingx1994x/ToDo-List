// 全域變數宣告...
let userList = [];
const STATE_KEY = "todo-list";

// 函式： 讀取任務
function loadList() {
    let mylist = localStorage.getItem(STATE_KEY);
    if (mylist !== null) return JSON.parse(mylist);
    return [];
}
// 函式： 儲存任務
function storeList(list) {
    localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

// 函式： 初始化任務
function initList() {
    // load myState
    userList = loadList();

    // 測試用userList
    // let userList = [{ task: "排球少年電影", checked: true },
    // { task: "獵人試驗", checked: false }];

    // render myList
    const myList = document.getElementById("list");
    userList.forEach((element) => {
        const myTask = document.createElement("li");
        myTask.innerText = element.item;

        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        myTask.appendChild(deleteButton);

        if (element.checked) {
            myTask.classList.add("checked");
        }
        myList.appendChild(myTask);

        //設定按鈕功能
        myTask.onclick = checkItem;
        deleteButton.onclick = deleteItem;
    });
}

//函式： 新增任務
function addItem() {
    // 測試addButton監聽
    // console.log("add Items");
    const input = document.getElementById("input");
    let task = input.value;
    // 測試input 
    // console.log(task);
    const list = document.querySelector("ul#list");
    if (task === "") {
        alert("請輸入任務");
        return;
    } else {
        //新增任務list html
        const newTask = document.createElement("li");
        newTask.innerText = task;

        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        newTask.appendChild(deleteButton);

        //設定按鈕功能
        newTask.onclick = checkItem;
        deleteButton.onclick = deleteItem;

        // 新增任務內容html=> .li{task+deleteButton}
        list.appendChild(newTask);

        // 儲存任務資料至localstorage
        userList.push({ item: task, checked: false });
        storeList(userList);

        // 清空input欄位
        input.value = "";
    }
}

//函式： 勾選完成任務
function checkItem(e) {
    // console.log("checked");
    const item = e.target;
    const parent = item.parentNode;
    let taskIdx = Array.from(parent.childNodes).indexOf(item);

    userList[taskIdx].checked = !userList[taskIdx].checked;
    item.classList.toggle("checked");

    storeList(userList);
}

//函式： 刪除任務
function deleteItem() {
    // console.log("delete");
    const deleteList = this.parentNode;
    const deleteItem = deleteList.parentNode;
    let deleteIdx = Array.from(deleteItem.childNodes).indexOf(deleteList);

    userList.splice(deleteIdx, 1);
    deleteItem.removeChild(deleteList);

    storeList(userList);
}

// 執行 
initList();

const addButton = document.querySelector("button#add-btn");
addButton.addEventListener("click", () => {
    addItem();
});

const form = document.querySelector("form.input-wrapper");
form.addEventListener("submit", event => {
    event.preventDefault();
});

