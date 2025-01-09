import TaskManager from "../Classes/TaskManager.js";
import ProjectManager from "../Classes/ProjectManager.js";

export default function createTaskInput() {
    const dialog = document.querySelector("#task-dialog");
    const taskform = document.createElement("form");
    taskform.id = "task-form";

    const h1 = document.createElement("h1");
    h1.textContent = "NEW TASK";


    let inputDiv = document.createElement("div");
    const title = document.createElement("input");
    title.type = "text";
    title.id = "new-task-title";
    title.placeholder = "What do you want to call your task?";
    title.required = true;

    const description = document.createElement("input");
    description.type = "text";
    description.id = "new-task-description";
    description.placeholder = "What do you need to do?";

    inputDiv.appendChild(title);
    inputDiv.appendChild(description);
    taskform.appendChild(h1);
    taskform.appendChild(inputDiv);

    inputDiv = document.createElement("div");
    const date = document.createElement("input");
    date.type = "date";
    date.id = "new-task-due";
    date.valueAsDate = new Date();
    inputDiv.appendChild(date);

    let innerDiv = document.createElement("div");
    const priorityLabel = document.createElement("label");
    priorityLabel.for = "priority"
    priorityLabel.textContent = "Priority";

    const prioritySelect = document.createElement("select");
    prioritySelect.name = "priority";
    prioritySelect.id = "new-task-priority";

    for (let i = 1; i <= 3; i++) {
        let option = document.createElement("option");
        option.value = i;
        switch (i) {
            case 1: option.textContent = "High";
                prioritySelect.appendChild(option);
                break;
            case 2: option.textContent = "Medium";
                prioritySelect.appendChild(option);
                break;
            case 3: option.textContent = "Low";
                prioritySelect.appendChild(option);
            default:
                break;
        }
    }

    innerDiv.appendChild(priorityLabel);
    innerDiv.appendChild(prioritySelect);

    inputDiv.appendChild(innerDiv);
    taskform.appendChild(inputDiv);

    const hr = document.createElement("hr");
    taskform.appendChild(hr);

    inputDiv = document.createElement("div");
    inputDiv.id = "actions";

    const projectSelect = document.createElement("select");
    projectSelect.id = "new-task-project-selector";

    const projects = ProjectManager.getAllProjects();

    projects.forEach((project) => {
        const projectOptions = document.createElement("option");
        projectOptions.value = project.id;
        projectOptions.textContent = project.getProjectName();
        projectSelect.appendChild(projectOptions);
    });

    inputDiv.appendChild(projectSelect);

    innerDiv = document.createElement("div");
    innerDiv.className = "form-actions";

    const cancel = document.createElement("button");
    cancel.className = "cancel-button";
    cancel.type = "button";
    cancel.textContent = "Cancel";

    innerDiv.appendChild(cancel);
    cancel.addEventListener("click", () => {
        dialog.close();
    });

    const submit = document.createElement("button");
    submit.className = "confirm-button";
    submit.type = "submit";
    submit.textContent = "Add Task";

    innerDiv.appendChild(submit);

    inputDiv.appendChild(innerDiv);
    taskform.appendChild(inputDiv);

    taskform.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskData = {
            title: title.value,
            description: description.value,
            dueDate: date.value,
            priority: prioritySelect.value,
            completed: false,
        };

        const selectedProjectId = projectSelect.value;
        const selectedProject = ProjectManager.getProjectById(selectedProjectId);
        TaskManager.createTask(selectedProject, taskData);
        
        TaskManager.renderTasks(selectedProjectId);

        dialog.close();
    });

    return taskform;
}

