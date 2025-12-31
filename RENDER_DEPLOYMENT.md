# Render Deployment Guide - Repfy Backend

## Step 1: Create PostgreSQL Database

1. Go to [render.com](https://render.com)
2. Click **New** → **PostgreSQL**
3. Configure:
   - **Name**: `repfy-db`
   - **Database**: `repfy`
   - **User**: (Render generates automatically)
   - **Region**: Same as your backend (recommended)
   - **Plan**: Standard (or Free for testing)
4. Click **Create Database**
5. Wait for database to be ready (2-3 minutes)
6. Copy the **Internal Database URL** - you'll need this

## Step 2: Create Web Service for Backend

1. Click **New** → **Web Service**
2. Click **Connect Repository**
3. Select: `https://github.com/rolfmarquardtjr/testerep`
4. Configure:
   - **Name**: `repfy-backend`
   - **Environment**: `Node`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
   - **Root Directory**: `apps/api`
5. Click **Create Web Service**

## Step 3: Configure Environment Variables

In the Render dashboard for your `repfy-backend` service:

1. Go to **Environment** tab
2. Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `JWT_SECRET` | `cccc7961fdabcd8f5fb5f110049f1d3c6c30c3af1109cc60a12131ae326f62cb` |
| `JWT_REFRESH_SECRET` | `a2a191fbe54059c8456d5fbb2d76607d2d38c37c884fc1fb7eb7a1ae875e3f57` |
| `ALLOWED_ORIGINS` | `https://repfy.vercel.app` |
| `DATABASE_URL` | (Paste the Internal Database URL from Step 1) |

3. Click **Save**

## Step 4: Deploy Backend

1. Render will automatically trigger a build after you save variables
2. Wait for deployment to complete (check the **Logs** tab)
3. Once deployed, you'll see a green status and a URL like: `https://repfy-backend.onrender.com`

## Step 5: Run Database Migrations

1. In Render dashboard, go to your `repfy-backend` service
2. Click the **Shell** button (top right)
3. In the shell, run:
   ```bash
   npx prisma migrate deploy
   ```
4. Wait for migrations to complete
5. Optionally seed the database:
   ```bash
   npm run prisma:seed
   ```

## Step 6: Verify Backend is Running

Test your backend URL:
```bash
curl https://repfy-backend.onrender.com/api/health
```

You should get a response (even if it's 404, that means the server is up).

## Step 7: Update Frontend API URL

In your Vercel deployment, update the API base URL from `http://localhost:3001` to `https://repfy-backend.onrender.com/api`

You can either:
1. Update environment variables in Vercel dashboard
2. Or update the code in `apps/web/lib/api.ts` (or wherever API calls are configured)

## Troubleshooting

### Database connection fails
- Check that `DATABASE_URL` is correctly pasted in Environment Variables
- Verify the database name is `repfy`
- Make sure your backend region matches or can reach the database region

### Migrations fail
- SSH into Render shell and check Prisma status:
  ```bash
  npx prisma migrate status
  ```
- Check the `.env` file in the shell:
  ```bash
  cat .env
  ```

### CORS errors
- Update `ALLOWED_ORIGINS` to match your Vercel frontend URL
- Frontend URL should be exactly: `https://repfy.vercel.app`

## Files Used

- `render.yaml` - Infrastructure as code configuration
- `apps/api/prisma/schema.prisma` - Database schema
- `apps/api/.env.production` - Reference environment file
