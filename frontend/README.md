# Threadify - Premium Custom T-Shirt E-Commerce

A modern, production-ready e-commerce platform for custom T-shirt design and sales.

## 🎨 Design System

### Color Palette

- **Primary**: Electric Blue (`oklch(0.488 0.243 264.376)`)
- **Background**: White/Black (light/dark mode)
- **Accent**: Electric Blue for CTAs and highlights
- **Neutral**: Gray scale for text and borders

### Typography

- **Font**: Geist Variable (sans-serif)
- **Headings**: Bold, tight tracking
- **Body**: Regular weight, relaxed line height

### Components

Built with shadcn/ui and Radix primitives for accessibility and consistency.

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx          # Sticky navigation with cart
│   │   └── Footer.jsx          # Footer with links and newsletter
│   ├── Home/
│   │   ├── Hero.jsx            # Hero section with CTA
│   │   ├── PromoBanner.jsx     # Top promotional banner
│   │   ├── FeaturedProducts.jsx # Product grid
│   │   ├── Categories.jsx      # Category cards
│   │   └── Testimonials.jsx    # Customer reviews
│   ├── Shop/
│   │   ├── ProductCard.jsx     # Reusable product card
│   │   └── Filters.jsx         # Sidebar filters
│   └── ui/                     # shadcn/ui components
├── pages/
│   ├── HomePage.jsx            # Landing page
│   ├── ShopPage.jsx            # Product listing
│   ├── ProductDetailPage.jsx  # Product details
│   ├── CustomDesignerPage.jsx # T-shirt customizer
│   ├── CartPage.jsx            # Shopping cart
│   ├── CheckoutPage.jsx        # Checkout flow
│   ├── AuthPage.jsx            # Login/Register
│   └── AdminDashboard.jsx      # Admin panel
└── App.jsx                     # Main app component
```

## 🚀 Features

### Customer Features

- **Home Page**: Hero section, featured products, categories, testimonials
- **Shop**: Product grid with filters (size, color, price), sorting
- **Product Details**: Image gallery, size/color selection, reviews
- **Custom Designer**: Live T-shirt preview with text and image customization
- **Cart**: Item management with quantity controls
- **Checkout**: Multi-step form with payment options
- **Auth**: Login/register with social options

### Admin Features

- **Dashboard**: Sales analytics and stats
- **Product Management**: Add/edit products
- **Order Management**: Track and update orders
- **Customer Management**: View customer data

## 🎯 Key Design Features

- **Mobile-First**: Fully responsive across all devices
- **Dark Mode**: Complete dark mode support
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Built with Radix primitives
- **Performance**: Optimized images and lazy loading
- **Modern UI**: Clean, minimal, premium aesthetic

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Fonts**: Geist Variable

## 📦 Installation

```bash
npm install
npm run dev
```

## 🎨 Usage

To view different pages, update `src/App.jsx`:

```jsx
// Home Page (default)
import HomePage from "@/pages/HomePage";
function App() {
  return <HomePage />;
}

// Shop Page
import ShopPage from "@/pages/ShopPage";
function App() {
  return <ShopPage />;
}

// Product Detail
import ProductDetailPage from "@/pages/ProductDetailPage";
function App() {
  return <ProductDetailPage />;
}

// Custom Designer
import CustomDesignerPage from "@/pages/CustomDesignerPage";
function App() {
  return <CustomDesignerPage />;
}

// Cart
import CartPage from "@/pages/CartPage";
function App() {
  return <CartPage />;
}

// Checkout
import CheckoutPage from "@/pages/CheckoutPage";
function App() {
  return <CheckoutPage />;
}

// Auth
import AuthPage from "@/pages/AuthPage";
function App() {
  return <AuthPage />;
}

// Admin Dashboard
import AdminDashboard from "@/pages/AdminDashboard";
function App() {
  return <AdminDashboard />;
}
```

## 🎨 Customization

### Colors

Edit `src/index.css` to customize the color scheme:

- Primary color (electric blue)
- Background colors
- Border and accent colors

### Components

All components are in `src/components/` and can be customized individually.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ✨ Next Steps

1. Add React Router for navigation
2. Connect to backend API
3. Implement state management (Zustand/Redux)
4. Add image upload functionality
5. Integrate payment gateway (Stripe)
6. Add real-time preview in designer
7. Implement user authentication
8. Add product search functionality

---

Built with ❤️ using React, Tailwind CSS, and shadcn/ui
