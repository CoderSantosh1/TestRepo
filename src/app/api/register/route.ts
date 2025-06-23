import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";

// Define User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  mobile: { type: String, required: true, match: /^\d{10}$/, unique: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, mobile } = await req.json();

  // Enhanced validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
  }
  
  if (name.trim().length > 50) {
    return NextResponse.json({ error: "Name must be less than 50 characters." }, { status: 400 });
  }
  
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return NextResponse.json({ error: "Name can only contain letters and spaces." }, { status: 400 });
  }
  
  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return NextResponse.json({ error: "Mobile number must be exactly 10 digits." }, { status: 400 });
  }
  
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return NextResponse.json({ error: "Mobile number must start with 6, 7, 8, or 9." }, { status: 400 });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return NextResponse.json({ 
        error: "An account with this mobile number already exists. Please login instead." 
      }, { status: 409 });
    }

    // Create new user
    const user = await User.create({ 
      name: name.trim(), 
      mobile 
    });
    
    return NextResponse.json({ 
      success: true, 
      user: { _id: user._id, name: user.name, mobile: user.mobile } 
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: "An account with this mobile number already exists. Please login instead." 
      }, { status: 409 });
    }
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
} 