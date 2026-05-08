import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Request from '@/lib/models/Request';
import { verifyAuthToken } from '@/lib/auth';

// GET all requests (protected - admin only)
export async function GET(request: NextRequest) {
  try {
    const payload = verifyAuthToken(request);

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const requests = await Request.find()
      .populate('assignedProfessional')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error('Get requests error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new request (public - client submission)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      'clientName',
      'clientEmail',
      'clientPhone',
      'category',
      'projectTitle',
      'projectDescription',
      'budget',
      'timeline',
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const newRequest = await Request.create(data);

    return NextResponse.json({
      success: true,
      message: 'Request submitted successfully',
      request: newRequest,
    }, { status: 201 });
  } catch (error) {
    console.error('Create request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
