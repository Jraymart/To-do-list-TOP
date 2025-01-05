//Handles anything relating to tasks or ToDo's
export default class ToDoItem {
    constructor(
        title,
        description,
        dueDate,
        priority,
        parentProjectId,
        completed,
    ){
        this.id = Math.random().toString().split(".")[1];
        this.createdAt = new Date();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.parentProjectId = parentProjectId;
        this.completed = false;
    }
    toggleComplete() {
        this.completed = !this.completed
    }
};