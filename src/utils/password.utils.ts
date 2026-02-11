import bcrypt from 'bcrypt'

// hash passwords before stroring

const SALT_ROUNDS =12 // HIGHER = more secure bt slower
// hash password
export async function hashPasword(password: string):Promise<string> {
   // bcrypt.hash(password, saltRounds)
  // - Automatically generates a salt
  // - Uses bcrypt algorithm (slow by design to prevent brute force)
  return await bcrypt.hash(password, SALT_ROUNDS); 
    
}

// compare password with hash
export async function comparePassword(
    plainTextPassword: string,
    hashedPassword: string
): Promise<boolean>{
     // bcrypt.compare handles:
  // 1. Extracting salt from hash
  // 2. Hashing plainTextPassword with that salt
  // 3. Comparing with stored hash
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}