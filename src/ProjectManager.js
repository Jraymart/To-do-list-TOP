//handles groups of projects globally
import ToDoProject from './ToDoProject.js';
import TaskManager from './TaskManager.js';


export default class ProjectManager {
    static projects = [];

    static createProject(title){
        const newProject = new ToDoProject([], title);
        this.projects.push(newProject);
        return newProject;
    }

    static getAllProjects() {
        return this.projects;
    }

    static getProjectById(projectId) {
        return this.projects.find((project) => project.id === projectId);
    }

    //renders ProjectList in DOM
    static renderProjects(projectList){
        projectList.innerHTML='';

        const projects = ProjectManager.getAllProjects();

        projects.forEach((project) =>{
            const projectListItem = document.createElement("li");
            const projectButton = document.createElement("button");
            projectButton.type = "button";
            projectButton.classList.add(project.getProjectName());
            projectButton.classList.add("project");
            projectButton.textContent = project.getProjectName();
            projectListItem.appendChild(projectButton);

            // Event listener to show tasks for the selected project
            projectButton.addEventListener("click", () => TaskManager.renderTasks(project.id));

            projectList.appendChild(projectListItem);
        });
    }
}