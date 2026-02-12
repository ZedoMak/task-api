import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middleware/validation.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import { rateLimit } from '../middleware/validation.middleware';
import { registerSchema, loginSchema, refreshTokenSchema } from '../validation/auth.validation';

const router = Router();

// Public routes
router.post(
  '/register',
  rateLimit(5, 15 * 60 * 1000), // 5 attempts per 15 minutes
  validate(registerSchema),
  authController.register.bind(authController)
);

router.post(
  '/login',
  rateLimit(10, 15 * 60 * 1000), // 10 attempts per 15 minutes
  validate(loginSchema),
  authController.login.bind(authController)
);

router.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  authController.refreshToken.bind(authController)
);

router.post('/logout', authController.logout.bind(authController));

// Protected routes (require authentication)
router.get(
  '/me',
  requireAuth,
  authController.getCurrentUser.bind(authController)
);

export default router;