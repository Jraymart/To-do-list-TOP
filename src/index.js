import ProjectManager from "./ProjectManager";
import DOM from "./DOM";

import "./styles/reset.css";
import "./styles/style.css";

// Create a project and add it to ProjectManager
const project = ProjectManager.createProject('Personal');

const domHandler = new DOM();
domHandler.renderProjects();
