import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createTaskSchema, updateTaskSchema } from '../validation/task.validation';

const router = Router();

// All task routes require authentication
router.use(requireAuth);

// Task CRUD operations
router.post(
  '/',
  validate(createTaskSchema),
  taskController.createTask.bind(taskController)
);

router.get('/', taskController.getUserTasks.bind(taskController));

router.get('/:id', taskController.getTask.bind(taskController));

router.put(
  '/:id',
  validate(updateTaskSchema),
  taskController.updateTask.bind(taskController)
);

router.delete('/:id', taskController.deleteTask.bind(taskController));

export default router;