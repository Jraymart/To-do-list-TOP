import ProjectManager from "../Classes/ProjectManager.js";
import DOM from "../../DOM.js";
export default function createProjectInput() {
    const dialog = document.querySelector("#task-dialog");
    const projectForm = document.createElement("form");
    projectForm.id = "project-form";

    const h1 = document.createElement("h1");
    h1.textContent = "NEW PROJECT";
    projectForm.appendChild(h1);

    const title = document.createElement("input");
    title.type = "text";
    title.id = "new-project-title";
    title.placeholder = "The next big thing!";
    title.required = true;

    const hr = document.createElement("hr");

    const div = document.createElement("div");
    div.className = "form-actions";
    const cancel = document.createElement("button");
    cancel.className = "cancel-button";
    cancel.type = "button";
    cancel.textContent = "Cancel";

    const submit = document.createElement("button");
    submit.className = "confirm-button";
    submit.type = "submit";
    submit.textContent = "Add Project";

    div.appendChild(cancel);
    div.appendChild(submit);
    cancel.addEventListener("click", () => {
        dialog.close();
    });

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get the new project title
        const newTitle = title.value.trim();
        if (newTitle) {
            // Add the project to the ProjectManager
            const newProject = ProjectManager.createProject(newTitle);

            const projectList = document.querySelector("#project-list");
            const newListItem = document.createElement("li");
            const newListButton = document.createElement("button");
            newListButton.type = "button";
            newListButton.className = newProject.getProjectName() + " project";
            newListButton.textContent = newProject.getProjectName();
            newListItem.appendChild(newListButton);
            projectList.appendChild(newListItem);
        }

        const dom = new DOM();
        dom.renderProjects();

        dialog.close();
    });

    projectForm.appendChild(title);
    projectForm.appendChild(hr);
    projectForm.appendChild(div);

    return projectForm;

};