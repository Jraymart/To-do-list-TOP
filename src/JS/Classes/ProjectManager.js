//handles groups of projects globally
import ToDoProject from './ToDoProject.js';
import TaskManager from './TaskManager.js';
import ToDoItem from './ToDoItem.js';

export default class ProjectManager {
    static projects = [];

    static saveToLocalStorage() {
        const data = this.projects.map((project) => ({
            id: project.id,
            title: project.title,
            tasks: project.getTasks().map(task => ({
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                completed: task.completed,
                id: task.id,
            })),
        }));
        localStorage.setItem('projects', JSON.stringify(data));
    }

    static loadFromLocalStorage() {
        const data = localStorage.getItem('projects');
        if (data) {
            const parsedProjects = JSON.parse(data);
            this.projects = parsedProjects.map((projectData) => {
                const project = new ToDoProject([], projectData.title);
                project.id = projectData.id;

                // Recreate ToDoItem instances and add them to the project
                projectData.tasks.forEach((taskData) => {
                    const taskItem = new ToDoItem(
                        taskData.title,
                        taskData.description,
                        taskData.dueDate,
                        taskData.priority,
                        project.id,
                        taskData.completed 
                    );
                    taskItem.id = taskData.id;
                    project.addItem(taskItem);
                });

                return project;
            });
        }
    }
    static createProject(title) {
        const newProject = new ToDoProject([], title);
        this.projects.push(newProject);
        this.saveToLocalStorage();
        return newProject;
    }

    static removeProject(projectId) {
        this.projects = this.projects.filter(project => project.id !== projectId);
        this.saveToLocalStorage();
    }

    static getAllProjects() {
        return this.projects;
    }

    static getProjectById(projectId) {
        return this.projects.find((project) => project.id === projectId);
    }

    static renderProjects(projectList) {
        projectList.innerHTML = '';

        const projects = ProjectManager.getAllProjects();

        projects.forEach((project) => {
            const projectListItem = document.createElement("li");
            const projectButton = document.createElement("button");
            const delProject = document.createElement("button");
            delProject.classList.add("del-project");
            delProject.type = "button";

            projectButton.type = "button";
            projectButton.classList.add(project.getProjectName().replace(/\s+/g, '-'));
            projectButton.classList.add("project");
            projectButton.textContent = project.getProjectName();
            projectListItem.appendChild(projectButton);
            projectListItem.appendChild(delProject);
            projectButton.addEventListener("click", () => TaskManager.renderTasks(project.id));
            delProject.addEventListener("click", ()=> {
                ProjectManager.removeProject(project.id);
                ProjectManager.renderProjects(projectList);
            });
            projectList.appendChild(projectListItem);
        });
    }
}