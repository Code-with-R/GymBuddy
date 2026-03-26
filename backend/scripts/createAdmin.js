import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../src/models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminExists = await Admin.findOne({ email: 'admin@gymbuddy.com' });
    
    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }
    
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@gymbuddy.com',
      password: 'Admin123!',
    });
    
    console.log('Admin created successfully:', admin.email);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();