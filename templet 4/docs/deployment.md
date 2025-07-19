 Deployment: Environment Variables

The `.env` file securely stores sensitive variables:
- `TRONGRID_API_KEY`: Obtained from TronGrid (https://www.trongrid.io)[](https://x.com/justinsuntron/status/1141536489056034816)
- `SECRET_KEY`: Randomly generated secure key for JWT.
- `DATABASE_URL` and `REDIS_URL`: Configured for PostgreSQL and Redis instances.

To deploy:
1. Install dependencies: `pip install -r backend/requirements.txt` and `npm install` in `/frontend` and `/admin`.
2. Initialize database: `python -m app.database init_db`.
3. Start backend: `uvicorn app.main:app --reload`.
4. Build and deploy frontend/admin to Netlify: `npm run build`.
5. Ensure `.env` is not committed to version control (add to `.gitignore`).
6. Use a secure vault (e.g., AWS Secrets Manager) for production environment variables.