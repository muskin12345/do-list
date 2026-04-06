document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    createTask(taskText, false);
    saveTasks();
    input.value = "";
}

function createTask(text, completed) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = text;
    if (completed) span.classList.add("completed");

    span.onclick = function () {
        span.classList.toggle("completed");
        saveTasks();
    };

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        let newText = prompt("Edit task:", span.textContent);
        if (newText) {
            span.textContent = newText;
            saveTasks();
        }
    };

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").textContent;
        let completed = li.querySelector("span").classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
}
