# Threadify - Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎯 Viewing Different Pages

The app is currently set to show **AllPagesDemo** which includes a page switcher at the bottom of the screen.

### Page Switcher

Click any button in the bottom panel to switch between pages:

- Home Page
- Shop / Product Listing
- Product Detail
- Custom Designer
- Shopping Cart
- Checkout
- Login / Register
- Admin Dashboard

### Manual Page Selection

To view a specific page directly, edit `src/App.jsx`:

```jsx
// Example: Show only Home Page
import HomePage from "@/pages/HomePage";

function App() {
  return <HomePage />;
}

export default App;
```

Available page imports:

```jsx
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CustomDesignerPage from "@/pages/CustomDesignerPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import AuthPage from "@/pages/AuthPage";
import AdminDashboard from "@/pages/AdminDashboard";
```

## 🎨 Customization

### Change Brand Colors

Edit `src/index.css` and modify the CSS variables:

```css
:root {
  --primary: oklch(0.488 0.243 264.376); /* Electric Blue */
  --radius: 0.75rem; /* Border radius */
}
```

### Modify Components

All components are in `src/components/`:

- `Layout/` - Navbar, Footer
- `Home/` - Hero, Featured Products, Categories, Testimonials
- `Shop/` - Product Card, Filters
- `ui/` - Reusable UI components (Button, Card, Input, etc.)

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout/          # Navbar, Footer
│   │   ├── Home/            # Home page sections
│   │   ├── Shop/            # Shop components
│   │   └── ui/              # shadcn/ui components
│   ├── pages/               # All page components
│   ├── lib/                 # Utilities
│   ├── App.jsx              # Main app
│   └── index.css            # Global styles + theme
├── public/                  # Static assets
└── package.json
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **Lucide React** - Icons
- **Geist Font** - Typography

## 🎨 Design Features

✅ Dark mode support (toggle with system preference)
✅ Fully responsive (mobile-first)
✅ Smooth animations and transitions
✅ Hover effects on interactive elements
✅ Accessible components (ARIA, keyboard nav)
✅ Premium aesthetic (Nike/Apple inspired)
✅ Modern e-commerce patterns

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

## 🎯 Key Components

### Reusable UI Components

- `Button` - Multiple variants and sizes
- `Card` - Container with shadow
- `Input` - Form input with validation
- `Badge` - Labels and tags
- `Select` - Dropdown selector
- `Tabs` - Tabbed interface
- `Skeleton` - Loading states

### Layout Components

- `Navbar` - Sticky navigation with cart
- `Footer` - Links and newsletter

### Feature Components

- `ProductCard` - Product display with hover effects
- `Filters` - Sidebar filtering system
- `Hero` - Landing page hero section
- `Categories` - Category cards
- `Testimonials` - Customer reviews

## 🔄 Next Steps

### Add Routing

```bash
npm install react-router-dom
```

Then wrap your app with BrowserRouter and add routes.

### Add State Management

```bash
npm install zustand
# or
npm install @reduxjs/toolkit react-redux
```

### Connect to Backend

Update API endpoints in components to connect to your backend.

### Add Real Images

Replace `/api/placeholder/` URLs with actual product images.

## 💡 Tips

1. **Dark Mode**: Add a theme toggle button in the Navbar
2. **Animations**: All transitions are GPU-accelerated for smooth performance
3. **Icons**: Import any icon from `lucide-react`
4. **Customization**: All colors are CSS variables - easy to theme
5. **Components**: All shadcn/ui components are customizable

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Clear Cache

```bash
rm -rf node_modules package-lock.json
npm install
```

---

Enjoy building with Threadify! 🎉
