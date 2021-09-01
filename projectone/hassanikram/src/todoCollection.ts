import ListPrompt = require("inquirer/lib/prompts/list");
import { TodoItem } from "./todoItem";

type ItemCounts = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  private nextId: number = 1;
  protected itemMap = new Map<number, TodoItem>();
  constructor(public userName: string, todoItems: TodoItem[] = []) {
    todoItems.forEach((item) => this.itemMap.set(item.id, item));
  }

  addTodo(task: string): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
    return this.nextId;
  }
  getTodoById(id: number): TodoItem {
    return this.itemMap.get(id);
  }
  getTodoItems(includeComplete: boolean): TodoItem[] {
    return [...this.itemMap.values()].filter(
      (item) => includeComplete || !item.complete
    );
  }
  updateTodo(id: number, task: string) {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.task = task;
    }
  }
  markComplete(id: number, complete: boolean) {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.complete = complete;
    }
  }
  removeComplete() {
    this.itemMap.forEach((item) => {
      if (item.complete) {
        this.itemMap.delete(item.id);
      }
    });
  }
  getItemCounts(): ItemCounts {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length,
    };
  }
}
