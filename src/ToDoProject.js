//handles groups of tasks
import ToDoItem from './ToDoItem.js';

export default class ToDoProject{
    constructor(todoItems = [], title)
    {   
        this.id = title === "Personal" ? "Personal" : Math.random().toString().split(".")[1];
        this.title = title;
        this.todoItems = todoItems;
    }

    addItem(newItem){
        if (newItem instanceof ToDoItem){
            this.todoItems.push(newItem);
        }
        
    }

    removeItem(itemId){
        const index = this.todoItems.findIndex((item) => item.id === itemId);
        if (index === -1){
            return;
        }
        this.todoItems.splice(index,1);
    }
    getProjectName(){
        return this.title;
    }
    getTasks(){
        return this.todoItems;
    }
}
