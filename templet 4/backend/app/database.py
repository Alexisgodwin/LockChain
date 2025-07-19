# database.py
# Updated to include verified contracts table.
# python
from databases import Database
import aioredis
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/tron_explorer")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost")

async def get_db():
    db = Database(DATABASE_URL)
    await db.connect()
    try:
        yield db
    finally:
        await db.disconnect()

async def get_redis():
    redis = await aioredis.from_url(REDIS_URL)
    try:
        yield redis
    finally:
        await redis.close()

async def init_db():
    db = Database(DATABASE_URL)
    await db.connect()
    await db.execute("""
        CREATE TABLE IF NOT EXISTS blacklisted_tokens (
            contract TEXT PRIMARY KEY
        )
    """)
    await db.execute("""
        CREATE TABLE IF NOT EXISTS logs (
            id SERIAL PRIMARY KEY,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            message TEXT
        )
    """)
    await db.execute("""
        CREATE TABLE IF NOT EXISTS verified_contracts (
            contract_address TEXT PRIMARY KEY,
            source_code TEXT,
            verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    await db.execute("""
        CREATE TABLE IF NOT EXISTS api_usage (
            id SERIAL PRIMARY KEY,
            api_key TEXT,
            endpoint TEXT,
            count INTEGER,
            date DATE DEFAULT CURRENT_DATE
        )
    """)
    await db.disconnect()