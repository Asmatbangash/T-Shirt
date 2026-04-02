# Threadify - Project Structure

## 📁 Complete File Tree

```
frontend/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── vite.config.js            # Vite configuration
│   ├── tsconfig.json             # TypeScript config
│   ├── eslint.config.js          # ESLint rules
│   └── components.json           # shadcn/ui config
│
├── 📚 Documentation (8 files)
│   ├── README.md                 # Main documentation
│   ├── QUICK_START.md            # Getting started
│   ├── MASTER_GUIDE.md           # Complete overview
│   ├── PROJECT_SUMMARY.md        # Implementation summary
│   ├── DESIGN_GUIDE.md           # Design system
│   ├── VISUAL_DESIGN_SPECS.md    # Visual specifications
│   ├── PAGES_OVERVIEW.md         # Page descriptions
│   ├── COMPONENT_INDEX.md        # Component inventory
│   └── PROJECT_STRUCTURE.md      # This file
│
├── 🎨 Source Code (src/)
│   │
│   ├── 📄 App.jsx                # Main app component
│   ├── 📄 main.jsx               # Entry point
│   ├── 🎨 index.css              # Global styles + theme
│   │
│   ├── 📂 pages/ (8 pages)
│   │   ├── HomePage.jsx          # Landing page
│   │   ├── ShopPage.jsx          # Product listing
│   │   ├── ProductDetailPage.jsx # Product details
│   │   ├── CustomDesignerPage.jsx # T-shirt customizer
│   │   ├── CartPage.jsx          # Shopping cart
│   │   ├── CheckoutPage.jsx      # Checkout flow
│   │   ├── AuthPage.jsx          # Login/Register
│   │   ├── AdminDashboard.jsx    # Admin panel
│   │   └── AllPagesDemo.jsx      # Page switcher demo
│   │
│   ├── 📂 components/
│   │   │
│   │   ├── 📂 Layout/
│   │   │   ├── Navbar.jsx        # Sticky navigation
│   │   │   └── Footer.jsx        # Footer with links
│   │   │
│   │   ├── 📂 Home/
│   │   │   ├── Hero.jsx          # Hero section
│   │   │   ├── PromoBanner.jsx   # Top banner
│   │   │   ├── FeaturedProducts.jsx # Product grid
│   │   │   ├── Categories.jsx    # Category cards
│   │   │   └── Testimonials.jsx  # Reviews
│   │   │
│   │   ├── 📂 Shop/
│   │   │   ├── ProductCard.jsx   # Product card
│   │   │   ├── Filters.jsx       # Filter sidebar
│   │   │   └── ProductCardSkeleton.jsx # Loading state
│   │   │
│   │   ├── 📂 Showcase/
│   │   │   └── ComponentShowcase.jsx # Component demo
│   │   │
│   │   └── 📂 ui/ (shadcn/ui components)
│   │       ├── button.tsx        # Button component
│   │       ├── card.tsx          # Card component
│   │       ├── input.tsx         # Input component
│   │       ├── badge.tsx         # Badge component
│   │       ├── select.tsx        # Select dropdown
│   │       ├── tabs.tsx          # Tabs component
│   │       ├── dialog.tsx        # Modal dialog
│   │       └── skeleton.tsx      # Loading skeleton
│   │
│   ├── 📂 lib/
│   │   └── utils.ts              # Utility functions
│   │
│   └── 📂 assets/
│       ├── hero.png              # Hero image
│       ├── react.svg             # React logo
│       └── vite.svg              # Vite logo
│
├── 📂 public/
│   ├── favicon.svg               # Site favicon
│   └── icons.svg                 # Icon sprite
│
└── 📂 dist/                      # Build output (generated)
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js       # 281 KB (82 KB gzipped)
    │   └── index-[hash].css      # 67 KB (11 KB gzipped)
    └── fonts/                    # Geist Variable fonts
```

---

## 🎯 Component Hierarchy

### Page Structure

```
Page Component
├── Navbar (Layout)
├── Main Content
│   ├── Section 1
│   │   ├── Card
│   │   │   ├── CardHeader
│   │   │   └── CardContent
│   │   └── Button
│   └── Section 2
└── Footer (Layout)
```

### Example: Home Page

```
HomePage
├── PromoBanner
├── Navbar
├── Hero
│   ├── Badge (animated)
│   ├── Heading (gradient)
│   ├── Buttons (2 CTAs)
│   └── Stats (3 columns)
├── FeaturedProducts
│   └── ProductCard × 4
├── Categories
│   └── Card × 3
├── Testimonials
│   └── Card × 3
└── Footer
```

### Example: Shop Page

```
ShopPage
├── Navbar
├── Header (title + sort)
├── Main (flex layout)
│   ├── Filters (sidebar)
│   │   ├── Size Card
│   │   ├── Color Card
│   │   └── Price Card
│   └── Product Grid
│       └── ProductCard × N
└── Footer
```

---

## 🎨 Design Token Reference

### Colors (CSS Variables)

```css
--primary: Electric Blue --background: White/Black --foreground: Black/White
  --card: White/Dark Gray --muted: Light Gray/Dark Gray --border: Light
  Gray/Dark Border --ring: Focus ring color;
```

### Spacing (Tailwind Classes)

```
p-4  = 16px padding
p-6  = 24px padding
gap-6 = 24px gap
space-y-8 = 32px vertical spacing
```

### Typography (Tailwind Classes)

```
text-sm = 14px
text-base = 16px
text-lg = 18px
text-xl = 20px
text-2xl = 24px
text-3xl = 30px
text-4xl = 36px
```

---

## 🚀 Build Commands

```bash
# Development
npm run dev          # Start dev server (port 5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

---

## 📦 Dependencies

### Core

- react: ^19.2.4
- react-dom: ^19.2.4
- vite: ^8.0.1

### Styling

- tailwindcss: ^4.2.2
- @tailwindcss/vite: ^4.2.2

### UI Components

- @radix-ui/react-select
- @radix-ui/react-tabs
- @radix-ui/react-dialog
- lucide-react: ^1.7.0

### Utilities

- class-variance-authority: ^0.7.1
- clsx: ^2.1.1
- tailwind-merge: ^3.5.0

### Fonts

- @fontsource-variable/geist: ^5.2.8

---

## 🎯 Component Reusability

### Highly Reusable (Use Anywhere)

- Button, Card, Input, Badge
- Select, Tabs, Dialog, Skeleton

### Feature-Specific (Reusable in Context)

- ProductCard (shop, home, related products)
- Filters (shop, search results)
- Navbar, Footer (all pages)

### Page-Specific (Single Use)

- Hero (home page)
- CustomDesigner controls
- Admin sidebar

---

## 📊 File Statistics

```
Total Files: 30 JSX/TSX files
Total Lines: ~2,500+ lines
Components: 26 components
Pages: 8 complete pages
Documentation: 8 markdown files
```

---

## 🎨 Visual Component Map

```
┌─────────────────────────────────────────┐
│           THREADIFY UI SYSTEM           │
├─────────────────────────────────────────┤
│                                         │
│  PAGES (8)                              │
│  ├─ Home                                │
│  ├─ Shop                                │
│  ├─ Product Detail                      │
│  ├─ Custom Designer                     │
│  ├─ Cart                                │
│  ├─ Checkout                            │
│  ├─ Auth                                │
│  └─ Admin                               │
│                                         │
│  LAYOUT (2)                             │
│  ├─ Navbar                              │
│  └─ Footer                              │
│                                         │
│  FEATURES (8)                           │
│  ├─ Hero                                │
│  ├─ PromoBanner                         │
│  ├─ FeaturedProducts                    │
│  ├─ Categories                          │
│  ├─ Testimonials                        │
│  ├─ ProductCard                         │
│  ├─ Filters                             │
│  └─ ProductCardSkeleton                 │
│                                         │
│  UI PRIMITIVES (10)                     │
│  ├─ Button                              │
│  ├─ Card                                │
│  ├─ Input                               │
│  ├─ Badge                               │
│  ├─ Select                              │
│  ├─ Tabs                                │
│  ├─ Dialog                              │
│  ├─ Skeleton                            │
│  └─ Utils                               │
│                                         │
└─────────────────────────────────────────┘
```

---

This structure provides a scalable, maintainable foundation for a production e-commerce application.
