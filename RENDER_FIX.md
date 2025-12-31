# Render Deployment Fix - npm ci Error

## Problem
Render was failing with: `npm ci requires package-lock.json`

## Solution Applied
We've added Docker configuration and npm settings to work around this issue:

1. **Dockerfile** (`apps/api/Dockerfile`)
   - Uses multi-stage build
   - Explicitly uses `npm install --legacy-peer-deps` instead of `npm ci`
   - Optimizes final image size

2. **.npmrc** (root directory)
   - Configures npm to use legacy peer deps
   - Disables audit and fund checks for faster builds

3. **Environment Config** (`render.yaml`)
   - Already configured to use `npm install --legacy-peer-deps`

## What to Do in Render Dashboard

### Option 1: Let Render Auto-Detect (Recommended)
1. Render should automatically detect the Dockerfile
2. Click **Redeploy** on the `repfy-backend` service
3. Render will use the Dockerfile instead of default Node setup
4. Build should complete successfully (5-10 minutes)

### Option 2: Force Dockerfile Build
1. Go to your `repfy-backend` service
2. Click **Settings**
3. Look for "Build" settings
4. Ensure it's using the **Dockerfile** option
5. Click **Redeploy**

### Option 3: Manual Redeploy
1. In your service, click the **Redeploy** button
2. Wait for logs to show it's using the Dockerfile
3. Monitor the build process

## Expected Behavior

When using the Dockerfile:
```
#13 [builder 3/9] RUN npm install --legacy-peer-deps
#13 30.45 > npm install --legacy-peer-deps
#13 45.23 added 828 packages
#13 45.45
#13 [builder 4/9] WORKDIR /app/apps/api
#13 [builder 5/9] RUN npm run build
#13 47.12 > tsc
#13 52.34 Successfully compiled TypeScript
#13 [stage-1 6/6] COPY --from=builder ...
```

✅ Success indicators:
- No "npm ci" errors
- Build completes
- Service starts successfully
- Logs show "🚀 Repfy API running on port 3001"

## Verification

Once build is complete:

1. **Check Service Status**
   - Should show green "Live" status
   - URL: `https://repfy-backend.onrender.com`

2. **Test Health Endpoint**
   ```bash
   curl https://repfy-backend.onrender.com/health
   ```
   Expected response:
   ```json
   {"status":"ok","message":"Repfy API is running"}
   ```

3. **Run Migrations**
   ```bash
   # In Render Shell
   npx prisma migrate deploy
   ```

## Troubleshooting

### Build still fails
- Check if Render is using the Dockerfile (check logs)
- Try deleting the service and recreating it
- Contact Render support if Docker issues persist

### Service crashes after build
- Check the logs for TypeScript errors
- Verify all environment variables are set
- Ensure DATABASE_URL is correct

### Port issues
- Verify PORT=3001 is set in environment variables
- Check that ALLOWED_ORIGINS is set correctly

## Files Added/Modified

- ✅ `apps/api/Dockerfile` - Multi-stage Docker build
- ✅ `apps/api/.dockerignore` - Exclude files from Docker image
- ✅ `.npmrc` - npm configuration
- ✅ `render.yaml` - Already has correct install command
