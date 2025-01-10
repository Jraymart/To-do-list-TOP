import ProjectManager from "./JS/Classes/ProjectManager.js";
import TaskManager from "./JS/Classes/TaskManager.js";
import DOM from "./DOM.js";

import "./styles/reset.css";
import "./styles/style.css";

// Create a project and add it to ProjectManager

document.addEventListener('DOMContentLoaded', () => {
    ProjectManager.loadFromLocalStorage();
     // Create a default project only if no projects exist
     if (ProjectManager.getAllProjects().length === 0) {
        ProjectManager.createProject('Personal');
    }
    
    const domHandler = new DOM();
    domHandler.renderProjects();



    TaskManager.renderAllTasks(); // Render tasks after loading
});