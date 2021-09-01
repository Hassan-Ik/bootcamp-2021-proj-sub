"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const inquirer = require("inquirer");
const jsonTodoCollection_1 = require("./jsonTodoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "Go to Gym"),
    new todoItem_1.TodoItem(2, "Shower"),
    new todoItem_1.TodoItem(3, "Buy Groceries from the shop"),
];
let collection = new jsonTodoCollection_1.JsonTodoCollection("Hassan", todos);
let showCompleted = true;
console.clear();
console.log(`${collection.userName}'s Todo List ` +
    `(${collection.getItemCounts().incomplete} items to do)`);
// console.log(`${collection.userName}'s Todo List`)
function displayTodoList() {
    console.log(`${collection.userName}'s Todo List ` +
        `(${collection.getItemCounts().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Complete"] = "Complete Task";
    Commands["Update"] = "Update a Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear();
    inquirer
        .prompt({ type: "input", name: "add", message: "Enter task:" })
        .then((answers) => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
function promptUpdate() {
    console.clear();
    inquirer
        .prompt({
        type: "checkbox",
        name: "select",
        message: "Select Task to update",
        choices: collection.getTodoItems(showCompleted).map((item) => ({
            name: item.task,
            value: item.id,
            // checked: item.id,
        })),
    })
        .then((answers) => {
        let selectedTaskId = answers["select"];
        console.log(selectedTaskId);
        //   console.log(selectedTaskId[0]);
        // let selectedTask = collection.getTodoById(selectedTaskId)
        inquirer
            .prompt({ type: "input", name: "update", message: "Enter New Task:" })
            .then((answers) => {
            if (answers["update"] !== "") {
                collection.updateTodo(selectedTaskId[0], answers["update"]);
            }
            promptUser();
        });
    });
}
function promptComplete() {
    console.clear();
    inquirer
        .prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showCompleted).map((item) => ({
            name: item.task,
            value: item.id,
            checked: item.complete,
        })),
    })
        .then((answers) => {
        let completedTasks = answers["complete"];
        collection
            .getTodoItems(true)
            .forEach((item) => collection.markComplete(item.id, completedTasks.find((id) => id === item.id) != undefined));
        promptUser();
    });
}
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer
        .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands),
        // badProperty: true
    })
        .then((answers) => {
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Update:
                promptUpdate();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}
promptUser();
function then(arg0) {
    throw new Error("Function not implemented.");
}
