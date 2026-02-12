import {z} from 'zod'

// zod schema for registration
 export const registerSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .min(5, "Email must be at least 5 characters")
        .max(255, 'Email must be less than 255 characters'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password must be less than 100 charcters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one lowercase letter, one uppercase letter, and one number' 
        ),
    
        name: z.string()
            .min(2, 'Name must be at least two characters')
            .max(100, 'Name must be less than 100 characters')
            .optional(),
 })

 //zod schema for login

 export const loginSchema = z.object ({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password required')
 })

 // zod schema for token refresh
 export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token is required')
 })

 // type interface from zod schema
 export type RegisterInput = z.infer<typeof registerSchema>
 export type LoginInput = z.infer<typeof loginSchema>
 export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>
