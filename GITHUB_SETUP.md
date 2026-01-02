# GitHub Repository Setup Guide

Follow these steps to create and push your chat room app to GitHub:

## Step 1: Initialize Git Repository

Open your terminal in the project folder and run:

```bash
cd chat-room-app
git init
git add .
git commit -m "Initial commit: Chat room app with Discord integration"
```

## Step 2: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to [github.com](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `chat-room-app` (or any name you prefer)
5. **Do NOT** initialize with README (we already have one)
6. Click "Create repository"

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create chat-room-app --public --source=. --remote=origin --push
```

## Step 3: Connect Local Repository to GitHub

Copy the commands from GitHub (they'll look like this):

```bash
git remote add origin https://github.com/YOUR-USERNAME/chat-room-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 4: Verify Upload

1. Go to your GitHub repository page
2. You should see all the files uploaded
3. The README.md will display automatically

## Step 5: Deploy to Vercel

### Option A: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Click "Import Git Repository"
4. Select your `chat-room-app` repository
5. Click "Deploy"

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## Step 6: Configure Discord Webhook

**IMPORTANT**: Before your app works, you must:

1. Create a Discord webhook in your server
2. Copy the webhook URL
3. Update these files with your webhook URL:
   - `app/api/login/route.js`
   - `app/api/logout/route.js`
4. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Add Discord webhook URL"
   git push
   ```

If you deployed to Vercel, it will automatically redeploy with the changes.

## Your Repository is Ready! 🎉

Your chat room app is now:
- ✅ Stored on GitHub
- ✅ Deployed on Vercel (if you completed Step 5)
- ✅ Ready to integrate with your Discord bot

## Next Steps

1. Create your Discord bot to generate access codes
2. Share your Vercel URL with users
3. Test the login/logout notifications in Discord

## Updating Your App

Whenever you make changes:

```bash
git add .
git commit -m "Description of your changes"
git push
```

Vercel will automatically redeploy your app with the new changes!
