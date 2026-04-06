# Admin User Setup Guide

## Quick Setup (Recommended)

Run this command to create an admin user with default credentials:

```bash
npm run create-admin-simple
```

**Default Admin Credentials:**

- Email: `admin@threadify.com`
- Password: `admin123456`

⚠️ **IMPORTANT:** Change these credentials after first login!

---

## Custom Admin Setup (Interactive)

To create an admin with custom credentials:

```bash
npm run create-admin
```

This will prompt you to enter:

- Full Name
- Email
- Password (minimum 6 characters)

---

## Making Existing User an Admin

If you already have a user account and want to make it an admin:

1. Run the interactive script:

   ```bash
   npm run create-admin
   ```

2. Enter the email of the existing user

3. When prompted, type `yes` to upgrade the user to admin

---

## Admin Features

Admin users have access to:

- Create new products
- Update existing products
- Delete products
- Manage inventory
- View all orders (coming soon)
- Manage users (coming soon)

---

## API Endpoints (Admin Only)

These endpoints require admin authentication:

### Products

- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Authentication

All admin endpoints require:

1. Valid JWT token (HTTP-only cookie)
2. User role must be 'admin'

---

## Security Notes

1. **Change default password immediately** after first login
2. Admin credentials are stored with bcrypt hashing
3. JWT tokens are stored in HTTP-only cookies
4. Admin role is checked on every protected route
5. Never commit admin credentials to version control

---

## Troubleshooting

### "User already exists"

- The script will ask if you want to upgrade the existing user to admin
- Type `yes` to proceed

### "Connection failed"

- Make sure MongoDB is running
- Check your `.env` file has correct `MONGO_URI`

### "Access denied"

- Make sure you're logged in with an admin account
- Check that the user's role is set to 'admin' in the database
