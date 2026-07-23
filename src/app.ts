import Orientate from "./GUItARvision/GuitarVision";

interface Task {
    id: number;
    text: string;
}

let tasks: Task[] = [
    { id: 1, text: "Cover the main theme of Undertale happily" },
    { id: 2, text: "Embark Towards Life: Shown through Guitar" }
];

const welcomeMsg = document.getElementById("welcome-msg") as HTMLParagraphElement;
const pageTitle = document.getElementById("page-title") as HTMLHeadingElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const addTaskBtn = document.getElementById("add-task-btn") as HTMLButtonElement;

const navDashboard = document.getElementById("nav-dashboard") as HTMLLIElement;
const navSettings = document.getElementById("nav-settings") as HTMLLIElement;
const viewDashboard = document.getElementById("view-dashboard") as HTMLDivElement;
const viewSettings = document.getElementById("view-settings") as HTMLDivElement;

function switchView(targetView: 'dashboard' | 'settings'): void {
    if (targetView === 'dashboard') {
        navDashboard.classList.add("active");
        navSettings.classList.remove("active");
        
        viewDashboard.classList.remove("hidden");
        viewSettings.classList.add("hidden");
        
        pageTitle.textContent = "My Shelf";
        welcomeMsg.textContent = "Welcome back! Here you will find jaw-dropping and awe-inspiring tunes of (y)ours . . . ";
    } else {
        
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

function renderTasks(): void {
    if (!taskList) return;
    taskList.innerHTML = "";
    
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        taskList.appendChild(li);
    });
}

function addNewTask(): void {
    const text = taskInput.value.trim();
    if (text === "") return;

    const newTask: Task = {
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
    taskInput.addEventListener("keypress", (e: KeyboardEvent) => {
        if (e.key === "Enter") addNewTask();
    });
}

renderTasks();

function App() {

    return (

        <Orientate />

    );
    
}