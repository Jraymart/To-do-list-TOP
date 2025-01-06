import ProjectManager from "./ProjectManager";
import DOM from "./DOM";
import Nav from "./Nav.js";

import "./styles/reset.css";
import "./styles/style.css";


const navHandler = new Nav();

// Create a project and add it to ProjectManager
const project = ProjectManager.createProject('Personal');

const domHandler = new DOM();
domHandler.renderProjects();

// Optionally, render tasks for the first project
if (project) {
    domHandler.renderTasks(project.id);
}

// Debugging logs
console.log('Project: ', project);
console.log('Task: ', project.getTasks());