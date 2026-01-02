# Chat Room App with Discord Integration

A real-time chat room application with Discord bot integration for access code generation and login notifications.

## Features

- 🔐 Secure login with username and access code
- 💬 Real-time chat functionality
- 👥 Live online users list
- 🔔 Discord webhook notifications for logins/logouts
- 💾 "Remember Me" option for saved credentials
- 📱 Responsive design

## Prerequisites

- Node.js 18+ installed
- A Discord server with webhook access
- Vercel account (for deployment)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd chat-room-app
npm install
```

### 2. Configure Discord Webhook

1. Go to your Discord server
2. Navigate to Server Settings → Integrations → Webhooks
3. Click "New Webhook"
4. Name it (e.g., "Chat Room Notifications")
5. Select the channel where you want notifications
6. Copy the Webhook URL

### 3. Update Webhook URLs

Edit the following files and replace `YOUR_DISCORD_WEBHOOK_URL_HERE` with your actual webhook URL:

- `app/api/login/route.js` (line 9)
- `app/api/logout/route.js` (line 6)

```javascript
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL';
```

### 4. Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"

## Discord Bot Setup (for Access Code Generation)

You'll need to create a Discord bot that generates access codes. Here's a basic example:

```python
import discord
from discord.ext import commands
import random
import string

bot = commands.Bot(command_prefix='!')

@bot.command()
async def getcode(ctx, username: str):
    # Generate random 6-character code
    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    
    # Save to database (implement your own storage)
    # save_code(username, code)
    
    await ctx.author.send(f"Your access code for username '{username}' is: **{code}**")
    await ctx.send(f"✅ Access code sent to {ctx.author.mention} via DM!")

bot.run('YOUR_BOT_TOKEN')
```

## How It Works

1. **User requests code**: User runs Discord bot command to get an access code
2. **User logs in**: User enters username and code on the website
3. **Login notification**: Discord webhook sends login notification to your server
4. **Chat**: User can now send messages and see other online users
5. **Logout notification**: When user logs out, Discord receives a logout notification

## File Structure

```
chat-room-app/
├── app/
│   ├── api/
│   │   ├── login/route.js          # Login API with Discord webhook
│   │   ├── logout/route.js         # Logout API with Discord webhook
│   │   ├── messages/route.js       # Messages API
│   │   └── online-users/route.js   # Online users API
│   ├── chat/
│   │   └── page.js                 # Chat room interface
│   ├── layout.js                   # Root layout
│   └── page.js                     # Login page
├── package.json
└── README.md
```

## Environment Variables (Optional)

For production, you can use environment variables instead of hardcoding the webhook URL:

1. Create a `.env.local` file:
```
DISCORD_WEBHOOK_URL=your_webhook_url_here
```

2. Update the route files:
```javascript
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
```

3. Add the environment variable in Vercel:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `DISCORD_WEBHOOK_URL` with your webhook URL

## Important Notes

⚠️ **Security Notice**: This is a demo application with in-memory storage. For production use:
- Implement a proper database (PostgreSQL, MongoDB, etc.)
- Add rate limiting
- Implement proper authentication tokens
- Add input validation and sanitization
- Use environment variables for sensitive data
- Implement HTTPS only
- Add CSRF protection

## Customization

### Change Colors

Edit the color values in `app/page.js` and `app/chat/page.js`:

```javascript
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### Modify Discord Embed

Edit the embed structure in `app/api/login/route.js`:

```javascript
embeds: [{
  title: '🟢 User Logged In',
  color: 3066993,
  // Add more fields or modify existing ones
}]
```

## Support

If you encounter any issues:
1. Check that your Discord webhook URL is correct
2. Ensure Node.js 18+ is installed
3. Verify all files are properly uploaded to GitHub
4. Check Vercel deployment logs for errors

## License

MIT License - feel free to modify and use as needed!
