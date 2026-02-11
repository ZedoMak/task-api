// this where all the type script types are defined 

import { error } from "node:console"
import { DropArgument } from "node:net"
import { Interface } from "node:readline"
import { int } from "zod"
import { extend } from "zod/v4/core/util.cjs"

// User-type - represents the user in the system

export interface User {
    id: string
    email: string
    password: string
    name?: string  // optional 
    createdAt: Date
    updatedAt: Date
}


// task type

export interface Task {
    id: string
    title: string
    description?: string
    status: TaskStatus
    userId: string
    createdAt: Date
    updatedAt: Date
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed'

// JWT payload /// what we store in the token 
export interface JWTPayload{
    userId: string
    email: string
    iat?: number // isuued at (this is added by the jwt library)
    exp?: number // expires at (this is also added by the jwt library)
}


// API  RESPONSE TYPE 
export interface ApiResponse<T = any>{
    success: boolean
    data?: T // optional data on success
    error?: string // optional error message
    message?: string   // optional success message

}

// request types with user authentication 

export interface AuthenticatedRequest extends Request {
    user?: JWTPayload // here the user info will be attached in the middleware
}

export class AppError extends Error{
    constructor(
        public statusCode: number,
        public message: string,
        public isOperetional = true
    ) {
        super(message)
        Object.setPrototypeOf(this, AppError.prototype)
    }
}