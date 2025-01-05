import newTaskForm from "./JS/Components/NewTask.js";
import newProjectForm from "./JS/Components/NewProject.js";

export default class Nav {
    constructor(
    ) {
        this.newTask = document.querySelectorAll('.newTask');
        this.newProject = document.querySelector('.newProject');
        this.dialog = document.querySelector('#task-dialog');
        this.overlay = document.querySelector('.overlay');
        this.addEventListeners();
    }

    addEventListeners() {
        //add a new task
        this.newTask.forEach((button) => {
            button.addEventListener("click", this.openTaskDialog.bind(this));
        });

        //add a new project
        if (this.newProject) {
            this.newProject.addEventListener("click", this.openProjectDialog.bind(this));
        };
    }

    openTaskDialog() {
        this.overlay.innerHTML = ``;
        this.overlay.appendChild(newTaskForm());
        this.dialog.showModal();
    }

    openProjectDialog() {
        this.overlay.innerHTML = ``;
        this.overlay.appendChild(newProjectForm());
        this.dialog.showModal();
    }
}