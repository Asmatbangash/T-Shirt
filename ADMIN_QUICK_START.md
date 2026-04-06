# Admin Quick Start Guide

## 🚀 Quick Setup (2 Steps)

### Step 1: Create Admin User

```bash
cd backend
npm run create-admin-simple
```

**Admin Credentials Created:**

- Email: `admin@threadify.com`
- Password: `admin123456`

### Step 2: Login as Admin

1. Go to: `http://localhost:5173/login`
2. Enter the credentials above
3. Click "Sign In"

## ✅ What You'll See

Once logged in as admin:

1. **Navbar Changes:**
   - "Admin" badge next to your name
   - "Admin" link in navigation menu

2. **Admin Dashboard Access:**
   - Click "Admin" in navbar
   - Or go to: `http://localhost:5173/admin`

3. **Admin Capabilities:**
   - Create new products
   - Edit existing products
   - Delete products
   - Manage inventory

## 🔐 How It Works

### Same Login Page for Everyone

- Regular users and admins use the **same login page**
- The difference is the `role` field in the database
- Admin features automatically appear when logged in as admin

### User Roles

```javascript
// Regular User
{
  role: "user";
}

// Admin User
{
  role: "admin";
}
```

### Protected Routes

- `/admin` route requires admin role
- Non-admins are redirected
- Backend validates role on every admin API call

## 📝 Important Notes

1. **No Admin Registration Page** - Admins must be created via backend script
2. **Security** - Admin credentials should be changed in production
3. **Testing** - Dev mode shows admin credentials on login page
4. **JWT Tokens** - Stored in HTTP-only cookies for security

## 🧪 Test It Out

1. **Login as Admin:**

   ```
   Email: admin@threadify.com
   Password: admin123456
   ```

2. **Check Admin Features:**
   - Look for "Admin" badge in navbar
   - Click "Admin" link
   - Try creating a product

3. **Test Regular User:**
   - Logout
   - Register new account
   - Try accessing `/admin` (should be denied)

## 🛠️ Create More Admins

```bash
cd backend
npm run create-admin-simple
```

Edit `backend/src/scripts/createAdminSimple.js` to change credentials.

## 📚 Full Documentation

- Frontend Guide: `frontend/ADMIN_LOGIN_GUIDE.md`
- Backend Setup: `backend/ADMIN_SETUP.md`

---

**That's it!** Admin login is ready to use. 🎉
