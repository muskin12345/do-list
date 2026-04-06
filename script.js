document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateCounter();
});

function addTask() {
    let input = document.getElementById("taskInput");
    if (input.value === "") return;

    createTask(input.value, false);
    input.value = "";
    saveTasks();
}

function createTask(text, completed) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = text;
    if (completed) span.classList.add("completed");

    span.onclick = () => {
        span.classList.toggle("completed");
        saveTasks();
        updateCounter();
    };

    let edit = document.createElement("button");
    edit.textContent = "✏️";
    edit.onclick = () => {
        let newText = prompt("Edit task:", span.textContent);
        if (newText) {
            span.textContent = newText;
            saveTasks();
        }
    };

    let del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = () => {
        li.remove();
        saveTasks();
        updateCounter();
    };

    li.append(span, edit, del);
    document.getElementById("taskList").appendChild(li);
    updateCounter();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        let text = li.querySelector("span").textContent;
        let completed = li.querySelector("span").classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTask(t.text, t.completed));
}

function searchTask() {
    let value = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll("li").forEach(li => {
        li.style.display = li.innerText.toLowerCase().includes(value) ? "" : "none";
    });
}

function filterTasks(type) {
    document.querySelectorAll("li").forEach(li => {
        let completed = li.querySelector("span").classList.contains("completed");

        if (type === "all") li.style.display = "";
        else if (type === "completed") li.style.display = completed ? "" : "none";
        else li.style.display = !completed ? "" : "none";
    });
}

function updateCounter() {
    let total = document.querySelectorAll("li").length;
    let completed = document.querySelectorAll(".completed").length;
    document.getElementById("counter").textContent =
        `Total: ${total} | Completed: ${completed}`;
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}
