import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    // Create a unique filename
    const ext = file.name.split('.').pop();
    const filename = `caticon_${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'category-icons');
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
    // Return the public URL
    const imageUrl = `/uploads/category-icons/${filename}`;
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Category icon upload error:', error);
    return NextResponse.json({ error: 'Failed to upload icon' }, { status: 500 });
  }
} 