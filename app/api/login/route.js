import { NextResponse } from 'next/server';

// In-memory storage (for demo purposes - use a real database in production)
let validCodes = new Map(); // Map of code -> username
let onlineUsers = new Set();

// **REPLACE THIS WITH YOUR DISCORD WEBHOOK URL**
const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';

export async function POST(request) {
  try {
    const { username, code, rememberMe } = await request.json();

    if (!username || !code) {
      return NextResponse.json(
        { error: 'Username and code are required' },
        { status: 400 }
      );
    }

    // Validate the code
    // In production, check against your database of valid codes
    // For now, we'll accept any code (you'll validate with your Discord bot)
    const isValidCode = true; // Replace with actual validation logic

    if (!isValidCode) {
      return NextResponse.json(
        { error: 'Invalid access code' },
        { status: 401 }
      );
    }

    // Add user to online users
    onlineUsers.add(username);

    // Send login notification to Discord
    if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL !== 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
      try {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            embeds: [{
              title: '🟢 User Logged In',
              color: 3066993, // Green color
              fields: [
                {
                  name: 'Username',
                  value: username,
                  inline: true
                },
                {
                  name: 'Code Used',
                  value: code,
                  inline: true
                },
                {
                  name: 'Remember Me',
                  value: rememberMe ? 'Yes' : 'No',
                  inline: true
                },
                {
                  name: 'Timestamp',
                  value: new Date().toLocaleString(),
                  inline: false
                }
              ],
              footer: {
                text: 'Chat Room Login System'
              },
              timestamp: new Date().toISOString()
            }]
          }),
        });
      } catch (webhookError) {
        console.error('Discord webhook error:', webhookError);
        // Don't fail the login if webhook fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      username
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export the online users for other routes to access
export function getOnlineUsers() {
  return Array.from(onlineUsers);
}

export function addOnlineUser(username) {
  onlineUsers.add(username);
}

export function removeOnlineUser(username) {
  onlineUsers.delete(username);
}
