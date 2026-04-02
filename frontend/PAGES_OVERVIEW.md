# Threadify - Pages Overview

## 🏠 Home Page

**Route**: `/`

### Sections

1. **Promo Banner** - Top banner with promotional message
2. **Navigation** - Sticky navbar with cart counter
3. **Hero Section**
   - Full-width with gradient background
   - Animated badge "New Collection Available"
   - Large headline: "Design Your Own Style 👕"
   - Two CTAs: "Shop Now" and "Customize Your Tee"
   - Stats row: 50K+ customers, 100% cotton, 4.9★ rating
4. **Featured Products** - 4-column grid with hover effects
5. **Categories** - 3 cards: Oversized, Minimal, Custom
6. **Testimonials** - Customer reviews with ratings
7. **Footer** - Links, newsletter signup, social media

### Key Features

- Animated elements (ping effect on badge)
- Gradient text on headline
- Hover effects on product cards
- Responsive grid layouts

---

## 🛍️ Shop / Product Listing Page

**Route**: `/shop`

### Layout

- **Header**: Title, product count, sort dropdown
- **Sidebar** (Desktop): Filters panel
- **Mobile**: Filter button opens overlay
- **Grid**: 1-4 columns responsive

### Filters

- **Size**: XS, S, M, L, XL, XXL (button grid)
- **Color**: Visual color swatches
- **Price Range**: Slider with min/max
- **Active Filters**: Removable badges
- **Sort Options**: Newest, Price, Popular

### Product Cards

- 4:5 aspect ratio image
- Hover effects: scale image, show actions
- Quick actions: Add to cart, wishlist, quick view
- Color dots indicator
- Tag badges (Bestseller, New, Limited)

---

## 📦 Product Detail Page

**Route**: `/product/:id`

### Layout (Two Column)

#### Left: Image Gallery

- Large main image (4:5 aspect)
- 4 thumbnail images below
- Click to switch main image
- Rounded corners, smooth transitions

#### Right: Product Info

- Badge: "In Stock"
- Product name (large, bold)
- Star rating + review count
- Price (large, bold)
- Description paragraph
- **Color Selector**: Large circular swatches with ring on selection
- **Size Selector**: Grid of size buttons
- **Quantity Stepper**: -/+ buttons
- **Add to Cart**: Primary CTA with icon
- **Wishlist**: Heart icon button
- **Features**: Icons for shipping, guarantee, returns

### Additional Sections

- **Reviews**: Customer reviews with avatars and ratings
- **Related Products**: 4-column carousel

---

## 🎨 Custom T-Shirt Designer

**Route**: `/custom`

### Split Layout

#### Left: Live Preview (Sticky)

- Square canvas showing T-shirt
- Real-time text preview
- Color changes instantly
- Add to cart with custom price
- Download design option

#### Right: Customization Panel

**T-Shirt Color Card**

- 6 color swatches
- Selected state with ring effect

**Add Text Card**

- Text input field
- Font dropdown (6 fonts)
- Font size slider (16-72px)
- Text color picker (color input + hex field)

**Upload Image Card**

- Drag & drop zone
- File format info
- Upload button

### Features

- Live preview updates
- Color picker integration
- Font customization
- Real-time rendering

---

## 🛒 Shopping Cart Page

**Route**: `/cart`

### Layout (Two Column)

#### Left: Cart Items

- Item cards with:
  - Product image (thumbnail)
  - Name, size, color
  - Quantity stepper
  - Remove button
  - Line total

#### Right: Order Summary (Sticky)

- Subtotal
- Shipping cost
- Total (large, bold)
- Discount code input
- "Proceed to Checkout" CTA

### Features

- Quantity controls
- Remove items
- Apply discount codes
- Responsive layout

---

## 💳 Checkout Page

**Route**: `/checkout`

### Layout (Two Column)

#### Left: Forms (2/3 width)

**Contact Information Card**

- First name, last name
- Email, phone

**Shipping Address Card**

- Address, city, state
- ZIP code, country

**Payment Method Card**

- Payment type selector (Card / COD)
- Card number, expiry, CVV
- Secure payment badge

#### Right: Order Summary (1/3 width, Sticky)

- Item thumbnails with details
- Subtotal, shipping, tax
- Total (large)
- "Place Order" CTA with lock icon
- Secure checkout badge

---

## 🔐 Authentication Page

**Route**: `/login` or `/register`

### Layout (Centered Card)

- Logo and welcome message
- Toggle between Login/Register
- Social login buttons (Google, Facebook)
- Divider: "Or continue with"
- Form fields with icons:
  - Name (register only)
  - Email
  - Password
- Remember me checkbox (login)
- Forgot password link (login)
- Primary CTA button
- Switch mode link

### Features

- Centered card with shadow
- Icon-prefixed inputs
- Social authentication
- Form validation states
- Smooth toggle between modes

---

## 👨‍💼 Admin Dashboard

**Route**: `/admin`

### Layout

#### Sidebar (Fixed)

- Brand logo
- Navigation menu:
  - Dashboard (active)
  - Products
  - Orders
  - Customers
- Active state highlighting

#### Main Content

- **Header**: Title, "Add Product" button
- **Stats Grid** (4 cards):
  - Total Sales ($12,426)
  - Orders (342)
  - Products (48)
  - Customers (1,249)
  - Each with trend indicator
- **Recent Orders Table**:
  - Order ID, customer, product
  - Amount, status badge
  - Actions menu
  - Search functionality

### Features

- Sidebar navigation
- Analytics cards with trends
- Data table with search
- Status badges
- Action menus

---

## 🎯 Design Patterns Used

### Navigation

- Sticky navbar with backdrop blur
- Cart counter badge
- Mobile hamburger menu
- Smooth transitions

### Cards

- Consistent padding (p-6)
- Rounded corners (rounded-xl)
- Shadow elevation (shadow-lg)
- Hover effects (shadow-2xl)

### Forms

- Icon-prefixed inputs
- Clear labels
- Validation states
- Grouped related fields

### Buttons

- Primary: Solid with icon
- Secondary: Outline
- Ghost: Transparent
- Icon-only: Square with icon
- Rounded-full for CTAs

### Images

- Consistent aspect ratios
- Hover scale effects
- Lazy loading ready
- Placeholder support

### Loading States

- Skeleton components
- Smooth fade-in
- Progressive loading

---

## 🚀 Performance Optimizations

- Lazy load images
- Sticky positioning for summaries
- Optimized hover effects (GPU-accelerated)
- Minimal re-renders
- Efficient grid layouts

## ♿ Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- Screen reader support
- Color contrast compliance

---

## 📱 Mobile Optimizations

- Touch-friendly targets (min 44px)
- Swipeable galleries
- Bottom sheet filters
- Sticky CTAs
- Optimized font sizes
- Reduced motion support

---

Built with modern web standards and best practices for a premium e-commerce experience.
