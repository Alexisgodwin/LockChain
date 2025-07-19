from pydantic import BaseModel
from typing import Optional, List

class StatsResponse(BaseModel):
    activatedAccounts: int
    totalTransactions: int
    tvl: int
    transferVolume: int
    tps: int
    highestTps: int
    totalNodes: int
    totalContracts: int
    totalTokens: int

class SearchResultData(BaseModel):
    address: Optional[str]
    balance: Optional[int]
    transactions: Optional[int]

class SearchResult(BaseModel):
    type: str
    data: SearchResultData

class Token(BaseModel):
    name: str
    price: float
    volume24h: int
    marketCap: int

class GovernanceData(BaseModel):
    mostStakedToken: str
    mostVotes: int
    userVotes: int
    claimableRewards: int
    totalStaked: int
    stakingRate: float
    cumulativeRewards: int
class GovernanceResponse(BaseModel):
    data: GovernanceData