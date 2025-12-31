# Quick Render Setup - Backend Deployment

## Current Status
- ✅ PostgreSQL database created and connected
- ❌ Backend service needs to be recreated (was using wrong config)
- ⏳ Need to redeploy with Docker

## Why Delete and Recreate?
The service was configured to use Node environment with `rootDir: apps/api`, but we've switched to Docker. **Easiest fix: delete and recreate.**

---

## Steps to Deploy Backend

### Step 1: Delete the Old Service (if exists)
1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Find `repfy-backend` service
3. Click **Settings** → **Danger Zone** → **Delete Service**
4. Confirm deletion (data in DB is safe, only the service is deleted)

### Step 2: Create New Web Service with Docker
1. Click **New** → **Web Service**
2. Connect repository `testerep`
3. Fill in:
   - **Name**: `repfy-backend`
   - **Environment**: `Docker` (not Node!)
   - **Region**: Same as your database (Oregon)
   - **Branch**: `main`
   - **Dockerfile path**: `./Dockerfile` (or leave blank for default)

### Step 3: Add Environment Variables
Click **Advanced** and add:

```
NODE_ENV=production
PORT=3001
JWT_SECRET=cccc7961fdabcd8f5fb5f110049f1d3c6c30c3af1109cc60a12131ae326f62cb
JWT_REFRESH_SECRET=a2a191fbe54059c8456d5fbb2d76607d2d38c37c884fc1fb7eb7a1ae875e3f57
ALLOWED_ORIGINS=https://repfy.vercel.app
DATABASE_URL=postgresql://repfy_user:3oEQ8AqjdSAdzfdIS4PPlWZamtsB5Z5P@dpg-d5amhufgi27c739530sg-a.oregon-postgres.render.com/repfy
```

### Step 4: Create Service
Click **Create Web Service**

Render will:
1. Clone your repo (fetches latest from GitHub)
2. Read the Dockerfile from root
3. Build the Docker image (5-10 minutes)
4. Deploy it

### Step 5: Verify Success
When it shows green "Live" status and a URL like `https://repfy-backend.onrender.com`:

```bash
curl https://repfy-backend.onrender.com/health
```

Should return:
```json
{"status":"ok","message":"Repfy API is running"}
```

### Step 6: Run Migrations
1. In Render service, click **Shell**
2. Run:
   ```bash
   npx prisma migrate deploy
   ```
3. Wait for "Migrations have been applied"

---

## What We Fixed

### The Problem
- Initial setup used Node environment with `rootDir: apps/api`
- Dockerfile was in `apps/api/` but should be in root for monorepo
- `npm ci` was failing due to missing `package-lock.json` handling

### The Solution
- ✅ Moved Dockerfile to root with correct paths
- ✅ Updated `render.yaml` to use Docker environment
- ✅ Added `.npmrc` and `.dockerignore` for optimization
- ✅ Dockerfile uses `npm install --legacy-peer-deps` (works with monorepo)

---

## Backend URL After Deploy
Once live, your backend will be at:
```
https://repfy-backend.onrender.com
```

Update this in Vercel environment variables:
```
NEXT_PUBLIC_API_URL=https://repfy-backend.onrender.com
```

Then redeploy frontend on Vercel to pick up the new URL.

---

## Troubleshooting

### Build fails with "Dockerfile not found"
- Make sure you're on the latest commit
- Verify `./Dockerfile` exists in root
- Check that you selected "Docker" environment, not "Node"

### Build succeeds but service doesn't start
- Check the logs in Render dashboard
- Verify DATABASE_URL is correct
- Ensure all environment variables are set

### Migrations fail
- Verify database is accessible from backend
- Check DATABASE_URL variable
- Ensure Prisma schema is valid

### CORS errors from frontend
- Update ALLOWED_ORIGINS in Render environment
- Must match exactly: `https://repfy.vercel.app`
- Restart the service after changing

---

## Files Modified
- ✅ `Dockerfile` (created in root)
- ✅ `.dockerignore` (created in root)
- ✅ `render.yaml` (updated to use Docker)
- ✅ `.npmrc` (created in root)
- ✅ `apps/api/.dockerignore` (created)
