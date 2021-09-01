import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from "inquirer";
import { JsonTodoCollection } from "./jsonTodoCollection";

let todos: TodoItem[] = [
  new TodoItem(1, "Go to Gym"),
  new TodoItem(2, "Shower"),
  new TodoItem(3, "Buy Groceries from the shop"),
];

let collection: TodoCollection = new JsonTodoCollection("Hassan", todos);
let showCompleted = true;
console.clear();
console.log(
  `${collection.userName}'s Todo List ` +
    `(${collection.getItemCounts().incomplete} items to do)`
);
// console.log(`${collection.userName}'s Todo List`)

function displayTodoList(): void {
  console.log(
    `${collection.userName}'s Todo List ` +
      `(${collection.getItemCounts().incomplete} items to do)`
  );
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

enum Commands {
  Add = "Add New Task",
  Complete = "Complete Task",
  Update = "Update a Task",
  Toggle = "Show/Hide Completed",
  Purge = "Remove Completed Tasks",
  Quit = "Quit",
}
function promptAdd(): void {
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
function promptUpdate(): void {
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
      let selectedTaskId = answers["select"] as number[];
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
function promptComplete(): void {
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
      let completedTasks = answers["complete"] as number[];
      collection
        .getTodoItems(true)
        .forEach((item) =>
          collection.markComplete(
            item.id,
            completedTasks.find((id) => id === item.id) != undefined
          )
        );
      promptUser();
    });
}
function promptUser(): void {
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
          } else {
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
function then(arg0: (answers: any) => void) {
  throw new Error("Function not implemented.");
}
