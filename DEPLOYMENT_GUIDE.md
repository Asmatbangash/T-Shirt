# 🚀 Threadify Deployment Guide

## Prerequisites

- [ ] GitHub account
- [ ] Vercel account (for frontend)
- [ ] Railway/Render account (for backend)
- [ ] MongoDB Atlas account (free tier)
- [ ] Cloudinary account
- [ ] Stripe account (test/live keys)
- [ ] Custom domain (optional)

---

## Step 1: Prepare Environment Variables

### 1.1 Remove Sensitive Files from Git

```bash
# Remove .env files from git tracking
git rm --cached backend/.env
git rm --cached frontend/.env

# Commit the removal
git add .gitignore
git commit -m "chore: remove sensitive env files from git"
```

### 1.2 Update .gitignore

Ensure both `.gitignore` files include:

```
.env
.env.local
.env.production
.env.development
```

---

## Step 2: Setup MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Create database user:
   - Username: `threadify_user`
   - Password: Generate strong password
4. Network Access:
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `threadify`

Example: `mongodb+srv://threadify_user:PASSWORD@cluster0.xxxxx.mongodb.net/threadify`

---

## Step 3: Deploy Backend (Railway)

### 3.1 Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Choose "backend" folder as root directory

### 3.2 Configure Environment Variables

In Railway dashboard, add these variables:

```env
PORT=8080
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/threadify
JWT_SECRET=generate-a-secure-random-string-here
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
CLOUD_NAME=your-cloudinary-name
CLOUD_API_KEY=your-cloudinary-key
CLOUD_API_SECRET=your-cloudinary-secret
FRONTEND_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### 3.3 Deploy

- Railway will auto-deploy
- Note your backend URL: `https://your-app.railway.app`

### 3.4 Seed Database

In Railway terminal:

```bash
npm run seed
npm run create-admin
```

---

## Step 4: Deploy Frontend (Vercel)

### 4.1 Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 4.2 Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend.railway.app/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
```

### 4.3 Deploy

- Click "Deploy"
- Wait for build to complete
- Note your frontend URL: `https://your-project.vercel.app`

---

## Step 5: Update CORS

Update backend CORS to allow your Vercel domain:

In `backend/src/index.js`:

```javascript
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
```

Redeploy backend on Railway.

---

## Step 6: Custom Domain (Optional)

### 6.1 Add Domain to Vercel

1. Vercel Dashboard → Settings → Domains
2. Add your domain: `threadify.com`
3. Follow DNS configuration instructions

### 6.2 Update Environment Variables

Update `FRONTEND_URL` in Railway to your custom domain.

---

## Step 7: Testing Checklist

### Frontend Tests

- [ ] Homepage loads
- [ ] Shop page displays products
- [ ] Product detail page works
- [ ] User registration works
- [ ] User login works
- [ ] Add to cart works
- [ ] Cart page displays items
- [ ] Checkout form validates
- [ ] Stripe payment processes
- [ ] Order confirmation shows
- [ ] Order history displays
- [ ] Admin login works
- [ ] Admin dashboard loads

### Backend Tests

- [ ] API health check: `GET /`
- [ ] Products endpoint: `GET /api/products`
- [ ] User registration: `POST /api/users/register`
- [ ] User login: `POST /api/users/login`
- [ ] Cart operations work
- [ ] Order creation works
- [ ] Stripe webhook (if configured)

---

## Step 8: Go Live with Stripe

### 8.1 Activate Stripe Account

1. Complete Stripe account verification
2. Get live API keys from dashboard
3. Update environment variables with live keys

### 8.2 Update Keys

**Railway (Backend):**

```
STRIPE_SECRET_KEY=sk_live_...
```

**Vercel (Frontend):**

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## Monitoring & Maintenance

### Logs

**Railway:**

- Dashboard → Deployments → View Logs

**Vercel:**

- Dashboard → Deployments → Function Logs

### Database Backups

**MongoDB Atlas:**

- Cluster → Backup → Configure backup schedule

### Performance Monitoring

Consider adding:

- Sentry for error tracking
- Google Analytics for user tracking
- Stripe Dashboard for payment monitoring

---

## Troubleshooting

### Issue: CORS Error

**Solution:** Ensure `FRONTEND_URL` in backend matches your Vercel domain exactly.

### Issue: Database Connection Failed

**Solution:**

- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure password doesn't contain special characters (URL encode if needed)

### Issue: Stripe Payment Fails

**Solution:**

- Verify Stripe keys are correct (live vs test)
- Check Stripe dashboard for error details
- Ensure postal code validation is working

### Issue: Images Not Loading

**Solution:**

- Verify Cloudinary credentials
- Check CORS settings in Cloudinary dashboard
- Ensure image URLs are HTTPS

---

## Security Checklist

- [ ] All .env files removed from git
- [ ] Strong JWT secret (32+ characters)
- [ ] MongoDB user has limited permissions
- [ ] Stripe webhook secret configured (if using webhooks)
- [ ] HTTPS enabled on all domains
- [ ] Rate limiting enabled
- [ ] Helmet security headers enabled
- [ ] Input validation on all endpoints
- [ ] Admin routes protected
- [ ] CORS properly configured

---

## Cost Estimate (Monthly)

- **Vercel:** Free (Hobby plan)
- **Railway:** $5-10 (usage-based)
- **MongoDB Atlas:** Free (M0 cluster)
- **Cloudinary:** Free (up to 25GB)
- **Stripe:** 2.9% + $0.30 per transaction
- **Domain:** $10-15/year

**Total:** ~$5-10/month + transaction fees

---

## Support

For issues:

1. Check logs in Railway/Vercel
2. Review MongoDB Atlas metrics
3. Check Stripe dashboard for payment errors
4. Review this guide's troubleshooting section

---

**Status:** Ready for Production ✅
**Last Updated:** 2026-04-13
