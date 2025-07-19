### api.md
Updated with new endpoints.

# API Documentation

## Endpoints
- **GET /search?q={query}**: Search by token, account, contract, tx hash, or block.
- **GET /blocks/latest**: Get latest blocks.
- **GET /blocks/{num}**: Get block by number.
- **GET /tx/{hash}**: Get transaction by hash.
- **GET /address/{address}**: Get address details.
- **GET /token/{contract}**: Get token details.
- **GET /nodes**: Get total nodes.
- **GET /contracts**: Get contract stats.
- **GET /tokens**: Get top tokens.
- **GET /gas**: Get energy price.
- **POST /admin/blacklist**: Blacklist a token.
- **GET /admin/logs**: Get system logs.
- **GET /admin/api-usage**: Get API usage stats.
- **POST /admin/feature-toggle**: Toggle features.
- **POST /admin/verify-contract**: Upload and verify contract source code.
- **POST /staking/stake**: Stake TRX.
- **POST /staking/unstake**: Unstake TRX.
- **GET /staking/reward**: Calculate staking reward.

## Authentication
- Use `Authorization: Bearer <token>` header for all requests.
- Admin endpoints require admin-level JWT.
- Use `X-API-Key` header for usage tracking.