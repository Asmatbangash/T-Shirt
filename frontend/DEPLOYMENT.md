# 🚀 Threadify - Deployment Guide

## Production Build

### Build the Project

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `dist/` folder:

- **JS Bundle**: 281 KB (82 KB gzipped)
- **CSS Bundle**: 67 KB (11 KB gzipped)
- **Total**: ~93 KB gzipped

---

## 🌐 Deployment Options

### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

**Configuration**: None needed - Vite is auto-detected

### 2. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Build settings**:

- Build command: `npm run build`
- Publish directory: `dist`

### 3. GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Note**: Update `vite.config.js` with base path:

```js
export default defineConfig({
  base: "/your-repo-name/",
  // ... rest of config
});
```

### 4. AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### 5. Docker

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t threadify .
docker run -p 80:80 threadify
```

---

## ⚙️ Environment Variables

Create `.env` file for environment-specific configs:

```env
# API Configuration
VITE_API_URL=https://api.threadify.com
VITE_API_KEY=your_api_key

# Payment Gateway
VITE_STRIPE_PUBLIC_KEY=pk_live_...

# Analytics
VITE_GA_TRACKING_ID=G-...

# Feature Flags
VITE_ENABLE_CUSTOM_DESIGNER=true
```

Access in code:

```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🔧 Pre-Deployment Checklist

### Code Quality

- [ ] Run `npm run lint` - Fix all errors
- [ ] Run `npm run build` - Ensure successful build
- [ ] Test all pages in production build (`npm run preview`)
- [ ] Check console for errors
- [ ] Verify all images load

### Performance

- [ ] Optimize images (WebP format, proper sizing)
- [ ] Enable lazy loading for images
- [ ] Add meta tags for SEO
- [ ] Configure caching headers
- [ ] Enable compression (gzip/brotli)

### SEO

- [ ] Add meta descriptions
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Configure canonical URLs

### Security

- [ ] Use HTTPS
- [ ] Add security headers
- [ ] Sanitize user inputs
- [ ] Implement CSRF protection
- [ ] Add rate limiting

### Analytics

- [ ] Add Google Analytics
- [ ] Add conversion tracking
- [ ] Add error tracking (Sentry)
- [ ] Add performance monitoring

---

## 🌍 CDN Configuration

### Cloudflare

1. Add your domain to Cloudflare
2. Enable Auto Minify (JS, CSS, HTML)
3. Enable Brotli compression
4. Set cache rules for static assets
5. Enable Always Online

### Caching Strategy

```
HTML: no-cache (always fresh)
CSS/JS: max-age=31536000 (1 year, with hash in filename)
Images: max-age=2592000 (30 days)
Fonts: max-age=31536000 (1 year)
```

---

## 📊 Performance Optimization

### Image Optimization

```bash
# Install image optimization tools
npm install -D vite-plugin-image-optimizer

# Add to vite.config.js
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer()
  ]
})
```

### Code Splitting

Already configured with Vite - each page can be lazy loaded:

```jsx
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePage />
    </Suspense>
  );
}
```

### Bundle Analysis

```bash
# Install analyzer
npm install -D rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer()
  ]
})

# Build and view
npm run build
# Opens stats.html in browser
```

---

## 🔒 Security Headers

Add to your hosting platform:

```
# Vercel (vercel.json)
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}

# Netlify (_headers file)
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📈 Monitoring

### Error Tracking

```bash
npm install @sentry/react
```

```jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

### Analytics

```jsx
// Google Analytics
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🧪 Testing Before Deploy

### Manual Testing

1. Test all pages in demo mode
2. Test responsive design (mobile, tablet, desktop)
3. Test dark mode toggle
4. Test all interactive elements
5. Test form submissions
6. Check browser console for errors

### Automated Testing (Optional)

```bash
# Install testing libraries
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

---

## 🌟 Post-Deployment

### Monitor

- Check error rates
- Monitor page load times
- Track user behavior
- Review analytics

### Optimize

- Analyze bundle size
- Optimize images
- Add caching
- Enable CDN

### Iterate

- Gather user feedback
- A/B test features
- Add new features
- Improve performance

---

## 📞 Deployment Support

### Common Issues

**Build Fails**

- Check Node version (18+)
- Clear node_modules and reinstall
- Check for TypeScript errors

**Images Not Loading**

- Verify image paths
- Check public folder structure
- Ensure images are in dist after build

**Styles Not Applied**

- Check CSS import in main.jsx
- Verify Tailwind config
- Clear browser cache

**404 on Refresh**

- Configure SPA fallback on hosting
- Add `_redirects` (Netlify) or `vercel.json` (Vercel)

---

## 🎯 Quick Deploy Commands

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir=dist

# GitHub Pages
npm run build && gh-pages -d dist

# Custom Server
npm run build
scp -r dist/* user@server:/var/www/html/
```

---

**Ready to deploy!** Choose your platform and follow the steps above. 🚀
