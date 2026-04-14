# 🚀 Threadify Deployment Guide - Complete & Updated

## 📋 What You'll Need

- [ ] GitHub account (to store your code)
- [ ] MongoDB Atlas account (free database)
- [ ] Railway account (backend hosting - $5-10/month)
- [ ] Vercel account (frontend hosting - free)
- [ ] Cloudinary account (already setup)
- [ ] Stripe account (already setup with test keys)

**Total Time:** 45-60 minutes  
**Cost:** $5-10/month (Railway only)

---

## 🎯 Deployment Overview

Your app has 3 parts that need to be deployed:

```
┌─────────────────────────────────────────────────────────┐
│  1. DATABASE (MongoDB Atlas)                            │
│     Stores: Products, Users, Orders, Cart               │
│     Free tier available                                 │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  2. BACKEND (Railway)                                   │
│     API Server: Handles business logic                  │
│     Location: backend/ folder                           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  3. FRONTEND (Vercel)                                   │
│     User Interface: What customers see                  │
│     Location: frontend/ folder                          │
└─────────────────────────────────────────────────────────┘
```

**Deploy in this order:** Database → Backend → Frontend

---

## 🔐 Step 0: Secure Your Code (5 minutes)

### Remove Sensitive Files from Git

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

1. **Go to:** [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. **Sign up** with Google or email
3. **Choose:** Free tier (M0 Sandbox)

### 1.2 Create Database Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select **cloud provider** (AWS recommended)
4. Choose **region** closest to you
5. Cluster name: `Threadify` (or keep default)
6. Click **"Create"**

⏱️ Wait 3-5 minutes for cluster to be created

### 1.3 Create Database User

1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `threadify_admin`
5. Password: Click **"Autogenerate Secure Password"** and **COPY IT**
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

💾 **SAVE THIS PASSWORD** - you'll need it!

### 1.4 Allow Network Access

1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. Confirm: `0.0.0.0/0` (allows Railway to connect)
5. Click **"Confirm"**

### 1.5 Get Connection String

1. Click **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. **Copy** the connection string

It looks like:

```
mongodb+srv://threadify_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. **Replace** `<password>` with the password you saved
7. **Add** database name at the end: `/threadify`

Final format:

```
mongodb+srv://threadify_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/threadify?retryWrites=true&w=majority
```

💾 **SAVE THIS CONNECTION STRING** - you'll need it for Railway!

---

## 🚂 Step 2: Deploy Backend to Railway (15 minutes)

**Why second?** Frontend needs the backend API URL.

### 2.1 Create Railway Account

1. **Go to:** [railway.app](https://railway.app)
2. **Sign up** with GitHub
3. **Authorize** Railway to access your repositories

### 2.2 Create New Project

1. Click **"New Project"**
2. Click **"Deploy from GitHub repo"**
3. Select **"Asmatbangash/T-Shirt"** (your repository)
4. Railway will start deploying...

⚠️ **STOP!** It will fail because it doesn't know which folder to use.

### 2.3 Configure Root Directory

**This is critical!** Your backend code is in the `backend/` folder.

1. Click on your service (the deployment that just started)
2. Click **"Settings"** tab (gear icon)
3. Scroll down to **"Root Directory"**
4. Type: `backend`
5. Click **"Save"**

### 2.4 Configure Build Settings

Still in Settings:

1. **Start Command:** `npm start`
2. **Build Command:** (leave empty - auto-detected)
3. **Watch Paths:** `backend/**` (optional - only redeploy on backend changes)

### 2.5 Add Environment Variables

1. Click **"Variables"** tab
2. Click **"New Variable"**
3. Add these variables **ONE BY ONE**:

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

1. **Go to:** [vercel.com](https://vercel.com)
2. **Sign up** with GitHub
3. **Authorize** Vercel to access your repositories

### 3.2 Import Your Project

1. Click **"Add New"** → **"Project"**
2. Find **"Asmatbangash/T-Shirt"** in the list
3. Click **"Import"**

### 3.3 Configure Project Settings

**Framework Preset:** Vite (should auto-detect)

**Root Directory:** Click **"Edit"** and type: `frontend`

**Build Settings:**

- Build Command: `npm run build` (auto-detected)
- Output Directory: `dist` (auto-detected)
- Install Command: `npm install` (auto-detected)

### 3.4 Add Environment Variables

⚠️ **IMPORTANT:** Add these as **SEPARATE** variables, not all on one line!

Click **"Environment Variables"** section:

**Variable 1:**

1. Click **"Add"**
2. Key: `VITE_API_URL`
3. Value: `https://your-backend.railway.app/api` (from Step 2.7, add `/api` at end)
4. Check: ☑ Production ☑ Preview ☑ Development
5. Click **"Save"**

**Variable 2:**

1. Click **"Add"** again
2. Key: `VITE_STRIPE_PUBLISHABLE_KEY`
3. Value: `pk_test_51SruLZJNbviK3qXfJ55IqRglSipttnpR6jyoUIEFgjBoxACaU16I0t78rjJVRE39z5CwAENIPnZsASWeiO7JJm4S00JPVcDzGE`
4. Check: ☑ Production ☑ Preview ☑ Development
5. Click **"Save"**

### 3.5 Deploy Frontend

1. Click **"Deploy"** button
2. Wait 1-2 minutes for build
3. ✅ Deployment successful!

### 3.6 Get Your Frontend URL

After deployment:

1. Click on the deployment
2. Copy the URL (looks like: `https://t-shirt-asmat.vercel.app`)

💾 **SAVE THIS URL** - you need to update backend!

### 3.7 Test Your Frontend

Visit your Vercel URL in browser. You should see:

- ✅ Homepage loads
- ✅ Products display
- ⚠️ Login/Register might not work yet (need to update CORS)

---

## 🔗 Step 4: Connect Frontend & Backend (5 minutes)

Now make them talk to each other!

### 4.1 Update Backend CORS

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

1. Go to Vercel project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add"**
4. Enter your domain: `yourdomain.com`
5. Follow DNS instructions from your domain provider

### 6.2 Update Backend

Update `FRONTEND_URL` in Railway to your custom domain:

```
FRONTEND_URL=https://yourdomain.com
```

---

## ✅ Step 7: Final Testing Checklist

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
