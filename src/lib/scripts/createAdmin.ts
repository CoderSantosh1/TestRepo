import mongoose from 'mongoose';
import { config } from 'dotenv';
import { resolve } from 'path';
import Admin from '../models/admin';

// Load environment variables from root .env file
config({ path: resolve(process.cwd(), '.env') });

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: true,
  serverSelectionTimeoutMS: 60000,
  socketTimeoutMS: 75000
} as mongoose.ConnectOptions;

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, options);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const adminData = {
      email: 'admin@gmail.com',
      password: 'admin@99', // This will be hashed automatically by the schema
      name: 'Admin User',
      role: 'super_admin'
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log('Admin user created successfully');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

// Run the script
createAdminUser();