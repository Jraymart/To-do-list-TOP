import ToDoItem from "./ToDoItem";
import ToDoProject from "./ToDoProject";
import "./styles/reset.css";
import "./styles/style.css";
//test webpack setup of index.js
const project = new ToDoProject([], 'Home');
console.log("test index.js");
const task1 = new ToDoItem(
    'buy groceries',
    'milk + bread',
    '2025-01-10',
    'high',
    project.title
);


project.addItem(task1);
console.log('Project: ', project);
console.log('Todo: ', project.getTasks());