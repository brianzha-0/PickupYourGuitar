"use strict";
let tasks = [
    { id: 1, text: "Build a responsive web application layout" },
    { id: 2, text: "Connect TypeScript compiler functionality" }
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
        pageTitle.textContent = "My Dashboard";
        welcomeMsg.textContent = "Welcome! Managing performance fluidly across Laptop & Mobile layouts.";
    }
    else {
        navDashboard.classList.remove("active");
        navSettings.classList.add("active");
        viewDashboard.classList.add("hidden");
        viewSettings.classList.remove("hidden");
        pageTitle.textContent = "Application Settings";
        welcomeMsg.textContent = "Customize and configure your app behaviors here.";
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
    welcomeMsg.textContent = "Welcome! Managing performance fluidly across Laptop & Mobile layouts.";
}
if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener("click", addNewTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter")
            addNewTask();
    });
}
renderTasks();
