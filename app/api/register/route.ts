import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, place, phone, password } = body;

    // Validation
    if (!name || !email || !place || !phone || !password) {
      return NextResponse.json(
        { error: 'All fields (name, email, place, phone, password) are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation (basic)
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }
    console.log('Registering user:', { name, email, place, phone });
    // TODO: Add database insertion logic here
    // Example: await db.users.create({ name, email, place, phone });
    await prisma.user.create({
      data: {
        name,
        email,
        password,
        place,
        phone,
      },
    });

    return NextResponse.json(
      { message: 'User registered successfully', user: { name, email, place, phone } },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  }

  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : "Internal server error",
    },
    { status: 500 }
  );
  }
}
