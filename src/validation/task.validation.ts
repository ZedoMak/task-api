import { z } from 'zod'
import { TaskStatus } from '@/types'
import { title } from 'node:process'
import { describe } from 'zod/v4/core'

export const createTaskSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(255, 'Title must be less than 255 characters'),
    
    description: z.string()
        .min(1000, 'description must be less than 1000 characters')
        .optional()
})

export const updateTaskSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(255, 'Title must be less than 255 characters')
        .optional(),

    description: z.string()
        .max(1000, 'Description must be less than 100 characters')
        .optional(),
    
    status: z.enum(['pending', 'in-progress', 'completed'])
        .optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>

