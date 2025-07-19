# blockchain.py
# Updated to fetch contract call stats from TronGrid.
# python
from tronpy import Tron
import aiohttp
import asyncio
import os

tron_web = Tron(network='shasta', api_key=os.getenv("TRONGRID_API_KEY"))

async def get_blockchain_data(data_type: str):
    async with aiohttp.ClientSession() as session:
        if data_type == "latest_blocks":
            async with session.get('https://api.shasta.trongrid.io/v1/blocks', headers={'TRON-PRO-API-KEY': os.getenv("TRONGRID_API_KEY")}) as response:
                blocks = await response.json()
                return {"blocks": [{"number": b['block_header']['raw_data']['number'], "hash": b['blockID'], "transactions": len(b.get('transactions', []))} for b in blocks.get('data', [])]}
        elif data_type.startswith("block_"):
            async with session.get(f'https://api.shasta.trongrid.io/v1/blocks/{data_type.split("_")[1]}', headers={'TRON-PRO-API-KEY': os.getenv("TRONGRID_API_KEY")}) as response:
                block = await response.json()
                return {"block": {"number": block['block_header']['raw_data']['number'], "hash": block['blockID']}}
        elif data_type.startswith("tx_"):
            async with session.get(f'https://api.shasta.trongrid.io/v1/transactions/{data_type.split("_")[1]}', headers={'TRON-PRO-API-KEY': os.getenv("TRONGRID_API_KEY")}) as response:
                tx = await response.json()
                return {"transaction": {"hash": tx['txID'], "value": tron_web.from_sun(tx['raw_data']['contract'][0]['parameter']['value']['amount'])}}
        elif data_type.startswith("address_"):
            balance = await tron_web.trx.get_balance(data_type.split("_")[1])
            return {"address": {"address": data_type.split("_")[1], "balance": tron_web.from_sun(balance)}}
        elif data_type.startswith("token_"):
            contract = await tron_web.contract().at(data_type.split("_")[1])
            balance = await contract.balanceOf(data_type.split("_")[1]).call()
            return {"token": {"contract": data_type.split("_")[1], "balance": balance.to_string(10)}}
    return {}

async def get_gas_price():
    return {"energy_price": 420}  
# Simulated, as TRON uses energy/bandwidth

async def get_contract_calls():
    async with aiohttp.ClientSession() as session:
        async with session.get('https://api.shasta.trongrid.io/v1/contracts', headers={'TRON-PRO-API-KEY': os.getenv("TRONGRID_API_KEY")}) as response:
            contracts = await response.json()
            return {
                "total": len(contracts['data']),
                "verified": len([c for c in contracts['data'] if c['is_verified']]),
                "topContracts": contracts['data'][:5].map(lambda c: {"name": c['name'] or c['contract_address'], "calls": c.get('call_count', 0)})
            }