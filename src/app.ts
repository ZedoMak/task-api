import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { config } from './config/env';

// Create Express application
const app = express();
const PORT = config.port;

// ========== MIDDLEWARE SETUP ==========
// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// Body parser middleware
app.use(express.json());      // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware (custom)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ========== ROUTES ==========
app.use('/api', routes);

// ========== ERROR HANDLING ==========
app.use(errorHandler);

// ========== START SERVER ==========
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 API Documentation:`);
    console.log(`   POST   http://localhost:${PORT}/api/auth/register`);
    console.log(`   POST   http://localhost:${PORT}/api/auth/login`);
    console.log(`   GET    http://localhost:${PORT}/api/auth/me`);
    console.log(`   POST   http://localhost:${PORT}/api/tasks`);
    console.log(`   GET    http://localhost:${PORT}/api/tasks`);
    console.log(`\n🔒 Remember to set JWT_SECRET in production!`);
  });
}

export default app;