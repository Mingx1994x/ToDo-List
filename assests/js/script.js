

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
        const newTask = document.createElement("li");
        newTask.innerText = task;

        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        newTask.appendChild(deleteButton);

        newTask.onclick = checkItem;
        deleteButton.onclick = deleteItem;

        list.appendChild(newTask);
        input.value = "";
    }
}

function checkItem(e) {
    // console.log("checked");
    const item = e.target;
    item.classList.toggle("checked");
}

function deleteItem(e) {
    // console.log("delete");
    const item = this.parentNode;
    const deleteItem = item.parentNode;
    deleteItem.removeChild(item);
}

const addButton = document.querySelector("button#add-btn");
addButton.addEventListener("click", () => {
    addItem();
});

const form = document.querySelector("form.input-wrapper");
form.addEventListener("submit", event => {
    event.preventDefault();
});

