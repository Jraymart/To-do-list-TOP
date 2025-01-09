//Handles anything relating to tasks or ToDo's
export default class ToDoItem {
    constructor(
        title,
        description,
        dueDate,
        priority,
        projectId,
        completed = false,
    ){
        this.id = Math.random().toString().split(".")[1];
        this.createdAt = new Date();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        this.completed = completed ;
    }

    toggleComplete() {
        this.completed = !this.completed
    }
};