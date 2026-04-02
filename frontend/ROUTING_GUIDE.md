# 🧭 Threadify - Routing Guide

## ✅ React Router Setup Complete

React Router DOM is now fully integrated with proper navigation throughout the app.

---

## 🗺️ Available Routes

| Route          | Component          | Description                         |
| -------------- | ------------------ | ----------------------------------- |
| `/`            | HomePage           | Landing page with hero and features |
| `/shop`        | ShopPage           | Product listing with filters        |
| `/product/:id` | ProductDetailPage  | Single product details              |
| `/custom`      | CustomDesignerPage | T-shirt customization tool          |
| `/cart`        | CartPage           | Shopping cart                       |
| `/checkout`    | CheckoutPage       | Checkout flow                       |
| `/login`       | AuthPage           | Login/register                      |
| `/admin`       | AdminDashboard     | Admin panel                         |

---

## 🔗 Navigation Components Updated

### Navbar

All navigation links now use React Router:

- Logo → `/` (Home)
- Shop → `/shop`
- Customize → `/custom`
- Collections → `/shop`
- User icon → `/login`
- Cart icon → `/cart`

### Footer

All footer links updated:

- All Products → `/shop`
- Custom Design → `/custom`
- Support links → `/`

### Hero Section

CTA buttons now navigate:

- "Shop Now" → `/shop`
- "Customize Your Tee" → `/custom`

### Product Cards

All product cards link to:

- `/product/:id` (dynamic route)

### Categories

Category cards link to:

- Oversized/Minimal → `/shop`
- Custom → `/custom`

---

## 💻 Usage Examples

### Link to Pages

```jsx
import { Link } from 'react-router-dom'

// Simple link
<Link to="/shop">Shop Now</Link>

// Link with button
<Link to="/cart">
  <Button>View Cart</Button>
</Link>

// Dynamic route
<Link to={`/product/${productId}`}>
  View Product
</Link>
```

### Programmatic Navigation

```jsx
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/shop");
  };

  return <button onClick={handleClick}>Go to Shop</button>;
}
```

### Get Route Parameters

```jsx
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams();

  // Use id to fetch product data
  console.log("Product ID:", id);
}
```

### Get Current Location

```jsx
import { useLocation } from "react-router-dom";

function MyComponent() {
  const location = useLocation();

  console.log("Current path:", location.pathname);
}
```

---

## 🎯 How It Works

### App.jsx Structure

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        {/* ... more routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

### Navigation Flow

1. User clicks a link (e.g., "Shop Now")
2. React Router intercepts the click
3. Updates the URL without page reload
4. Renders the corresponding component
5. Smooth transition (no flash)

---

## 🚀 Advanced Routing

### Nested Routes

```jsx
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="products" element={<ProductsPage />} />
  <Route path="orders" element={<OrdersPage />} />
</Route>
```

### Protected Routes

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

// Usage
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>;
```

### 404 Page

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  {/* ... other routes */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

### Redirect

```jsx
import { Navigate } from "react-router-dom";

<Route path="/old-path" element={<Navigate to="/new-path" replace />} />;
```

---

## 🎨 Active Link Styling

### Using NavLink

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/shop"
  className={({ isActive }) =>
    isActive ? "text-foreground font-semibold" : "text-foreground/80"
  }
>
  Shop
</NavLink>;
```

### Custom Active State

```jsx
import { useLocation } from "react-router-dom";

function NavItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={isActive ? "text-primary" : "text-foreground/80"}>
      {children}
    </Link>
  );
}
```

---

## 🔧 Configuration

### Base URL (for subdirectory deployment)

```jsx
// vite.config.js
export default defineConfig({
  base: '/my-app/', // if deployed to example.com/my-app/
})

// App.jsx
<BrowserRouter basename="/my-app">
  <Routes>...</Routes>
</BrowserRouter>
```

### Scroll to Top on Route Change

```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Add to App.jsx
<BrowserRouter>
  <ScrollToTop />
  <Routes>...</Routes>
</BrowserRouter>;
```

---

## 📱 Testing Routes

### Development

```bash
npm run dev
```

Then navigate to:

- `http://localhost:5173/` - Home
- `http://localhost:5173/shop` - Shop
- `http://localhost:5173/product/1` - Product Detail
- `http://localhost:5173/custom` - Designer
- `http://localhost:5173/cart` - Cart
- `http://localhost:5173/checkout` - Checkout
- `http://localhost:5173/login` - Auth
- `http://localhost:5173/admin` - Admin

---

## 🎯 Benefits

✅ **No Page Reloads** - Instant navigation
✅ **Browser History** - Back/forward buttons work
✅ **Deep Linking** - Share specific pages
✅ **SEO Friendly** - Each route has unique URL
✅ **Dynamic Routes** - Product IDs in URL
✅ **Clean URLs** - No hash (#) in URLs

---

## 🚀 Next Steps

### Add Loading States

```jsx
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

<Suspense fallback={<Skeleton className="h-screen" />}>
  <Routes>...</Routes>
</Suspense>;
```

### Add Page Transitions

```bash
npm install framer-motion
```

```jsx
import { motion } from "framer-motion";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
```

---

**Status**: ✅ React Router fully integrated and working!

All navigation now uses proper routing with no page reloads. 🎉
