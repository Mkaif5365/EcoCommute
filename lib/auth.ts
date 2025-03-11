import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

// Password verification
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: any): string {
  return sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return null;
  }
}

// Set auth cookie in response
export function setAuthCookieInResponse(response: NextResponse, token: string): NextResponse {
  response.cookies.set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return response;
}

// Create response with auth cookie
export function createResponseWithAuthCookie(data: any, token: string): NextResponse {
  const response = NextResponse.json(data);
  return setAuthCookieInResponse(response, token);
}

// Create response that clears auth cookie
export function createResponseWithClearedAuthCookie(data: any): NextResponse {
  const response = NextResponse.json(data);
  response.cookies.delete('auth_token');
  return response;
}

// Get current user from request headers (for API routes)
export function getCurrentUserFromRequest(request: Request): any {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
} 