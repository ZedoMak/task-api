import { v4 as uuidv4 } from "uuid";
import {User} from '../types'
import { comparePassword, hashPassword } from "../utils/password.utils";


// in-memory database // real db as i gon on 😁
class UserModel {
    private users: Map<string, User> = new Map()

    // create a new user
    async create(email: string, password: string, name?: string): Promise<User>{
        // check if already exists
        if(this.findByEmail(email)){
            throw new Error('User already exists')
        }

        const now = new Date()
        const user: User = {
            id: uuidv4(),
            email: email.toLocaleLowerCase(),
            password: await hashPassword(password),
            name,
            createdAt: now,
            updatedAt: now,
        }

        this.users.set(user.id, user)
        return user
    }

    findById(id: string):User | undefined{
        return this.users.get(id)
    }

    findByEmail(email: string): User | undefined{
        const normailizedEmail = email.toLocaleLowerCase().trim()
        return Array.from(this.users.values()).find(
            user=> user.email === normailizedEmail
        )
    }

    // authenticate user

    async authenticate(email: string, password: string): Promise<User | null>{
        const user = this.findByEmail(email)
        if(!user) return null
        const isValid = await comparePassword(password, user.password);
        return isValid ? user : null
    }
    // Update user
  async update(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.findById(id);
    if (!user) return undefined;
    
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    
    // If updating password, hash it
    if (updates.password) {
      updatedUser.password = await hashPassword(updates.password);
    }
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Get all users (for testing)
  getAll(): User[] {
    return Array.from(this.users.values());
  }
}

// Export singleton instance
export const userModel = new UserModel();


