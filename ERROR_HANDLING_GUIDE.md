# Error Handling Guide

This document explains how errors are handled in the Threadify application.

## Understanding the 401 Error on Page Load

### What You Might See

When you first load the application, you might see this in the browser console:

```
Failed to load resource: the server responded with a status of 401 (Unauthorized)
http://localhost:8080/api/users/me
```

### Why This Happens

This is **NORMAL and EXPECTED behavior**. Here's why:

1. When the app loads, it automatically checks if there's a logged-in user
2. It calls `/api/users/me` to get the current user's information
3. If no one is logged in (no valid session cookie), the server returns 401
4. The app handles this gracefully and continues working normally

### This is NOT an Error

- ✅ The application is working correctly
- ✅ This is expected when no user is logged in
- ✅ The error is handled silently in the code
- ✅ Users won't see any error messages
- ✅ The app continues to function normally

## How We Handle It

### Frontend Error Handling

We've implemented smart error handling that:

1. **Distinguishes between expected and unexpected errors**
   - 401 errors when not logged in = Expected (not logged)
   - Other errors = Unexpected (logged to console)

2. **Provides user-friendly messages**
   - Auth errors: "Please log in to continue"
   - Permission errors: "You do not have permission"
   - Server errors: "Server error. Please try again later"

3. **Prevents console spam**
   - Expected 401 errors are silently handled
   - Only real errors are logged

### Code Implementation

```javascript
// frontend/src/utils/errorHandler.js
export const isAuthError = (error) => {
  return error?.status === 401;
};

export const shouldLogError = (error) => {
  // Don't log auth errors - they're expected when not logged in
  if (isAuthError(error)) {
    return false;
  }
  return true;
};
```

```javascript
// frontend/src/context/AuthContext.jsx
try {
  const response = await userAPI.getCurrentUser();
  if (response.success) {
    setUser(response.user);
  }
} catch (error) {
  // Only log unexpected errors (not 401 when user isn't logged in)
  if (shouldLogError(error)) {
    console.error("Auth check error:", error.message);
  }
  // User stays null - this is expected when not logged in
}
```

## Error Status Codes

### 401 - Unauthorized

- **When**: User is not logged in or session expired
- **Handling**: Silently handled, user stays logged out
- **User Action**: None required (or redirect to login if needed)

### 403 - Forbidden

- **When**: User is logged in but doesn't have permission
- **Handling**: Show "Access Denied" message
- **User Action**: Contact admin or use different account

### 404 - Not Found

- **When**: Requested resource doesn't exist
- **Handling**: Show "Not Found" message
- **User Action**: Check URL or go back

### 500 - Server Error

- **When**: Something went wrong on the server
- **Handling**: Show "Server Error" message
- **User Action**: Try again later or contact support

## Protected Routes

### How They Work

1. User tries to access protected route (e.g., `/admin`)
2. `ProtectedRoute` component checks if user is logged in
3. If not logged in:
   - Shows loading spinner while checking
   - Redirects to `/login` if no user found
4. If logged in:
   - Renders the protected content

### Admin Routes

Admin routes have an extra check:

1. Check if user is logged in (same as above)
2. Check if user has admin role
3. If not admin:
   - Show "Access Denied" message
   - Redirect to home page

## API Error Handling

### Consistent Error Format

All API errors follow this format:

```javascript
{
  success: false,
  message: "Error description",
  error: "Detailed error (dev mode only)"
}
```

### Error Propagation

```javascript
// API Service
const apiCall = async (endpoint, options) => {
  const response = await fetch(...)
  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.message)
    error.status = response.status
    throw error
  }

  return data
}
```

## Best Practices

### For Developers

1. **Always handle errors in try-catch blocks**

   ```javascript
   try {
     await someAPICall();
   } catch (error) {
     if (shouldLogError(error)) {
       console.error("Error:", error);
     }
     // Show user-friendly message
   }
   ```

2. **Use the error handler utility**

   ```javascript
   import { getUserErrorMessage } from '@/utils/errorHandler'

   catch (error) {
     alert(getUserErrorMessage(error))
   }
   ```

3. **Don't log expected errors**
   - 401 when not logged in = Expected
   - 404 when resource doesn't exist = May be expected
   - 500 server errors = Unexpected, always log

4. **Provide context in error messages**
   ```javascript
   catch (error) {
     console.error('Failed to load products:', error)
   }
   ```

### For Users

1. **If you see a 401 error in console**
   - This is normal when not logged in
   - No action needed
   - The app is working correctly

2. **If you see "Access Denied"**
   - You need to log in
   - Or you need admin permissions
   - Contact admin if you should have access

3. **If you see "Server Error"**
   - Try refreshing the page
   - Try again in a few minutes
   - Contact support if it persists

## Testing Error Handling

### Test 401 Errors

1. Open app without logging in
2. Check console - should see 401 (this is fine)
3. Try to access `/admin` - should redirect to login
4. No error messages should be shown to user

### Test 403 Errors

1. Log in as regular user
2. Try to access `/admin`
3. Should see "Access Denied" message
4. Should redirect to home page

### Test Network Errors

1. Stop the backend server
2. Try to perform any action
3. Should see appropriate error message
4. App should not crash

## Debugging Tips

### Check Authentication Status

```javascript
// In browser console
localStorage.getItem("user"); // Check stored user
document.cookie; // Check for authToken cookie
```

### Check API Responses

1. Open DevTools → Network tab
2. Filter by "Fetch/XHR"
3. Click on any request
4. Check Response tab for error details

### Common Issues

**Issue**: 401 errors everywhere

- **Cause**: Session expired or cookies blocked
- **Fix**: Log in again, check cookie settings

**Issue**: Can't access admin panel

- **Cause**: Not logged in as admin
- **Fix**: Use admin credentials (admin@threadify.com)

**Issue**: Images not loading

- **Cause**: Cloudinary credentials missing
- **Fix**: Check backend .env file

## Summary

The 401 error you see on page load is **completely normal** and indicates the app is working correctly. It's checking for a logged-in user, finding none, and handling it gracefully. No action is needed from you or your users.

The error handling system ensures:

- ✅ Expected errors are handled silently
- ✅ Unexpected errors are logged for debugging
- ✅ Users see friendly error messages
- ✅ The app never crashes from errors
- ✅ Developers can easily debug issues
