//handle task related operations within a project
import ToDoItem from './ToDoItem';
import ToDoProject from './ToDoProject';

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

    static getTasks(project){
        return project.getTasks();
    }
}