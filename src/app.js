let tasks = [
    { id: 1, text: "Cover the main theme of Undertale happily" },
    { id: 2, text: "Embark Towards Life: Shown through Guitar" }
];

document.addEventListener("DOMContentLoaded", () => {
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
        if (targetView === "dashboard") {
            if (navDashboard) navDashboard.classList.add("active");
            if (navSettings) navSettings.classList.remove("active");

            if (viewDashboard) viewDashboard.classList.remove("hidden");
            if (viewSettings) viewSettings.classList.add("hidden");

            if (pageTitle) pageTitle.textContent = "Mainframe Studio";
            if (welcomeMsg) welcomeMsg.textContent = "From mellow melodies to captivating compositions, arriving here is a (stepping) (s)tool for musical creation. Hear, hear!";
        } else if (targetView === "settings") {
            if (navDashboard) navDashboard.classList.remove("active");
            if (navSettings) navSettings.classList.add("active");

            if (viewDashboard) viewDashboard.classList.add("hidden");
            if (viewSettings) viewSettings.classList.remove("hidden");

            if (pageTitle) pageTitle.textContent = "Studio Tuning";
            if (welcomeMsg) welcomeMsg.textContent = "Turn Over the Page and Pick Up the Pace — Where preference meets performance.";
        }
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
        if (!taskInput)
            return;

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

    if (navDashboard) {
        navDashboard.addEventListener("click", (e) => {
            e.preventDefault();
            switchView("dashboard");
        });
    }

    if (navSettings) {
        navSettings.addEventListener("click", (e) => {
            e.preventDefault();
            switchView("settings");
        });
    }

    if (addTaskBtn) {
        addTaskBtn.addEventListener("click", addNewTask);
    }

    if (taskInput) {
        taskInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                addNewTask();
            }
        });
    }

    switchView("dashboard");
    renderTasks();
});