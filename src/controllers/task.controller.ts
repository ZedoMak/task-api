import { Request, Response } from 'express';
import { taskService } from '../services/task.service';
import { CreateTaskInput, UpdateTaskInput } from '../validation/task.validation';
import { AuthenticatedRequest, ApiResponse } from '../types';

export class TaskController {
  // Create task
  async createTask(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const { title, description }: CreateTaskInput = req.body;
      const userId = req.user.userId;
      
      const task = taskService.createTask(title, userId, description);
      
      const response: ApiResponse = {
        success: true,
        data: { task },
        message: 'Task created successfully',
      };
      
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create task',
      };
      res.status(400).json(response);
    }
  }
  
  // Get all tasks for user
  async getUserTasks(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const userId = req.user.userId;
      const tasks = taskService.getUserTasks(userId);
      const stats = taskService.getUserTaskStats(userId);
      
      const response: ApiResponse = {
        success: true,
        data: { tasks, stats },
        message: 'Tasks retrieved successfully',
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get tasks',
      };
      res.status(400).json(response);
    }
  }
  
  // Get single task
  async getTask(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const { id } = req.params;
      const userId = req.user.userId;
      
      const task = taskService.getTask(id, userId);
      
      if (!task) {
        const response: ApiResponse = {
          success: false,
          error: 'Task not found or access denied',
        };
        return res.status(404).json(response);
      }
      
      const response: ApiResponse = {
        success: true,
        data: { task },
        message: 'Task retrieved successfully',
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get task',
      };
      res.status(400).json(response);
    }
  }
  
  // Update task
  async updateTask(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const { id } = req.params;
      const updates: UpdateTaskInput = req.body;
      const userId = req.user.userId;
      
      const task = taskService.updateTask(id, userId, updates);
      
      if (!task) {
        const response: ApiResponse = {
          success: false,
          error: 'Task not found or access denied',
        };
        return res.status(404).json(response);
      }
      
      const response: ApiResponse = {
        success: true,
        data: { task },
        message: 'Task updated successfully',
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update task',
      };
      res.status(400).json(response);
    }
  }
  
  // Delete task
  async deleteTask(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const { id } = req.params;
      const userId = req.user.userId;
      
      const deleted = taskService.deleteTask(id, userId);
      
      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          error: 'Task not found or access denied',
        };
        return res.status(404).json(response);
      }
      
      const response: ApiResponse = {
        success: true,
        message: 'Task deleted successfully',
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete task',
      };
      res.status(400).json(response);
    }
  }
}

export const taskController = new TaskController();