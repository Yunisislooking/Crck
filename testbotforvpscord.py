import discord
from discord.ext import commands

# Replace this with your bot token
TOKEN = "MTQzMTcyMzEzMzY1NTU4MDc2NA.Gk5Un6.ajOFUXahODvoei6dnoDRXmZB6-Oy-XS5pMaKJI"

intents = discord.Intents.default()
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"Bot is online! Logged in as: {bot.user}")

@bot.command()
async def hi(ctx):
    await ctx.send("hello")

bot.run(TOKEN)
