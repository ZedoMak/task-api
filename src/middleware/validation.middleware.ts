import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ApiResponse } from '../types';

// Middleware factory - returns a middleware function
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body against schema
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: 'Validation failed',
        message: error.errors?.map((e: any) => e.message).join(', '),
      };
      return res.status(400).json(response);
    }
  };
}

// Rate limiting middleware 
export function rateLimit(maxRequests: number, windowMs: number) {
  const requests = new Map<string, { count: number; resetTime: number }>();
  
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    
    // Get or create request record for this IP
    let record = requests.get(ip);
    
    if (!record || now > record.resetTime) {
      // First request or window expired
      record = {
        count: 1,
        resetTime: now + windowMs,
      };
      requests.set(ip, record);
      return next();
    }
    
    // Check if within limit
    if (record.count >= maxRequests) {
      const response: ApiResponse = {
        success: false,
        error: 'Too many requests',
        message: `Rate limit exceeded. Try again in ${Math.ceil((record.resetTime - now) / 1000)} seconds`,
      };
      return res.status(429).json(response);
    }
    
    // Increment count
    record.count++;
    next();
  };
}