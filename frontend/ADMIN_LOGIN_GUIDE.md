# Admin Login & Access Guide

## How Admin Login Works

Admin users login through the **same login page** as regular users (`/login`). The difference is in the user's role stored in the database.

## Step-by-Step: Admin Login

### 1. Create Admin User (Backend)

First, create an admin user in the backend:

```bash
cd backend
npm run create-admin-simple
```

This creates an admin with:

- **Email:** `admin@threadify.com`
- **Password:** `admin123456`

### 2. Login as Admin (Frontend)

1. Go to the login page: `http://localhost:5173/login`
2. Enter admin credentials:
   - Email: `admin@threadify.com`
   - Password: `admin123456`
3. Click "Sign In"

### 3. Access Admin Features

Once logged in as admin, you'll see:

- **Admin Badge** next to your name in the navbar
- **Admin Link** in the navigation menu
- Access to `/admin` dashboard
- Ability to create/edit/delete products

## What Happens Behind the Scenes

1. **Login Request:**

   ```javascript
   POST /api/users/login
   {
     "Email": "admin@threadify.com",
     "Password": "admin123456"
   }
   ```

2. **Backend Response:**

   ```javascript
   {
     "success": true,
     "user": {
       "_id": "...",
       "FullName": "Admin User",
       "Email": "admin@threadify.com",
       "role": "admin"  // ← This is the key!
     }
   }
   ```

3. **Frontend Storage:**
   - User data (including role) stored in AuthContext
   - JWT token stored in HTTP-only cookie
   - `isAdmin()` function checks if `user.role === 'admin'`

## Admin vs Regular User

### Regular User

```javascript
{
  "_id": "123",
  "FullName": "John Doe",
  "Email": "john@example.com",
  "role": "user"  // ← Regular user
}
```

### Admin User

```javascript
{
  "_id": "456",
  "FullName": "Admin User",
  "Email": "admin@threadify.com",
  "role": "admin"  // ← Admin user
}
```

## Admin-Only Features

### Frontend Protection

- Admin routes wrapped in `<AdminRoute>` component
- Redirects non-admins to home page
- Shows "Access Denied" message

### Backend Protection

- Admin endpoints use `authenticate` + `isAdmin` middleware
- Returns 403 error if non-admin tries to access
- Validates JWT token and user role

## Creating More Admins

### Option 1: Using Script (Recommended)

```bash
cd backend
npm run create-admin-simple
```

Edit `backend/src/scripts/createAdminSimple.js` to change default credentials.

### Option 2: Upgrade Existing User

```bash
cd backend
npm run create-admin
# Enter existing user's email
# Type 'yes' when asked to upgrade
```

### Option 3: Direct Database Update

```javascript
// In MongoDB shell or Compass
db.users.updateOne({ Email: "user@example.com" }, { $set: { role: "admin" } });
```

## Security Notes

1. **No Admin Registration Page** - Admins can only be created via backend scripts or database
2. **JWT Authentication** - All admin actions require valid JWT token
3. **Role Verification** - Backend checks role on every admin endpoint
4. **HTTP-Only Cookies** - Tokens stored securely, not accessible via JavaScript

## Testing Admin Access

### Test 1: Login as Admin

1. Login with admin credentials
2. Check navbar for "Admin" badge
3. Click "Admin" link in navigation
4. Should see Admin Dashboard

### Test 2: Try Admin Action

1. Go to Admin Dashboard
2. Try creating a product
3. Should succeed if you're admin

### Test 3: Login as Regular User

1. Register a new account (will be regular user)
2. Try accessing `/admin` route
3. Should be redirected or see "Access Denied"

## Troubleshooting

### "Access Denied" when logged in as admin

- Check browser console for user object
- Verify `user.role === 'admin'`
- Clear cookies and login again

### Admin link not showing

- Make sure you're logged in
- Check that `isAdmin(user)` returns true
- Verify user object has `role: 'admin'`

### Can't create products

- Check browser console for errors
- Verify JWT cookie is present
- Check backend logs for authentication errors

## Summary

✅ Admins login through the **same login page** as regular users
✅ The `role` field determines admin privileges
✅ Admin features are **automatically shown** when logged in as admin
✅ Admin routes are **protected** on both frontend and backend
✅ No separate admin registration page needed
