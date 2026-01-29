// Create new task
const form = document.getElementById("task_form");
const input = document.getElementById("task-input");
const todo_lane = document.getElementById("todo");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;
    
    if (!value) return;
    
    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;
    
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });
    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });
    todo_lane.appendChild(newTask);
    input.value = "";
});


// Drag and drop tasks
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".column");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const currentTask = document.querySelector(".is-dragging");

        if (!bottomTask) {
            zone.appendChild(currentTask);
        }
        else{
            zone.insertBefore(currentTask, bottomTask);
        }
    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};

