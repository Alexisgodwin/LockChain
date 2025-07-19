from fastapi import APIRouter, Depends, HTTPException, Query
from ..schemas import StatsResponse, SearchResult, Token, GovernanceData
from ..auth import get_current_user
from ..tron_client import get_account_info, get_blockchain_stats

router = APIRouter()

@router.get("/stats/home", response_model=StatsResponse)
async def get_stats():
    stats = await get_blockchain_stats()
    return {
        "activatedAccounts": 0,
        "totalTransactions": 0,
        "tvl": 0,
        "transferVolume": 0,
        "tps": 0,
        "highestTps": 0,
        "totalNodes": 0,
        "totalContracts": 0,
        "totalTokens": 0,
        **stats,
    }

@router.get("/search", response_model=SearchResult)
async def search(q: str = Query(..., min_length=10)):
    account = await get_account_info(q)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return {
        "type": "account",
        "data": {
            "address": account.get("address"),
            "balance": int(account.get("balance", 0)),
            "transactions": 0,
        },
    }

@router.get("/tokens/top10", response_model=list[Token])
async def get_top_tokens():
    # Placeholder tokens data
    tokens_data = [
        {"name": "TRX", "price": 0.07, "volume24h": 1000000, "marketCap": 70000000},
        {"name": "USDT", "price": 1, "volume24h": 2000000, "marketCap": 1000000000},
    ]
    return tokens_data

@router.get("/governance", response_model=GovernanceData)
async def get_governance(current_user=Depends(get_current_user)):
    governance_data = {
        "mostStakedToken": "TRX",
        "mostVotes": 100000,
        "userVotes": 100,
        "claimableRewards": 50,
        "totalStaked": 1000000,
        "stakingRate": 5.0,
        "cumulativeRewards": 50000,
    }
    return governance_data
@router.get("/admin/stats", response_model=StatsResponse)
async def get_admin_stats(current_user=Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Placeholder for admin stats
    return {
        "activatedAccounts": 1000,
        "totalTransactions": 50000,
        "tvl": 1000000,
        "transferVolume": 2000000,
        "tps": 100,
        "highestTps": 200,
        "totalNodes": 50,
        "totalContracts": 300,
        "totalTokens": 1500,
    }