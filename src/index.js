import ToDoItem from "./ToDoItem";
import ToDoProject from "./ToDoProject";
import Nav from "./Nav.js";


import "./styles/reset.css";
import "./styles/style.css";
//test webpack setup of index.js
const project = new ToDoProject([], 'Personal');
console.log("test index.js");
const task1 = new ToDoItem(
    'buy groceries',
    'milk + bread',
    '2025-01-10',
    'high',
    project.title
);


project.addItem(task1);

const domHandler = new Nav();
console.log(domHandler.newTask);

console.log('Project: ', project);
console.log('Todo: ', project.getTasks());