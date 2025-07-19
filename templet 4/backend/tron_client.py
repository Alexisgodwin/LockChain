import httpx

TRON_API_BASE = "https://api.trongrid.io"

async def get_account_info(address: str):
    url = f"{TRON_API_BASE}/v1/accounts/{address}"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        resp.raise_for_status()
        data = resp.json()
        if data.get("data"):
            return data["data"][0]
        return None

async def get_blockchain_stats():
    url = f"{TRON_API_BASE}/v1/blocks/latest"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        resp.raise_for_status()
        latest_block = resp.json()
    return {
        "latestBlockNumber": latest_block.get("block_header", {}).get("raw_data", {}).get("number"),
        "latestBlockTimestamp": latest_block.get("block_header", {}).get("raw_data", {}).get("timestamp"),
    }
async def get_transaction_info(tx_id: str):
    url = f"{TRON_API_BASE}/v1/transactions/{tx_id}"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        resp.raise_for_status()
        data = resp.json()
        if data.get("data"):
            return data["data"][0]
        return None 