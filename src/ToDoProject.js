//handles groups of tasks
export default class ToDoProject{
    constructor(todoItems = [], title)
    {   
        this.id = title === "Home" ? "Home" : Math.random().toString().split(".")[1];
        this.title = title;
        this.todoItems = todoItems;
    }

    addItem(newItem){
        this.todoItems.push(newItem);
    }

    removeItem(itemId){
        const index = this.todoItems.findIndex((item) => item.id === itemId);
        if (index === -1){
            return;
        }
        this.todoItems.splice(index,1);
    }
    getTasks(){
        return this.todoItems;
    }
}
