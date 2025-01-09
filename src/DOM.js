import ProjectManager from "./JS/Classes/ProjectManager.js";
import TaskManager from "./JS/Classes/TaskManager.js";

import createTaskInput from "./JS/Components/NewTaskForm.js";
import createProjectInput from "./JS/Components/NewProjectForm.js";

export default class DOM {
    constructor() {
        this.projectList = document.querySelector("#project-list");

        this.dialog = document.querySelector("#task-dialog");
        this.overlay = document.querySelector(".overlay");

        this.addEventListeners();
    }

    addEventListeners() {
        // Add event listeners for the project creation
        const newProjectButton = document.querySelector(".newProject");
        if (newProjectButton) {
            newProjectButton.addEventListener("click", this.openProjectDialog.bind(this));
        }

        const newTaskButtons = document.querySelectorAll(".newTask");
        newTaskButtons.forEach((button) =>{
            button.addEventListener("click", this.openTaskDialog.bind(this));
        })
        
        // Add event listener for all tasks
        const allTasksButton = document.querySelector(".task.all");
        if(allTasksButton){
            allTasksButton.addEventListener("click", ()=> TaskManager.renderAllTasks());
        }
        // Add event listener for completed tasks
        const completedTaskButton = document.querySelector(".task.complete");
        if(completedTaskButton){
            completedTaskButton.addEventListener("click", ()=> TaskManager.renderCompletedTasks());  
        }
    }

    renderProjects() {
        ProjectManager.renderProjects(this.projectList);
        TaskManager.renderAllTasks();
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

}