# Toast Notifications Guide

Beautiful, user-friendly toast notifications using Sonner - the best toast library for React.

## Features

✅ **User-Friendly Messages** - Clear, concise, and helpful
✅ **Rich Colors** - Success (green), Error (red), Loading (blue), Info (gray)
✅ **Auto-Dismiss** - Toasts disappear after 4 seconds
✅ **Close Button** - Users can dismiss manually
✅ **Loading States** - Show progress for async operations
✅ **Descriptions** - Additional context for users
✅ **Position** - Top-right corner (non-intrusive)

## Usage Examples

### Success Toast

```javascript
import { toast } from "sonner";

toast.success("Product created!", {
  description: "Nike Air Max has been added to your store",
});
```

### Error Toast

```javascript
toast.error("Failed to save product", {
  description: "Please check your internet connection and try again",
});
```

### Loading Toast

```javascript
// Start loading
const loadingToast = toast.loading("Uploading image...");

// Update to success
toast.success("Image uploaded!", {
  id: loadingToast,
  description: "Your product image is ready",
});

// Or update to error
toast.error("Upload failed", {
  id: loadingToast,
  description: "Please try a smaller file",
});
```

### Info Toast

```javascript
toast.info("New feature available", {
  description: "Check out our new product filters!",
});
```

### Warning Toast

```javascript
toast.warning("Low stock alert", {
  description: "Only 3 items left in inventory",
});
```

## Where We Use Toasts

### Authentication (AuthPage)

- ✅ Login success: "Welcome back!"
- ✅ Registration success: "Account created!"
- ✅ Login/Registration errors with helpful descriptions

### Product Management (ProductsView)

- ✅ Product created: "Product created! [Name] has been added to your store"
- ✅ Product updated: "Product updated! [Name] has been updated successfully"
- ✅ Product deleted: "Product deleted successfully"
- ✅ Image upload progress: "Uploading image..." → "Image uploaded!"
- ✅ Errors with actionable descriptions

### Orders (OrdersView)

- ✅ Export success: "Orders exported! CSV file has been downloaded"
- ✅ Export errors with retry instructions

### Customers (CustomersView)

- ✅ Email sent: "Email sent! Message sent to [email]"

### Admin Dashboard

- ✅ Logout: "Logged out successfully. See you next time!"

## Best Practices

### 1. Clear, Action-Oriented Messages

```javascript
// ❌ Bad
toast.success("Success");

// ✅ Good
toast.success("Product created!", {
  description: "Nike Air Max has been added to your store",
});
```

### 2. Helpful Error Messages

```javascript
// ❌ Bad
toast.error("Error");

// ✅ Good
toast.error("Failed to save product", {
  description: "Please check your internet connection and try again",
});
```

### 3. Loading States for Async Operations

```javascript
// ✅ Good
const saveToast = toast.loading("Saving product...");

try {
  await saveProduct();
  toast.success("Product saved!", { id: saveToast });
} catch (error) {
  toast.error("Failed to save", { id: saveToast });
}
```

### 4. Provide Context in Descriptions

```javascript
// ✅ Good
toast.success("Order #1234 shipped!", {
  description: "Customer will receive tracking information via email",
});
```

### 5. Use Appropriate Toast Types

- **Success** - Completed actions (created, updated, deleted)
- **Error** - Failed actions with recovery instructions
- **Loading** - In-progress operations
- **Info** - Helpful information or tips
- **Warning** - Cautions or alerts

## Configuration

The Toaster is configured in `App.jsx`:

```javascript
<Toaster
  position="top-right" // Non-intrusive position
  richColors // Beautiful colored toasts
  closeButton // Allow manual dismissal
  duration={4000} // Auto-dismiss after 4 seconds
  toastOptions={{
    style: {
      padding: "16px", // Comfortable spacing
    },
  }}
/>
```

## Customization

### Change Position

```javascript
<Toaster position="bottom-center" />
// Options: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
```

### Change Duration

```javascript
<Toaster duration={5000} /> // 5 seconds
```

### Custom Toast Duration

```javascript
toast.success("Message", {
  duration: 10000, // This toast stays for 10 seconds
});
```

### Persistent Toast (No Auto-Dismiss)

```javascript
toast.success("Important message", {
  duration: Infinity, // Stays until manually dismissed
});
```

## Advanced Usage

### Promise Toast

```javascript
toast.promise(saveProduct(), {
  loading: "Saving product...",
  success: "Product saved!",
  error: "Failed to save product",
});
```

### Custom Action Button

```javascript
toast.success("Product created!", {
  description: "Nike Air Max",
  action: {
    label: "View",
    onClick: () => navigate("/products/123"),
  },
});
```

### Dismiss Programmatically

```javascript
const toastId = toast.success("Message");
toast.dismiss(toastId); // Dismiss specific toast
toast.dismiss(); // Dismiss all toasts
```

## User Experience Benefits

1. **Non-Intrusive** - Top-right position doesn't block content
2. **Clear Feedback** - Users know exactly what happened
3. **Actionable** - Error messages tell users what to do next
4. **Professional** - Consistent, polished appearance
5. **Accessible** - Screen reader friendly
6. **Mobile-Friendly** - Responsive design

## Migration from Alerts

### Before (Using alert())

```javascript
// ❌ Old way
alert("Product created successfully");
alert("Error: Failed to save");
```

### After (Using toast)

```javascript
// ✅ New way
toast.success("Product created!", {
  description: "Nike Air Max has been added to your store",
});

toast.error("Failed to save product", {
  description: "Please check your internet connection and try again",
});
```

## Testing

### Manual Testing

1. Login/Logout - Check success toasts
2. Create/Edit/Delete products - Check all toast states
3. Upload images - Check loading → success/error flow
4. Export orders - Check success toast
5. Send emails - Check success toast

### What to Look For

- ✅ Toasts appear in top-right corner
- ✅ Success toasts are green
- ✅ Error toasts are red
- ✅ Loading toasts show spinner
- ✅ Toasts auto-dismiss after 4 seconds
- ✅ Close button works
- ✅ Multiple toasts stack nicely
- ✅ Descriptions are helpful and clear

## Troubleshooting

### Toast Not Showing

- Check if `<Toaster />` is in App.jsx
- Verify `import { toast } from 'sonner'`
- Check browser console for errors

### Toast Appears Behind Modal

- Toasts have high z-index by default
- If issue persists, adjust z-index in toastOptions

### Toast Dismissed Too Quickly

- Increase duration in Toaster config
- Or set custom duration per toast

## Summary

Toast notifications provide a modern, user-friendly way to give feedback. They're:

- More professional than `alert()`
- Less intrusive than modals
- More informative than console logs
- Better for user experience

Use them everywhere you need to communicate with users!
