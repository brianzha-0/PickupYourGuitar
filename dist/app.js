"use strict";
// Initial state
let tasks = [
    { id: 1, text: "Build a responsive web application layout" },
    { id: 2, text: "Connect TypeScript compiler functionality" }
];
// DOM Element references with strict TypeScript casting
const welcomeMsg = document.getElementById("welcome-msg");
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
// Function to print current active tasks to the screen
function renderTasks() {
    if (!taskList)
        return;
    taskList.innerHTML = ""; // Clear current view
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        taskList.appendChild(li);
    });
}
// Interactivity: Add a new element to array
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
    taskInput.value = ""; // Reset box
}
// Initialize Application Core
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
