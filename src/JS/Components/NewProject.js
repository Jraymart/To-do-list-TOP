export default function createProjectInput() {
    const dialog = document.querySelector("#task-dialog");
    const taskform = document.createElement("form");
    taskform.id = "project-form";
    const h1 = document.createElement("h1");
    h1.textContent = "NEW PROJECT";
    taskform.appendChild(h1);

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

    taskform.appendChild(title);
    taskform.appendChild(hr);
    taskform.appendChild(div);

    return taskform;

};