# Discord Bot for Access Code Generation

This is a simple Discord bot that generates access codes for your chat room.

## Requirements

```bash
pip install discord.py
```

## Bot Code (bot.py)

```python
import discord
from discord.ext import commands
import random
import string
import json
from datetime import datetime

# Bot setup
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)

# Simple in-memory storage (use a database in production)
access_codes = {}

def generate_code():
    """Generate a random 6-character access code"""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

@bot.event
async def on_ready():
    print(f'{bot.user} has connected to Discord!')
    print(f'Bot is ready to generate access codes!')

@bot.command(name='getcode', help='Generate an access code for the chat room')
async def get_code(ctx, username: str = None):
    """Generate and send an access code to the user"""
    
    if username is None:
        await ctx.send("❌ Please provide a username! Usage: `!getcode <username>`")
        return
    
    # Generate new code
    code = generate_code()
    
    # Store code with username
    access_codes[code] = {
        'username': username,
        'discord_user': str(ctx.author),
        'generated_at': datetime.now().isoformat()
    }
    
    # Send DM to user
    try:
        embed = discord.Embed(
            title="🎫 Your Chat Room Access Code",
            description="Use this code to log into the chat room!",
            color=discord.Color.green()
        )
        embed.add_field(name="Username", value=username, inline=False)
        embed.add_field(name="Access Code", value=f"**{code}**", inline=False)
        embed.add_field(name="Valid Until", value="This code never expires", inline=False)
        embed.set_footer(text="Keep this code private!")
        
        await ctx.author.send(embed=embed)
        await ctx.send(f"✅ Access code sent to {ctx.author.mention} via DM!")
        
    except discord.Forbidden:
        await ctx.send(f"❌ {ctx.author.mention}, I couldn't send you a DM! Please enable DMs from server members.")

@bot.command(name='codes', help='View all generated codes (Admin only)')
@commands.has_permissions(administrator=True)
async def list_codes(ctx):
    """List all active access codes (admin command)"""
    
    if not access_codes:
        await ctx.send("📝 No access codes have been generated yet.")
        return
    
    embed = discord.Embed(
        title="📋 Active Access Codes",
        description=f"Total codes: {len(access_codes)}",
        color=discord.Color.blue()
    )
    
    for code, data in list(access_codes.items())[:10]:  # Show max 10
        embed.add_field(
            name=f"Code: {code}",
            value=f"Username: {data['username']}\nRequested by: {data['discord_user']}",
            inline=False
        )
    
    if len(access_codes) > 10:
        embed.set_footer(text=f"Showing 10 of {len(access_codes)} codes")
    
    await ctx.send(embed=embed)

@bot.command(name='revoke', help='Revoke an access code (Admin only)')
@commands.has_permissions(administrator=True)
async def revoke_code(ctx, code: str):
    """Revoke a specific access code"""
    
    if code in access_codes:
        username = access_codes[code]['username']
        del access_codes[code]
        await ctx.send(f"✅ Access code `{code}` for user `{username}` has been revoked.")
    else:
        await ctx.send(f"❌ Code `{code}` not found.")

@bot.command(name='help_chatroom', help='Show chat room bot help')
async def help_chatroom(ctx):
    """Show help information"""
    
    embed = discord.Embed(
        title="🤖 Chat Room Bot Commands",
        description="Commands for managing chat room access",
        color=discord.Color.purple()
    )
    
    embed.add_field(
        name="!getcode <username>",
        value="Generate an access code for the chat room",
        inline=False
    )
    
    embed.add_field(
        name="!codes (Admin)",
        value="View all generated access codes",
        inline=False
    )
    
    embed.add_field(
        name="!revoke <code> (Admin)",
        value="Revoke a specific access code",
        inline=False
    )
    
    embed.set_footer(text="Chat Room Management Bot")
    
    await ctx.send(embed=embed)

# Error handling
@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send(f"❌ Missing argument! Use `!help_chatroom` for command usage.")
    elif isinstance(error, commands.MissingPermissions):
        await ctx.send(f"❌ You don't have permission to use this command!")
    else:
        await ctx.send(f"❌ An error occurred: {str(error)}")

# Run the bot
if __name__ == "__main__":
    TOKEN = 'YOUR_BOT_TOKEN_HERE'  # Replace with your bot token
    bot.run(TOKEN)
```

## Setup Instructions

1. **Create a Discord Bot:**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Click "New Application"
   - Go to "Bot" section
   - Click "Add Bot"
   - Copy the bot token

2. **Enable Intents:**
   - In the Bot section, scroll to "Privileged Gateway Intents"
   - Enable "MESSAGE CONTENT INTENT"
   - Save changes

3. **Invite Bot to Server:**
   - Go to "OAuth2" → "URL Generator"
   - Select scopes: `bot`
   - Select permissions: `Send Messages`, `Read Messages`, `Embed Links`
   - Copy the generated URL and open in browser
   - Select your server and authorize

4. **Run the Bot:**
   ```bash
   python bot.py
   ```

## Usage

Users can use these commands in your Discord server:

```
!getcode MyUsername      - Get an access code
!codes                   - (Admin) View all codes
!revoke ABC123           - (Admin) Revoke a code
!help_chatroom           - Show help
```

## Advanced: Code Validation

To validate codes on your website, you could:

1. Store codes in a database (MongoDB, PostgreSQL, etc.)
2. Create an API endpoint to validate codes
3. Check if code exists and hasn't been used/expired

Example validation in `app/api/login/route.js`:

```javascript
// Add this function to validate codes
async function validateCode(username, code) {
  // Check your database
  // Return true if valid, false otherwise
  return true; // Implement your validation logic
}
```

## Production Recommendations

- Use a database (MongoDB, PostgreSQL) instead of in-memory storage
- Add code expiration times
- Add usage limits (one-time codes vs reusable)
- Log all code generations
- Add rate limiting
- Store codes securely

Enjoy your chat room! 🎉
