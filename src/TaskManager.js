//handle task related operations within a project
import ToDoItem from './ToDoItem';
import ProjectManager from './ProjectManager';


export default class TaskManager{
    static createTask(project, task){
        const newTask = new ToDoItem(
            task.title,
            task.description,
            task.dueDate,
            task.priority,
            project.id
        )
        project.addItem(newTask);
    }

    static removeTask(project, taskId){
        project.removeItem(taskId);
    }

    static getTasks(project, excludeCompleted = false){
        if(excludeCompleted){
            return project.getTasks().filter(task => !task.completed);
        }
        return project.getTasks();
    }

    //Render Tasks
    static renderTasks(projectId){
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
            allTasks = allTasks.concat(this.getTasks(project, true));
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
            const tasks = this.getTasks(project);
            completedTasks = completedTasks.concat(tasks.filter(task => task.completed));
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
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = task.id;
        checkbox.checked = task.completed;

        const taskItemDescription = document.createElement("div");
        const descriptionText = document.createElement("p");
        taskItemDescription.appendChild(descriptionText);
        descriptionText.textContent = task.description;

        checkbox.addEventListener("change", () => {
            task.toggleComplete();
            checkbox.checked = task.completed;
            this.updateTask(task, taskDiv);

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

        const label = document.createElement("label");
        label.setAttribute("for", checkbox.id);
        label.textContent = task.title;

        taskItemName.appendChild(checkbox);
        taskItemName.appendChild(label);
        taskDiv.appendChild(taskItemName)
        taskDiv.appendChild(taskItemDescription);
        this.updateTask(task, taskItemName);

        return taskDiv;
    }

    static updateTask(task, taskItem){
        const label = taskItem.querySelector('label');
        if (task.completed) {
            label.classList.add("completed");
        } else {
            label.classList.remove("completed");
        }

    }
}

function hideTaskBtn(){
    const taskbtn = document.querySelector(".listbutton");
    taskbtn.style.visibility = "hidden";
}

function showTaskbtn(){
    const taskbtn = document.querySelector(".listbutton");
    taskbtn.style.visibility = "visible";
}