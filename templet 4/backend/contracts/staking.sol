/* Staking.sol.
Enhanced with reward calculation and unstaking logic. Rewards are calculated based on stake amount and lock period, with a base APY of 5%.*/
SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    mapping(address => mapping(uint256 => uint256)) public stakes;
    mapping(address => mapping(uint256 => uint256)) public stakeStartTime;
    mapping(address => uint256) public totalStaked;
    mapping(address => uint256) public totalRewards;
    uint256[] public lockPeriods = [7 days, 14 days, 30 days];
    uint256 public constant BASE_APY = 5; // 5% annual percentage yield
    uint256 public constant SECONDS_PER_YEAR = 31536000;

    event Staked(address indexed user, uint256 amount, uint256 lockPeriod);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);

    function stake(uint256 _amount, uint256 _lockPeriod) public payable {
        require(msg.value == _amount, "Incorrect TRX amount");
        require(isValidLockPeriod(_lockPeriod), "Invalid lock period");
        stakes[msg.sender][_lockPeriod] += _amount;
        totalStaked[msg.sender] += _amount;
        stakeStartTime[msg.sender][_lockPeriod] = block.timestamp;
        emit Staked(msg.sender, _amount, _lockPeriod);
    }

    function unstake(uint256 _amount, uint256 _lockPeriod) public {
        require(stakes[msg.sender][_lockPeriod] >= _amount, "Insufficient staked amount");
        require(block.timestamp >= stakeStartTime[msg.sender][_lockPeriod] + _lockPeriod, "Lock period not expired");
        uint256 reward = calculateReward(msg.sender, _lockPeriod);
        stakes[msg.sender][_lockPeriod] -= _amount;
        totalStaked[msg.sender] -= _amount;
        totalRewards[msg.sender] += reward;
        payable(msg.sender).transfer(_amount + reward);
        emit Unstaked(msg.sender, _amount);
        emit RewardClaimed(msg.sender, reward);
    }

    function calculateReward(address _user, uint256 _lockPeriod) public view returns (uint256) {
        uint256 stakedAmount = stakes[_user][_lockPeriod];
        uint256 timeStaked = block.timestamp - stakeStartTime[_user][_lockPeriod];
        uint256 reward = (stakedAmount * BASE_APY * timeStaked) / (SECONDS_PER_YEAR * 100);
        return reward;
    }

    function claimReward(uint256 _lockPeriod) public {
        uint256 reward = calculateReward(msg.sender, _lockPeriod);
        require(reward > 0, "No rewards to claim");
        totalRewards[msg.sender] += reward;
        stakeStartTime[msg.sender][_lockPeriod] = block.timestamp; // Reset for next reward cycle
        payable(msg.sender).transfer(reward);
        emit RewardClaimed(msg.sender, reward);
    }

    function isValidLockPeriod(uint256 _lockPeriod) private view returns (bool) {
        for (uint256 i = 0; i < lockPeriods.length; i++) {
            if (_lockPeriod == lockPeriods[i]) {
                return true;
            }
        }
        return false;
    }
}