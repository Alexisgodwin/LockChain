# test_staking.py
# Test script for deploying and testing the staking contract on Shasta testnet.

import pytest
from tronpy import Tron
import os
import time

@pytest.fixture
def tron():
    return Tron(network='shasta', api_key=os.getenv("TRONGRID_API_KEY"))

@pytest.fixture
async def contract(tron):
    with open('contracts/Staking.sol', 'r') as f:
        source_code = f.read()
    contract = await tron.contract().new(
        source_code=source_code,
        contract_name='Staking',
        fee_limit=1000000000,
        owner_address=tron.default_address.base58
    )
    return contract

@pytest.mark.asyncio
async def test_staking(tron, contract):
    amount = tron.to_sun(100)
    lock_period = 7 * 24 * 60 * 60  # 7 days
    tx = await contract.stake(amount, lock_period).send({'fee_limit': 1000000})
    assert tx['txID'], "Staking transaction failed"
    time.sleep(10)  # Wait for confirmation
    staked = await contract.stakes(tron.default_address.base58, lock_period).call()
    assert staked == amount, "Stake amount mismatch"

@pytest.mark.asyncio
async def test_unstaking(tron, contract):
    amount = tron.to_sun(50)
    lock_period = 7 * 24 * 60 * 60
    # Simulate time passing (for testnet, adjust lock period or mock timestamp)
    tx = await contract.unstake(amount, lock_period).send({'fee_limit': 1000000})
    assert tx['txID'], "Unstaking transaction failed"
    time.sleep(10)
    staked = await contract.stakes(tron.default_address.base58, lock_period).call()
    assert staked == tron.to_sun(50), "Unstake amount mismatch"

@pytest.mark.asyncio
async def test_reward_calculation(tron, contract):
    reward = await contract.calculateReward(tron.default_address.base58, 7 * 24 * 60 * 60).call()
    assert reward >= 0, "Reward calculation failed"