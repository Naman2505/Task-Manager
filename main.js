const taskButton = document.querySelector(".task-button");
const progressCent = document.querySelector(".progress-percent");
const noTask = document.querySelector(".no-task");
const taskList = document.querySelector(".task-list");

let tasks = 0;
let completedTask = 0;

taskButton.addEventListener("click", () => {
    const taskInput = document.querySelector("#taskInput");
    if (taskInput.value !== "") createTask(taskInput.value);
    taskInput.value = "";
});


document.addEventListener("keypress", (e)=>{
    if(e.code == "Enter"){
        const taskInput = document.querySelector("#taskInput");
        if (taskInput.value !== "") createTask(taskInput.value);
        taskInput.value = "";
    }
});

function createTask(val) {

    const noTask = document.querySelector(".no-task");
    tasks++;
    if (noTask) {
        taskList.removeChild(noTask);
    }

    // Create a new task element
    var newTask = document.createElement("div");
    newTask.className = "task";

    // Checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";

    // Checkbox event listener to update completion percentage
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            completedTask++;
        } else {
            completedTask--;
        }
        // Update the completion percentage
        updateProgress();
    });

    // Task name
    var taskName = document.createElement("p");
    taskName.textContent = val;

    // Delete Button
    var deleteButton = document.createElement("button");
    deleteButton.className = "task-deletion";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        if (checkbox && checkbox.checked) {
            completedTask--;
            // Update the completion percentage after updating completedTask
            updateProgress();
        }
        tasks--;
        //removing tasks
        newTask.remove();

        // If there are no tasks remaining, display "No Task" message
        if (taskList.childElementCount === 1) {
            const noTaskMessage = document.createElement("div");
            noTaskMessage.className = "task";
            noTaskMessage.classList.add("no-task");

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "task-check";

            // Task name
            var taskName = document.createElement("p");
            taskName.textContent = "No Task";

            // Delete Button
            var deleteButton = document.createElement("button");
            deleteButton.className = "task-deletion";
            deleteButton.textContent = "Delete";

            noTaskMessage.appendChild(checkbox);
            noTaskMessage.appendChild(taskName);
            noTaskMessage.appendChild(deleteButton);

            taskList.appendChild(noTaskMessage);
        }

        // Update the completion percentage after deletion
        updateProgress();
    };

    // appending all components to new Task
    newTask.appendChild(checkbox);
    newTask.appendChild(taskName);
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);

    // Update the completion percentage after adding a new task
    updateProgress();
}

function updateProgress() {
    if (tasks !== 0) {
        const completionPercentage = (completedTask / tasks) * 100;
        progressCent.innerText = completionPercentage.toFixed(2); // two decimal places
    } else {
        progressCent.innerText = "0.00";
    }
}
