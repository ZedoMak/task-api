import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/types";
import { createCipheriv } from "node:crypto";

// Error handling middle ware 

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.log(`[Error] ${req.method} ${req.path}: `, error)

    const response: ApiResponse = {
        success: false,
        error: error.message
    }

    // different status code based on error types

    if(error.message.includes('not-found')){
        return res.status(404).json(response)
    }

    if(error.message.includes('already-exists')){
        return res.status(409).json(response)
    }

     if (error.message.includes('unauthorized') || error.message.includes('Invalid token')) {
    return res.status(401).json(response);
    }
  
    if (error.message.includes('forbidden')) {
        return res.status(403).json(response);
    }
  
    // Default to 500 (Internal Server Error)
    return res.status(500).json(response);
}

export function notFoundHandler(req: Request, res:Response){
    const response: ApiResponse = {
        success: false,
        error: `Route ${req.method} ${req.path} not found`,
    }

    res.status(404).json(response)
}

