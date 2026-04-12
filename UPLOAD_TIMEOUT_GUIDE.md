# Upload Timeout Handling Guide

## Issue: Cloudinary Upload Timeout

### What Causes Timeouts?

1. **Slow Internet Connection** - Upload speed too slow
2. **Large File Size** - Even if under 5MB, can be slow
3. **Server Load** - Cloudinary processing delays
4. **Network Issues** - Packet loss or connection drops

### Error Message

```
Multer error: {
  message: 'Request Timeout',
  http_code: 499,
  name: 'TimeoutError'
}
```

## Solutions Implemented

### 1. Increased Timeout (Backend)

```javascript
// cloudinary.config.js
const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  timeout: 60000, // 60 seconds (increased from default 30s)
};
```

### 2. Timeout Error Handling (Backend)

```javascript
// upload.routes.js
if (err.name === "TimeoutError" || err.message?.includes("Timeout")) {
  return res.status(408).json({
    success: false,
    message: "Upload timeout",
    error:
      "The upload took too long. Please check your internet connection and try again with a smaller image.",
  });
}
```

### 3. User-Friendly Toast (Frontend)

```javascript
// ProductsView.jsx
if (uploadError.message?.includes("timeout")) {
  toast.error("Upload timeout", {
    description:
      "The upload took too long. Please check your internet connection or try a smaller image.",
  });
}
```

### 4. Visual Feedback

- Shows file size on preview (e.g., "2.3MB")
- Tip in upload UI: "💡 Smaller images upload faster (recommended: under 2MB)"
- Loading toast: "Uploading image to cloud..."

## User Experience Flow

### When Timeout Occurs

1. User selects image
2. Clicks save
3. Toast: "Uploading image to cloud..."
4. Upload times out (> 60 seconds)
5. Toast: "Upload timeout - The upload took too long. Please check your internet connection or try a smaller image."
6. Confirm dialog: "Image upload failed. Do you want to save the product with the URL instead?"
7. User can choose to:
   - Cancel and try again with smaller image
   - Continue with URL instead

## Recommendations for Users

### Best Practices

1. **Optimize Images Before Upload**
   - Use image compression tools
   - Recommended size: Under 2MB
   - Recommended dimensions: 1000x1000px or less

2. **Check Internet Connection**
   - Ensure stable connection
   - Avoid uploading on slow networks
   - Consider using WiFi instead of mobile data

3. **Use Image Compression Tools**
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - ImageOptim (Mac)
   - RIOT (Windows)

### Alternative: Use URL Instead

If upload keeps timing out:

1. Upload image to external service (Imgur, etc.)
2. Copy image URL
3. Paste URL in "Or use URL" field
4. Save product

## Configuration

### Current Settings

- **Timeout**: 60 seconds
- **Max File Size**: 5MB
- **Retry**: Manual (user must retry)

### To Increase Timeout Further

**Backend (cloudinary.config.js)**:

```javascript
timeout: 120000; // 2 minutes
```

**Note**: Longer timeouts mean users wait longer for errors. Better to keep timeout reasonable and encourage smaller files.

## Monitoring

### Check Upload Performance

```bash
# Backend logs show:
Upload route hit
Content-Type: multipart/form-data
File filter - mimetype: image/png
File filter - originalname: photo.png
Multer processed, file: present
File uploaded successfully: https://res.cloudinary.com/...
```

### Common Issues

1. **Timeout after 30s** → Increase timeout in config
2. **Timeout immediately** → Check Cloudinary credentials
3. **Random timeouts** → Network instability
4. **Always timeout** → Cloudinary service issue

## Error Codes

| Code | Meaning               | Solution                    |
| ---- | --------------------- | --------------------------- |
| 408  | Request Timeout       | Retry with smaller image    |
| 413  | Payload Too Large     | Reduce file size            |
| 499  | Client Closed Request | Network issue, retry        |
| 500  | Server Error          | Cloudinary issue, try later |

## Testing

### Test Timeout Handling

1. **Simulate Slow Upload**:
   - Use browser DevTools
   - Network tab → Throttle to "Slow 3G"
   - Try uploading 3-4MB image
   - Should timeout and show proper message

2. **Test Large File**:
   - Select 4.5MB image
   - Should upload but may be slow
   - Watch for timeout toast

3. **Test Recovery**:
   - After timeout, try smaller image
   - Should work normally
   - Check toast messages are clear

## Future Improvements

### 1. Retry Logic

```javascript
// Auto-retry on timeout
let retries = 0;
const maxRetries = 2;

while (retries < maxRetries) {
  try {
    await uploadImage();
    break;
  } catch (error) {
    if (error.includes("timeout") && retries < maxRetries - 1) {
      retries++;
      toast.info(`Retrying upload (${retries}/${maxRetries})...`);
    } else {
      throw error;
    }
  }
}
```

### 2. Progress Bar

```javascript
// Show upload progress
const xhr = new XMLHttpRequest();
xhr.upload.addEventListener("progress", (e) => {
  const percent = (e.loaded / e.total) * 100;
  toast.loading(`Uploading... ${percent.toFixed(0)}%`);
});
```

### 3. Client-Side Compression

```javascript
// Compress before upload
if (file.size > 2 * 1024 * 1024) {
  // > 2MB
  toast.info("Compressing image...");
  const compressed = await compressImage(file);
  file = compressed;
}
```

### 4. Chunked Upload

- Split large files into chunks
- Upload chunks separately
- Combine on server
- More reliable for large files

## Summary

Timeout errors now:

- ✅ Have specific error handling
- ✅ Show user-friendly messages
- ✅ Provide actionable solutions
- ✅ Allow fallback to URL
- ✅ Include helpful tips
- ✅ Display file sizes
- ✅ Have 60-second timeout (increased)

Users know exactly what to do when uploads timeout!
