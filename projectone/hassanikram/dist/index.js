"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "Go to Gym"),
    new todoItem_1.TodoItem(2, "Shower"),
    new todoItem_1.TodoItem(3, "Buy Groceries from the shop")
];
let collection = new todoCollection_1.TodoCollection("Hassan", todos);
console.clear();
console.log(`${collection.userName}'s Todo List `
    + `(${collection.getItemCounts().incomplete} items to do)`);
console.log(`${collection.userName}'s Todo List`);
let newId = collection.addTodo("Call Sarmad");
let todoItem = collection.getTodoById(newId);
// console.log(JSON.stringify(todoItem));
// todoItem.printDetails();
collection.removeComplete();
collection.getTodoItems(true).forEach(item => item.printDetails());
// collection.addTodo(todoItem)
