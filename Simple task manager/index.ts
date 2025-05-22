// The task class
class Task {
  static nextId: number = 1;
  id: number;
  description: string;
  createdAt: Date;
  completed: boolean;
  completedAt: Date | null;
  constructor(description: string) {
    this.id = Task.nextId++;
    this.description = description;
    this.createdAt = new Date();
    this.completed = false;
    this.completedAt = null;
  }
  markComplete(): void {
    this.completed = true;
    console.log(
      `this task was completed at ${(this.completedAt = new Date())}`
    );
  }
  updateDescription(newDescription: string): void {
    this.description = newDescription;
    console.log(`${this.description} has been updated successfully`);
  }
}
// The task manager
class TaskManager {
  private tasks: Task[] = [];

  addTask(description: string): Task {
    const task = new Task(description);

    this.tasks.push(task);
    console.log(`New task has been added`);

    return task;
  }

  updateTask(id: number, newDescription: string): void {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      console.log("task not found");
    }

    task?.updateDescription(newDescription);
  }

  completeTask(id: number): void {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      console.log("Task not found");
    }

    task?.markComplete();
  }

  listTasks(): void {
    console.log(this.tasks);
  }

  listCompletedTasks(): Task[] {
    return this.tasks.filter((t) => t.completed);
  }

  deleteTask(id: number): void {
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
