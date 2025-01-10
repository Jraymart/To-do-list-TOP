import ProjectManager from "./JS/Classes/ProjectManager.js";
import TaskManager from "./JS/Classes/TaskManager.js";

import createTaskInput from "./JS/Components/NewTaskForm.js";
import createProjectInput from "./JS/Components/NewProjectForm.js";

export default class DOM {
    constructor() {
        this.projectList = document.querySelector("#project-list");
        this.dialog = document.querySelector("#task-dialog");
        this.overlay = document.querySelector(".overlay");

        // Bind methods to ensure correct context
        this.openTaskDialog = this.openTaskDialog.bind(this);
        this.openProjectDialog = this.openProjectDialog.bind(this);
        this.addEventListeners();
    }

    addEventListeners() {
        const hamMenu = document.querySelector("#hamburger");
        const navigation = document.querySelector("#navbar");
        if (!hamMenu._listenerAdded) {
            hamMenu.addEventListener("click", () => {
                this.toggleHamMenu(hamMenu,navigation);
            });
            hamMenu._listenerAdded = true;
        }

        // Add event listeners for the project creation
        const newProjectButton = document.querySelector(".newProject");
        if (newProjectButton) {
            newProjectButton.addEventListener("click", () => {
                this.openProjectDialog();
            });
        }

        const newTaskButtons = document.querySelectorAll(".newTask");
        newTaskButtons.forEach((button) => {
            button.addEventListener("click", () => {
                this.openTaskDialog();
                this.closeHamMenu();
            });
        })

        // Add event listener for all tasks
        const allTasksButton = document.querySelector(".task.all");
        if (allTasksButton) {
            allTasksButton.addEventListener("click", () => {
                TaskManager.renderAllTasks();
                this.closeHamMenu();
            });
        }
        // Add event listener for completed tasks
        const completedTaskButton = document.querySelector(".task.complete");
        if (completedTaskButton) {
            completedTaskButton.addEventListener("click", () => {
                TaskManager.renderCompletedTasks();
                this.closeHamMenu();
            });
        }

        // Add event listeners for Project buttons using delegation
        this.projectList.addEventListener("click", (event) => {
            const target = event.target.closest("button");
            if (target && target.classList.contains("project")) {
                this.closeHamMenu(); // Close the hamburger menu
            }
        });
    }

    renderProjects() {
        ProjectManager.renderProjects(this.projectList);
        TaskManager.renderAllTasks();
    }

    openTaskDialog() {
        this.overlay.innerHTML = "";
        this.overlay.appendChild(createTaskInput()); // Make sure createTaskInput is imported
        this.dialog.showModal();
        this.addEventListeners();

    }

    openProjectDialog() {
        this.overlay.innerHTML = "";
        this.overlay.appendChild(createProjectInput()); // Make sure createProjectInput is imported
        this.dialog.showModal();
        this.addEventListeners();
    }

    closeHamMenu() {
        // This ensures the hamburger menu is closed
        const hamMenu = document.querySelector("#hamburger");
        const navigation = document.querySelector("#navbar");
        hamMenu.classList.remove("open");
        navigation.classList.remove("open");
    }
    toggleHamMenu(hamMenu, navigation) {
        // Toggle the classes for the hamburger menu
        hamMenu.classList.toggle("open");
        navigation.classList.toggle("open");
    }
}