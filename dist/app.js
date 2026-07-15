"use strict";
let tasks = [
    { id: 1, text: "Cover the main theme of UNDERTALE happily" },
    { id: 2, text: "Embark Towards Life: Shown through Guitar" }
];
const welcomeMsg = document.getElementById("welcome-msg");
const pageTitle = document.getElementById("page-title");
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const navDashboard = document.getElementById("nav-dashboard");
const navSettings = document.getElementById("nav-settings");
const viewDashboard = document.getElementById("view-dashboard");
const viewSettings = document.getElementById("view-settings");
function switchView(targetView) {
    if (targetView === 'dashboard') {
        navDashboard.classList.add("active");
        navSettings.classList.remove("active");
        viewDashboard.classList.remove("hidden");
        viewSettings.classList.add("hidden");
        pageTitle.textContent = "My Shelf";
        welcomeMsg.textContent = "Welcome back! Here you will find jaw-dropping and awe-inspiring tunes of (y)ours . . . ";
    }
    else {
        navDashboard.classList.remove("active");
        navSettings.classList.add("active");
        viewDashboard.classList.add("hidden");
        viewSettings.classList.remove("hidden");
        pageTitle.textContent = "Fine Tuning";
        welcomeMsg.textContent = "Where preference meets perfomance.";
    }
}
if (navDashboard && navSettings) {
    navDashboard.addEventListener("click", (e) => {
        e.preventDefault();
        switchView('dashboard');
    });
    navSettings.addEventListener("click", (e) => {
        e.preventDefault();
        switchView('settings');
    });
}
function renderTasks() {
    if (!taskList)
        return;
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        taskList.appendChild(li);
    });
}
function addNewTask() {
    const text = taskInput.value.trim();
    if (text === "")
        return;
    const newTask = {
        id: Date.now(),
        text: text
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = "";
}
if (welcomeMsg) {
    welcomeMsg.textContent = "Greetings! Great things are waiting to be done!!";
}
if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener("click", addNewTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter")
            addNewTask();
    });
}
renderTasks();
