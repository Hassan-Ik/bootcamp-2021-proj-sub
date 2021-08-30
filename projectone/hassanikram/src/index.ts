import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from 'inquirer';

let todos: TodoItem[] = [
    new TodoItem(1, "Go to Gym"),
    new TodoItem(2, "Shower"),
    new TodoItem(3, "Buy Groceries from the shop")
]

let collection: TodoCollection = new TodoCollection("Hassan", todos)
let showCompleted = true;
console.clear()
console.log(`${collection.userName}'s Todo List `
 + `(${ collection.getItemCounts().incomplete } items to do)`);
console.log(`${collection.userName}'s Todo List`)

function displayTodoList(): void {
    console.log(`${collection.userName}'s Todo List `
    + `(${ collection.getItemCounts().incomplete } items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
   }

enum Commands {
    Toggle = "Show/Hide Completed",
    Quit = "Quit"
}

function displayTodoList(): void {
    console.log(`${collection.userName}'s Todo List `
    + `(${ collection.getItemCounts().incomplete } items to do)`);
    collection.getTodoItems(true).forEach(item => item.printDetails());
   }
   enum Commands {
    Quit = "Quit"
   }
   function promptUser(): void {
    console.clear();
    displayTodoList();
    inquirer.prompt({
    type: "list",
    name: "command",
    message: "Choose option",
    choices: Object.values(Commands),
    badProperty: true
    }).then(answers => {
        if (answers["command"] !== Commands.Quit) {
            promptUser();
            }
            })
           }
promptUser(); 