import { userModel } from '../models/user.model';
import { taskModel } from '../models/task.model';
import { generateToken } from '../utils/jwt.utils';

// Seed script to populate data for testing
async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  // Clear existing data
  console.log('Clearing existing data...');
  
  // Create test users
  const user1 = await userModel.create(
    'zed@example.com',
    'zed123!',
    'Zedd Mak'
  );
  
  const user2 = await userModel.create(
    'bob@example.com',
    'Bob123!',
    'Bob Smith'
  );
  
  // Create tasks for Alice
  taskModel.create('Buy groceries', user1.id, 'Milk, eggs, bread');
  taskModel.create('Finish project', user1.id, 'Complete TypeScript API');
  taskModel.create('Call mom', user1.id);
  
  // Create tasks for Bob
  taskModel.create('Workout', user2.id, 'Gym at 6 PM');
  taskModel.create('Read book', user2.id, 'Chapter 5-6');
  
  // Generate tokens for testing
  const zedToken = generateToken({
    userId: user1.id,
    email: user1.email,
  });
  
  const bobToken = generateToken({
    userId: user2.id,
    email: user2.email,
  });
  
  console.log('\n✅ Database seeded successfully!');
  console.log('\n📋 Test Credentials:');
  console.log('==================');
  console.log('Alice (alice@example.com / Alice123!):');
  console.log(`Token: ${zedToken}`);
  console.log('\nBob (bob@example.com / Bob123!):');
  console.log(`Token: ${bobToken}`);
  console.log('\n📝 Tasks created for both users');
  console.log('🚀 Run `npm run dev` to start the server');
}

// Run if called directly
if (require.main === module) {
  seedDatabase().catch(console.error);
}

export { seedDatabase };