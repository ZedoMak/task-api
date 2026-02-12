import jwt from 'jsonwebtoken'
import { JWTPayload } from '../types'

// this is a utility module for JWT operetions
//we keep all JWT logic in one place

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

// generate jwt token

export function generateToken(payload: JWTPayload): string {
  // jwt.sign creates a signed token
  return jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
    },
    JWT_SECRET,
    // {
    //   expiresIn: JWT_EXPIRES_IN,
    //   issuer: 'task-api',
    //   audience: 'task-api-users',
    // }
  );
}


// verify toke 

export function verifyToken(token: string): JWTPayload{
    try {
        // jwt.verify checks signature and expirey
        const  decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
        return decoded
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError){
            throw new Error('Token has expired')
        }
        if(error instanceof jwt.JsonWebTokenError){
            throw new Error('Invalid token')
        }
        throw error
    }
}

// Generate refresh token 

export function generateRefreshToken(userId: string): string{
    return jwt.sign(
        {userId, type: 'refresh'},
        JWT_SECRET + '_refresh', // different secret for refresh token
        {expiresIn: '7d'}
    )
}




