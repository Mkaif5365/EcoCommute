import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// Function to read users from CSV
const getUsersFromCSV = (): User[] => {
  try {
    const csvFilePath = path.join(process.cwd(), 'data', 'users.csv');
    if (!fs.existsSync(csvFilePath)) {
      return [];
    }
    
    const fileContent = fs.readFileSync(csvFilePath, 'utf8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records;
  } catch (error) {
    console.error('Error reading users CSV:', error);
    return [];
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get users from CSV
    const users = getUsersFromCSV();
    
    // Find user by email
    const user = users.find(u => u.email === email);
    
    // Check if user exists and password matches
    if (user && user.password === password) {
      // Create JWT token
      const token = jwt.sign(
        { 
          id: user.id,
          email: user.email,
          name: user.name
        },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '1d' }
      );
      
      // Return success with user info and token
      return NextResponse.json(
        {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          },
          token
        },
        { status: 200 }
      );
    }
    
    // Return error for invalid credentials
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 