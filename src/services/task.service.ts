import { taskModel } from '../models/task.model';
import { Task, TaskStatus } from '../types';

class TaskService {
  // Create task
  createTask(title: string, userId: string, description?: string): Task {
    return taskModel.create(title, userId, description);
  }
  
  // Get user's tasks
  getUserTasks(userId: string): Task[] {
    return taskModel.findByUserId(userId);
  }
  
  // Get single task
  getTask(taskId: string, userId: string): Task | null {
    const task = taskModel.findById(taskId);
    
    // Check if task belongs to user
    if (!task || task.userId !== userId) {
      return null;
    }
    
    return task;
  }
  
  // Update task
  updateTask(
    taskId: string,
    userId: string,
    updates: { title?: string; description?: string; status?: TaskStatus }
  ): Task | null {
    // First, verify user owns the task
    const task = this.getTask(taskId, userId);
    if (!task) return null;
    
    return taskModel.update(taskId, updates) || null;
  }
  
  // Delete task
  deleteTask(taskId: string, userId: string): boolean {
    // First, verify user owns the task
    const task = this.getTask(taskId, userId);
    if (!task) return false;
    
    return taskModel.delete(taskId);
  }
  
  // Get task statistics
  getUserTaskStats(userId: string) {
    const tasks = this.getUserTasks(userId);
    
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
    };
  }
}

export const taskService = new TaskService();