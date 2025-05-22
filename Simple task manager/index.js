"use strict";
// The task class
class Task {
    constructor(description) {
        this.id = Task.nextId++;
        this.description = description;
        this.createdAt = new Date();
        this.completed = false;
        this.completedAt = null;
    }
    markComplete() {
        this.completed = true;
        console.log(`this task was completed at ${(this.completedAt = new Date())}`);
    }
    updateDescription(newDescription) {
        this.description = newDescription;
        console.log(`${this.description} has been updated successfully`);
    }
}
Task.nextId = 1;
// The task manager
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    addTask(description) {
        const task = new Task(description);
        this.tasks.push(task);
        console.log(`New task has been added`);
        return task;
    }
    updateTask(id, newDescription) {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) {
            console.log("task not found");
        }
        task === null || task === void 0 ? void 0 : task.updateDescription(newDescription);
    }
    completeTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) {
            console.log("Task not found");
        }
        task === null || task === void 0 ? void 0 : task.markComplete();
    }
    listTasks() {
        console.log(this.tasks);
    }
    listCompletedTasks() {
        return this.tasks.filter((t) => t.completed);
    }
    deleteTask(id) {
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index === -1) {
            console.log("Task not found");
        }
        console.log(`${this.tasks.splice(index, 1)} is deleted successfully.`);
    }
}
const manager = new TaskManager();
manager.addTask("Write Code");
manager.addTask("Watch Movie");
manager.completeTask(1);
manager.updateTask(2, "Clean the entire house");
