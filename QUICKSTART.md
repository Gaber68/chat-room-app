# 🚀 Quick Start Guide

Get your chat room up and running in 5 minutes!

## What You Get

✅ Login page with username & access code  
✅ Real-time chat interface  
✅ Live online users list  
✅ Discord notifications for logins/logouts  
✅ "Remember me" functionality  
✅ Discord bot example for code generation  

## 3-Step Setup

### 1️⃣ Push to GitHub

```bash
cd chat-room-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/chat-room-app.git
git push -u origin main
```

### 2️⃣ Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repo
4. Click "Deploy" ✨

### 3️⃣ Add Discord Webhook

1. **Get Webhook URL:**
   - Discord Server → Settings → Integrations → Webhooks
   - Create webhook, copy URL

2. **Update Code:**
   - Edit `app/api/login/route.js` line 9
   - Edit `app/api/logout/route.js` line 6
   - Replace `YOUR_DISCORD_WEBHOOK_URL_HERE` with your URL

3. **Push Changes:**
   ```bash
   git add .
   git commit -m "Add webhook URL"
   git push
   ```

## 🤖 Optional: Discord Bot

See `DISCORD_BOT_EXAMPLE.md` for a complete bot that generates access codes!

**Quick bot setup:**
1. Install: `pip install discord.py`
2. Create bot at [discord.com/developers](https://discord.com/developers/applications)
3. Copy bot token
4. Run the bot code from `DISCORD_BOT_EXAMPLE.md`

## 📝 Usage

**For Users:**
1. Get access code from Discord bot: `!getcode username`
2. Go to your Vercel URL
3. Login with username and code
4. Start chatting!

**For Admins:**
- `!codes` - View all access codes
- `!revoke CODE` - Revoke a code
- Check Discord for login/logout notifications

## ⚡ That's It!

Your chat room is now live and connected to Discord!

**Your Vercel URL:** `https://your-app-name.vercel.app`

## 🔧 Customization

- **Colors:** Edit gradient values in `app/page.js` and `app/chat/page.js`
- **Features:** Add more to the API routes
- **Bot Commands:** Extend the Discord bot example

## 📚 Full Documentation

- `README.md` - Complete features and setup
- `GITHUB_SETUP.md` - Detailed GitHub instructions
- `DISCORD_BOT_EXAMPLE.md` - Complete Discord bot code

## ⚠️ Important

This uses in-memory storage (data resets on restart). For production:
- Add a database (MongoDB, PostgreSQL)
- Implement proper authentication
- Add rate limiting

Need help? Check the full README.md!
