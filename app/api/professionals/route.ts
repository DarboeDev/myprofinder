import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Professional from '@/lib/models/Professional';
import { verifyAuthToken } from '@/lib/auth';

// GET all professionals (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const isAdmin = searchParams.get('admin') === 'true';

    let query: any = {};

    // Only filter by isActive for public requests
    if (!isAdmin) {
      query.isActive = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      query.categories = category;
    }

    const professionals = await Professional.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      professionals,
    });
  } catch (error) {
    console.error('Get professionals error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new professional (protected - admin only)
export async function POST(request: NextRequest) {
  try {
    const payload = verifyAuthToken(request);

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const data = await request.json();

    const professional = await Professional.create(data);

    return NextResponse.json({
      success: true,
      professional,
    }, { status: 201 });
  } catch (error) {
    console.error('Create professional error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
