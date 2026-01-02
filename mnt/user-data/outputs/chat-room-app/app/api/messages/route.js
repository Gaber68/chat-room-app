import { NextResponse } from 'next/server';

// In-memory message storage
let messages = [];

export async function GET() {
  return NextResponse.json({
    messages: messages.slice(-50) // Return last 50 messages
  });
}

export async function POST(request) {
  try {
    const { username, message } = await request.json();

    if (!username || !message) {
      return NextResponse.json(
        { error: 'Username and message are required' },
        { status: 400 }
      );
    }

    const newMessage = {
      username,
      message,
      timestamp: new Date().toISOString()
    };

    messages.push(newMessage);

    // Keep only last 100 messages
    if (messages.length > 100) {
      messages = messages.slice(-100);
    }

    return NextResponse.json({
      success: true,
      message: newMessage
    });

  } catch (error) {
    console.error('Message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
