import mongoose from 'mongoose';
import Admin from '../models/admin';
import { connectToDatabase } from '../db';

export async function createInitialAdmin() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ role: 'super_admin' });
    if (existingAdmin) {
      console.log('Super admin already exists');
      await mongoose.disconnect();
      return;
    }

    // Create the initial admin user
    const adminData = {
      email: 'admin@jobsplatform.com',
      password: 'Admin@123456', // This will be hashed by the pre-save hook
      name: 'Super Admin',
      role: 'super_admin'
    };

    // Create the admin user
    const admin = new Admin(adminData);
    await admin.save();

    console.log('Initial super admin created successfully');
    
    // Disconnect from the database
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating initial admin:', error);
    await mongoose.disconnect();
    throw error;
  }
}

// Execute the function if this file is run directly
if (require.main === module) {
  createInitialAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}