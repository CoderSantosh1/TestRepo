import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'Admin@123';
const JWT_SECRET = 'your_jwt_secret_key';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ token });
  }

  return NextResponse.json(
    { message: 'Invalid credentials' },
    { status: 401 }
  );
}