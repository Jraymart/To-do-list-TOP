//handles groups of projects globally
import ToDoProject from './ToDoProject.js';

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
}