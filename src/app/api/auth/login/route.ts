import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_FILE = path.join(process.cwd(), 'data', 'admin.json');

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Read admin credentials
        const adminData = JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf-8'));

        // Simple authentication (in production, use bcrypt for password hashing)
        if (email === adminData.email && password === 'admin123') {
            // Create session token (simple implementation)
            const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

            const response = NextResponse.json({
                success: true,
                message: 'Login successful',
                user: {
                    email: adminData.email,
                    name: adminData.name,
                    role: adminData.role
                }
            });

            // Set cookie
            // Set cookie (Session cookie - expires when browser closes)
            response.cookies.set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            return response;
        } else {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
