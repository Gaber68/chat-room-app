import { NextResponse } from 'next/server';

// In-memory online users storage
let onlineUsers = new Set();

export async function GET() {
  return NextResponse.json({
    users: Array.from(onlineUsers)
  });
}

export async function POST(request) {
  try {
    const { username, action } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    if (action === 'add') {
      onlineUsers.add(username);
    } else if (action === 'remove') {
      onlineUsers.delete(username);
    }

    return NextResponse.json({
      success: true,
      users: Array.from(onlineUsers)
    });

  } catch (error) {
    console.error('Online users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
