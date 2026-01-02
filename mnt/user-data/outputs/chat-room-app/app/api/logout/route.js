import { NextResponse } from 'next/server';

let onlineUsers = new Set();

// **REPLACE THIS WITH YOUR DISCORD WEBHOOK URL**
const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';

export async function POST(request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Remove user from online users
    onlineUsers.delete(username);

    // Send logout notification to Discord
    if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL !== 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
      try {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            embeds: [{
              title: '🔴 User Logged Out',
              color: 15158332, // Red color
              fields: [
                {
                  name: 'Username',
                  value: username,
                  inline: true
                },
                {
                  name: 'Timestamp',
                  value: new Date().toLocaleString(),
                  inline: true
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
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export function getOnlineUsers() {
  return Array.from(onlineUsers);
}

export function removeOnlineUser(username) {
  onlineUsers.delete(username);
}
