import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import { AuthenticatedRequest, ApiResponse } from '../types';

// Middleware to check if user is authenticated
export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = {
        success: false,
        error: 'No token provided',
      };
      return res.status(401).json(response);
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    const decoded = verifyToken(token);
    
    // Attach user to request object
    req.user = decoded;
    
    // Continue to the next middleware/route handler
    next();
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
    return res.status(401).json(response);
  }
}

// Middleware to check user role (for future use)
export function requireRole(role: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // this will be added when roles are a given to the users
    next();
  };
}