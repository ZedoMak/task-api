import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../types';

// In-memory task storage
class TaskModel {
  private tasks: Map<string, Task> = new Map();
  
  // Create task
  create(title: string, userId: string, description?: string): Task {
    const now = new Date();
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: 'pending',
      userId,
      createdAt: now,
      updatedAt: now,
    };
    
    this.tasks.set(task.id, task);
    return task;
  }
  
  // Get task by ID
  findById(id: string): Task | undefined {
    return this.tasks.get(id);
  }
  
  // Get user's tasks
  findByUserId(userId: string): Task[] {
    return Array.from(this.tasks.values())
      .filter(task => task.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  // Update task
  update(id: string, updates: Partial<Task>): Task | undefined {
    const task = this.findById(id);
    if (!task) return undefined;
    
    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }
  
  // Delete task
  delete(id: string): boolean {
    return this.tasks.delete(id);
  }
  
  // Get all tasks (for testing)
  getAll(): Task[] {
    return Array.from(this.tasks.values());
  }
}

export const taskModel = new TaskModel();