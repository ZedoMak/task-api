import { userModel } from '../models/user.model';
import { generateToken, generateRefreshToken } from '../utils/jwt.utils';
import { User, ApiResponse } from '../types';

// This service handles authentication business logic
class AuthService {
  // Register new user
  async register(
    email: string,
    password: string,
    name?: string
  ): Promise<{ user: Omit<User, 'password'>; accessToken: string; refreshToken: string }> {
    
    // Check if user already exists
    const existingUser = userModel.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create user
    const user = await userModel.create(email, password, name);
    
    // Generate tokens
    const accessToken = generateToken({
      userId: user.id,
      email: user.email,
    });
    
    const refreshToken = generateRefreshToken(user.id);
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }
  
  // Login user
  async login(
    email: string,
    password: string
  ): Promise<{ user: Omit<User, 'password'>; accessToken: string; refreshToken: string }> {
    
    // Authenticate user
    const user = await userModel.authenticate(email, password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Generate tokens
    const accessToken = generateToken({
      userId: user.id,
      email: user.email,
    });
    
    const refreshToken = generateRefreshToken(user.id);
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }
  
  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    // In a real app,
    // 1. Verify the refresh token
    // 2. Check if it's not blacklisted
    // 3. Generate new access token
    
    // For nowjust return a new token (simplified)
    // This is a simplified version
    return {
      accessToken: 'new-token-from-refresh',
    };
  }
  
  // Get current user
  getCurrentUser(userId: string): Omit<User, 'password'> | null {
    const user = userModel.findById(userId);
    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

// Export singleton instance
export const authService = new AuthService();