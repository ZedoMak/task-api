import { Router } from 'express';
import authRoutes from './auth.routes';
import taskRoutes from './task.routes';
import { notFoundHandler } from '../middleware/error.middleware';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

// 404 handler for API routes
router.use('*', notFoundHandler);

export default router;