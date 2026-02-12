import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { RegisterInput, LoginInput, RefreshTokenInput } from '../validation/auth.validation';
import { AuthenticatedRequest, ApiResponse } from '../types';

export class AuthController {
  // Register new user
  async register(req: Request, res: Response) {
    try {
      const { email, password, name }: RegisterInput = req.body;
      
      const result = await authService.register(email, password, name);
      
      const response: ApiResponse = {
        success: true,
        data: result,
        message: 'User registered successfully',
      };
      
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      };
      res.status(400).json(response);
    }
  }
  
  // Login user
  async login(req: Request, res: Response) {
    try {
      const { email, password }: LoginInput = req.body;
      
      const result = await authService.login(email, password);
      
      const response: ApiResponse = {
        success: true,
        data: result,
        message: 'Login successful',
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
      res.status(401).json(response);
    }
  }
  
  // Refresh token
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken }: RefreshTokenInput = req.body;
      
      const result = await authService.refreshAccessToken(refreshToken);
      
      const response: ApiResponse = {
        success: true,
        data: result,
        message: 'Token refreshed successfully',
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Token refresh failed',
      };
      res.status(401).json(response);
    }
  }
  
  // Get current user
  async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const user = authService.getCurrentUser(req.user.userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      const response: ApiResponse = {
        success: true,
        data: { user },
        message: 'Current user retrieved successfully',
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get current user',
      };
      res.status(401).json(response);
    }
  }
  
  // Logout (in real app, would blacklist token)
  async logout(req: Request, res: Response) {
    const response: ApiResponse = {
      success: true,
      message: 'Logout successful. Please discard your token.',
    };
    res.status(200).json(response);
  }
}

// Export instance
export const authController = new AuthController();