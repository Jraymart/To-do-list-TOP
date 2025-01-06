import ProjectManager from "./ProjectManager";
import TaskManager from "./TaskManager";

import ToDoItem from './ToDoItem.js';


import createTaskInput from "./JS/Components/NewTaskForm.js";
import createProjectInput from "./JS/Components/NewProjectForm.js";

export default class DOM {
    constructor() {
        this.tasklistContainerh1 = document.querySelector(".task-list-container > h1")
        this.projectList = document.querySelector("#project-list");
        this.taskContainer = document.querySelector(".task-list");
        this.dialog = document.querySelector("#task-dialog");
        this.overlay = document.querySelector(".overlay"); // Add overlay if you want
        this.addEventListeners();
    }

    addEventListeners() {
        // Add event listeners for the project creation
        const newProjectButton = document.querySelector(".newProject");
        if (newProjectButton) {
            newProjectButton.addEventListener("click", this.openProjectDialog.bind(this));
        }
    }

    renderProjects() {
        // Clear the current list
        this.projectList.innerHTML = '';

        // Get all projects from ProjectManager
        const projects = ProjectManager.getAllProjects();

        // Render each project as an <li>
        projects.forEach((project) => {
            const projectListItem = document.createElement("li");
            const projectButton = document.createElement("button");
            projectButton.type = "button";
            projectButton.classList.add(project.getProjectName());
            projectButton.classList.add("project");
            projectButton.textContent = project.getProjectName();
            projectListItem.appendChild(projectButton);

            // Event listener to show tasks for the selected project
            projectButton.addEventListener("click", () => this.renderTasks(project.id));

            this.projectList.appendChild(projectListItem);
        });
    }

    renderTasks(projectId) {
        // Clear current task list
        this.taskContainer.innerHTML = '';

        // Get the project by its ID
        const project = ProjectManager.getProjectById(projectId);
        
        // Get all tasks for the project
        const tasks = TaskManager.getTasks(project);

        this.tasklistContainerh1.textContent = project.getProjectName();
        const hr = document.createElement("hr");
        this.tasklistContainerh1.appendChild(hr);

        // Render each task
        tasks.forEach((task) => {
            const taskItem = document.createElement("div");

            const checkbox = document.createElement("input");
                        
            checkbox.type = "checkbox";
            checkbox.id = task.id;
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", () => {
                task.toggleComplete();
                checkbox.checked = task.completed;
                this.updateTask(task,taskItem);
            });

            const label = document.createElement("label");
            label.setAttribute("for", checkbox.id);
            label.textContent = task.title;
            
            taskItem.appendChild(checkbox);
            taskItem.appendChild(label);
            
            this.updateTask(task,taskItem);

            this.taskContainer.appendChild(taskItem);
        });
    }

    openTaskDialog() {
        this.overlay.innerHTML = "";
        this.overlay.appendChild(createTaskInput()); // Make sure createTaskInput is imported
        this.dialog.showModal();
    }

    openProjectDialog() {
        this.overlay.innerHTML = "";
        this.overlay.appendChild(createProjectInput()); // Make sure createProjectInput is imported
        this.dialog.showModal();
    }

    updateTask(task, taskItem){
        const label = taskItem.querySelector('label');
        if (task.completed){
            label.classList.add('completed');
            console.log(label.textContent);
        }else{
            if (label.className == "completed"){
                label.classList.remove('completed');
            }
        }
    }
}