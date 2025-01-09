//handle task related operations within a project
import ToDoItem from './ToDoItem.js';
import ProjectManager from './ProjectManager.js';

export default class TaskManager {
    static createTask(project, task) {
        const newTask = new ToDoItem(
            task.title,
            task.description,
            task.dueDate,
            task.priority,
            project.id
        );
        project.addItem(newTask);
        ProjectManager.saveToLocalStorage();
    }

    static removeTask(project, taskId) {
        if (!project) {
            console.error("Cannot remove task. Project is undefined.");
            return;
        }
        project.removeItem(taskId);
        ProjectManager.saveToLocalStorage();
    }

    static getTasks(project, excludeCompleted = false) {
        let tasks = project.getTasks();
        if (excludeCompleted) {
            tasks = tasks.filter(task => !task.completed);
        }

        tasks.sort((taskA, taskB) => {
            const dueDateA = new Date(taskA.dueDate);
            const dueDateB = new Date(taskB.dueDate);

            if (dueDateA - dueDateB !== 0) {
                return dueDateA - dueDateB;
            }

            return taskA.priority - taskB.priority;
        });
        console.log(tasks);
        return tasks;
    }

    //Render Tasks
    static renderTasks(projectId) {
        const taskContainer = document.querySelector('.task-list');
        const containerH1 = document.querySelector('.task-list-container > h1');
        const hr = document.createElement("hr");

        const project = ProjectManager.getProjectById(projectId);
        const tasks = this.getTasks(project, true);


        taskContainer.innerHTML = '';
        containerH1.textContent = project.getProjectName();
        containerH1.appendChild(hr);

        tasks.forEach((task) => {
            const taskItem = this.renderTaskItem(task, projectId);
            taskContainer.appendChild(taskItem);
        });
        showTaskbtn();
    }

    static renderAllTasks() {
        const taskContainer = document.querySelector('.task-list');
        taskContainer.innerHTML = '';

        const projects = ProjectManager.getAllProjects();
        let allTasks = [];

        projects.forEach((project) => {
            allTasks = allTasks.concat(
                project.getTasks().filter(task => !task.completed).map(task => {
                    if (!(task instanceof ToDoItem)) {
                        task = new ToDoItem(
                            task.title,
                            task.description,
                            task.dueDate,
                            task.priority,
                            task.projectId
                        );
                    }
                    return task;
                })
            );
        });

        const containerH1 = document.querySelector('.task-list-container > h1');
        containerH1.textContent = "All Tasks";
        const hr = document.createElement("hr");
        containerH1.appendChild(hr);

        allTasks.forEach((task) => {
            const taskItem = this.renderTaskItem(task);
            taskContainer.appendChild(taskItem);
        });

        showTaskbtn();
    }

    static renderCompletedTasks() {
        const taskContainer = document.querySelector(".task-list");
        taskContainer.innerHTML = "";

        const projects = ProjectManager.getAllProjects();
        let completedTasks = [];

        projects.forEach((project) => {
            const tasks = project.getTasks().filter(task => task.completed);
            completedTasks = completedTasks.concat(
                tasks.map(task => {
                    if (!(task instanceof ToDoItem)) {
                        task = new ToDoItem(
                            task.title,
                            task.description,
                            task.dueDate,
                            task.priority,
                            task.projectId
                        );
                    }
                    return task;
                })
            );
        });
        const containerH1 = document.querySelector(".task-list-container > h1");
        containerH1.textContent = "Completed Tasks";
        const hr = document.createElement("hr");
        containerH1.appendChild(hr);

        completedTasks.forEach((task) => {
            const taskItem = this.renderTaskItem(task);
            taskContainer.appendChild(taskItem);
        });

        hideTaskBtn();

    }

    static renderTaskItem(task, projectId) {
        const taskDiv = document.createElement("div");
        const taskItemName = document.createElement("div");
        const hr = document.createElement("hr");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = task.id;
        checkbox.checked = task.completed;


        const label = document.createElement("label");
        label.setAttribute("for", checkbox.id);
        label.textContent = task.title;

        const taskItemDescriptionDiv = document.createElement("div");
        const descriptionText = document.createElement("p");
        descriptionText.classList.add("description");
        descriptionText.textContent = task.description;

        const priorityDiv = document.createElement("div");
        priorityDiv.className = "date-priority";


        const taskDue = document.createElement("p");
        taskDue.classList.add("due-date");
        taskDue.textContent = "Due Date: " + task.dueDate;

        const priority = document.createElement("p");
        priority.classList.add("priority");
        switch (task.priority) {
            case "1":
                priority.textContent = "HIGH";
                priority.classList.add("high");
                break;
            case "2":
                priority.textContent = "MEDIUM";
                priority.classList.add("medium");
                break;
            case "3":
                priority.textContent = "LOW";
                priority.classList.add("low");
                break;
        };

        priorityDiv.appendChild(taskDue);
        priorityDiv.appendChild(priority);

        const taskDel = document.createElement("button");
        taskDel.type = "button"
        taskDel.classList.add("delbtn");


        taskDel.addEventListener("click", () => {
            const project = projectId ? ProjectManager.getProjectById(projectId) : ProjectManager.getProjectById(task.projectId);
            if (project) {
                TaskManager.removeTask(project, task.id);

                if (projectId) {
                    this.renderTasks(projectId); 
                } else {
                    if (document.querySelector('.task-list-container > h1').textContent === 'All Tasks') {
                        this.renderAllTasks();
                    } else if (document.querySelector('.task-list-container > h1').textContent === 'Completed Tasks') {
                        this.renderCompletedTasks();
                    }
                }
            } else {
                console.error("Cannot delete task. Project not found.");
            }
        });

        checkbox.addEventListener("change", () => {
            console.log(task instanceof ToDoItem);
            task.toggleComplete();
            checkbox.checked = task.completed;
            this.updateTask(task, taskDiv);
            ProjectManager.saveToLocalStorage();

            if (!task.completed) {
                this.renderCompletedTasks();
            } else {
                if (projectId) {
                    this.renderTasks(projectId);
                } else {
                    this.renderAllTasks();
                }
            }
        });

        taskItemDescriptionDiv.appendChild(descriptionText);
        taskItemDescriptionDiv.appendChild(priorityDiv);
        taskItemName.appendChild(checkbox);
        taskItemName.appendChild(label);
        taskItemName.appendChild(taskDel);
        taskDiv.appendChild(taskItemName)
        taskDiv.appendChild(taskItemDescriptionDiv);
        taskDiv.appendChild(hr)
        this.updateTask(task, taskDiv);

        return taskDiv;
    }

    static updateTask(task, taskItem) {
        const label = taskItem.querySelector('label');
        const description = taskItem.querySelector(".description");
        const dueDate = taskItem.querySelector(".due-date");
        if (task.completed) {
            label.classList.add("completed");
            description?.classList.add("completed");
            dueDate?.classList.add("completed");
            dueDate.textContent = "Completed";
        } else {
            label.classList.remove("completed");
            description?.classList.remove("completed");
            dueDate?.classList.remove("completed");
        }
        ProjectManager.saveToLocalStorage();
    }
}

function hideTaskBtn() {
    const taskbtn = document.querySelector(".listbutton");
    taskbtn.style.visibility = "hidden";
}

function showTaskbtn() {
    const taskbtn = document.querySelector(".listbutton");
    taskbtn.style.visibility = "visible";
}