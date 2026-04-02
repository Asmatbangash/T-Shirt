# Threadify - Visual Design Specifications

## 🎨 Complete Design System

### Color Palette

#### Light Mode

```css
Background: #FFFFFF (Pure White)
Foreground: #1A1A1A (Near Black)
Primary: Electric Blue - oklch(0.488 0.243 264.376)
Secondary: #F5F5F5 (Light Gray)
Muted: #F5F5F5
Border: #E5E5E5
```

#### Dark Mode

```css
Background: #1A1A1A (Near Black)
Foreground: #FAFAFA (Off White)
Primary: Electric Blue - oklch(0.488 0.243 264.376)
Card: #262626
Border: rgba(255,255,255,0.1)
```

### Typography

#### Font Family

- **Primary**: Geist Variable (sans-serif)
- **Fallback**: system-ui, -apple-system, sans-serif

#### Font Sizes

```
Hero Headline: 56px - 80px (3.5rem - 5rem)
Page Title: 40px - 48px (2.5rem - 3rem)
Section Title: 32px - 40px (2rem - 2.5rem)
Card Title: 24px - 32px (1.5rem - 2rem)
Body Large: 18px - 20px (1.125rem - 1.25rem)
Body: 16px (1rem)
Small: 14px (0.875rem)
Tiny: 12px (0.75rem)
```

#### Font Weights

- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Spacing Scale

```
xs: 4px
sm: 8px
md: 12px
base: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 96px
5xl: 128px
```

### Border Radius

```
sm: 8px (0.5rem)
md: 12px (0.75rem)
lg: 16px (1rem)
xl: 24px (1.5rem)
2xl: 32px (2rem)
full: 9999px (pill shape)
```

### Shadows

```
sm: 0 1px 2px rgba(0,0,0,0.05)
md: 0 4px 6px rgba(0,0,0,0.07)
lg: 0 10px 15px rgba(0,0,0,0.1)
xl: 0 20px 25px rgba(0,0,0,0.15)
2xl: 0 25px 50px rgba(0,0,0,0.25)
```

## 🧩 Component Specifications

### Buttons

#### Variants

1. **Primary (Default)**
   - Background: Electric Blue
   - Text: White
   - Hover: Darker blue
   - Shadow: md → lg on hover

2. **Secondary**
   - Background: Light gray
   - Text: Dark
   - Hover: Slightly darker

3. **Outline**
   - Border: 1px solid border color
   - Background: Transparent
   - Hover: Light background

4. **Ghost**
   - Background: Transparent
   - Hover: Light background

#### Sizes

- Small: h-9 (36px), px-3, text-sm
- Default: h-10 (40px), px-4, text-sm
- Large: h-12 (48px), px-8, text-base

#### States

- Hover: Scale 102%, shadow increase
- Focus: Ring with 2px offset
- Active: Scale 98%
- Disabled: 50% opacity, no pointer events

### Cards

#### Structure

```jsx
<Card>           // Container with border, shadow, rounded corners
  <CardHeader>   // Padding: p-6, space-y-1.5
    <CardTitle>  // Font: semibold, tracking-tight
  </CardHeader>
  <CardContent>  // Padding: p-6 pt-0
  </CardContent>
</Card>
```

#### Variants

- Default: White bg, subtle border, shadow-sm
- Hover: shadow-lg → shadow-2xl
- Interactive: Cursor pointer, scale on hover

### Product Cards

#### Layout

```
┌─────────────────┐
│                 │
│     Image       │ 4:5 aspect ratio
│   (hover zoom)  │
│                 │
├─────────────────┤
│ Product Name    │ p-4
│ $29.99    ●●●   │ Price + color dots
└─────────────────┘
```

#### Hover Effects

- Image: scale(1.1) over 500ms
- Shadow: lg → 2xl
- Quick actions appear (opacity 0 → 1)
- Add to cart button slides up

### Forms

#### Input Fields

- Height: 40px (h-10)
- Padding: px-3 py-2
- Border: 1px solid input color
- Rounded: lg (12px)
- Focus: 2px ring with offset

#### Labels

- Font size: 14px (text-sm)
- Weight: 500 (font-medium)
- Margin bottom: 8px (mb-2)

#### Validation States

- Error: Red border, red text below
- Success: Green border, checkmark
- Disabled: 50% opacity, no interaction

### Navigation

#### Desktop Navbar

```
┌────────────────────────────────────────────┐
│ Logo    Shop  Custom  Collections  About  │ h-16
│                              🔍 👤 🛒(3)   │
└────────────────────────────────────────────┘
```

#### Mobile Navbar

```
┌────────────────────────────────┐
│ Logo                  👤 🛒 ☰  │ h-16
└────────────────────────────────┘
```

- Sticky: top-0
- Backdrop blur: backdrop-blur
- Border bottom: 1px
- Background: 95% opacity

## 📐 Layout Patterns

### Container

```jsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  // Max width: 1280px // Responsive padding
</div>
```

### Section Spacing

```jsx
// Large sections (home page)
<section className="py-20">

// Medium sections
<section className="py-12">

// Small sections
<section className="py-8">
```

### Grid Layouts

#### Product Grid

```jsx
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3-4 columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

#### Two Column Layout

```jsx
// Mobile: Stack
// Desktop: Side by side
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

## 🎭 Animation Specifications

### Transitions

```css
/* Standard */
transition: all 300ms ease-in-out

/* Images */
transition: transform 500ms ease-in-out

/* Shadows */
transition: box-shadow 300ms ease-in-out
```

### Hover Effects

#### Product Cards

```css
Image: transform: scale(1.1)
Card: box-shadow: 0 25px 50px rgba(0,0,0,0.25)
Buttons: opacity: 0 → 1
```

#### Buttons

```css
Background: Darken 5%
Transform: scale(1.02)
Shadow: Increase elevation
```

#### Links

```css
Color: muted-foreground → foreground
Underline: On hover
```

### Loading States

- Skeleton: Pulse animation
- Spinners: Rotate 360deg infinite
- Progress: Indeterminate animation

## 📱 Responsive Design

### Breakpoints

```
sm: 640px   (Mobile landscape)
md: 768px   (Tablet)
lg: 1024px  (Desktop)
xl: 1280px  (Large desktop)
2xl: 1536px (Extra large)
```

### Mobile Optimizations

- Touch targets: Minimum 44px × 44px
- Font sizes: Slightly smaller on mobile
- Padding: Reduced on mobile (px-4 vs px-8)
- Grids: 1-2 columns max
- Navigation: Hamburger menu
- Filters: Bottom sheet or overlay

### Desktop Enhancements

- Hover effects enabled
- Larger images
- Multi-column layouts
- Sidebar navigation
- Sticky elements

## 🎯 Page-Specific Designs

### Home Page Hero

```
Height: calc(100vh - 4rem)
Background: Gradient + grid pattern
Content: Centered, max-width 1024px
Badge: Animated ping effect
Headline: 56px - 80px, gradient text
CTAs: Large buttons, rounded-full
Stats: 3 columns, centered
```

### Product Grid

```
Columns: 1 (mobile) → 2 (tablet) → 4 (desktop)
Gap: 24px (gap-6)
Card aspect: 4:5 portrait
Hover: Scale image, show actions
```

### Custom Designer

```
Layout: Split 50/50 on desktop
Left: Square preview (sticky)
Right: Customization panels (scrollable)
Preview: Real-time updates
Controls: Cards with clear sections
```

### Checkout

```
Layout: 2/3 form, 1/3 summary
Form: Stacked cards
Summary: Sticky on scroll
Mobile: Stack vertically
```

### Admin Dashboard

```
Sidebar: 256px fixed width
Main: Flex-1 with padding
Stats: 4 columns, icon + value + trend
Table: Striped rows, hover highlight
```

## ✨ Micro-interactions

### Product Cards

1. Hover → Image scales to 110%
2. Hover → Shadow increases
3. Hover → Quick actions fade in
4. Click → Navigate to detail page

### Buttons

1. Hover → Background darkens
2. Hover → Scale 102%
3. Click → Scale 98% (active state)
4. Focus → Ring appears

### Forms

1. Focus → Ring with offset
2. Type → Validation feedback
3. Error → Shake animation
4. Success → Checkmark appears

### Cart Badge

1. Item added → Bounce animation
2. Count updates → Scale pulse
3. Hover → Slight scale increase

## 🎨 Design Principles

### Hierarchy

1. **Primary**: Large, bold, primary color
2. **Secondary**: Medium, outline or ghost
3. **Tertiary**: Small, text links

### Consistency

- Same spacing throughout
- Consistent border radius
- Unified color palette
- Matching shadows

### Clarity

- Clear visual hierarchy
- Obvious interactive elements
- Readable typography
- Sufficient contrast

### Delight

- Smooth animations
- Hover feedback
- Loading states
- Success confirmations

## 🔍 Accessibility

### Color Contrast

- Text on background: 7:1 (AAA)
- Interactive elements: 4.5:1 (AA)
- Disabled states: Clear visual difference

### Interactive Elements

- Focus indicators: 2px ring
- Keyboard navigation: Full support
- Screen readers: ARIA labels
- Touch targets: 44px minimum

### Content

- Alt text on all images
- Semantic HTML structure
- Heading hierarchy (h1 → h6)
- Form labels associated

## 📊 Component Inventory

### UI Components (10)

- Button (5 variants, 3 sizes)
- Card (with header, content, footer)
- Input (with validation states)
- Badge (4 variants)
- Select (dropdown with search)
- Tabs (horizontal navigation)
- Dialog (modal overlay)
- Skeleton (loading placeholder)

### Layout Components (2)

- Navbar (sticky, responsive)
- Footer (4 columns, newsletter)

### Feature Components (8)

- Hero (full-width, animated)
- PromoBanner (top banner)
- FeaturedProducts (grid with hover)
- Categories (3 cards)
- Testimonials (customer reviews)
- ProductCard (reusable)
- Filters (sidebar/overlay)
- ProductCardSkeleton (loading)

### Pages (8)

- HomePage
- ShopPage
- ProductDetailPage
- CustomDesignerPage
- CartPage
- CheckoutPage
- AuthPage
- AdminDashboard

## 🚀 Performance Metrics

### Bundle Size

- Total JS: ~281 KB (gzipped: 82 KB)
- Total CSS: ~57 KB (gzipped: 9.7 KB)
- Fonts: ~58 KB (3 font files)

### Optimizations

- Tree-shaking enabled
- Code splitting ready
- Lazy loading prepared
- GPU-accelerated animations
- Minimal re-renders

---

## 📸 Visual Reference

### Color Swatches

```
Primary Blue:   ████ oklch(0.488 0.243 264.376)
Black:          ████ oklch(0.145 0 0)
White:          ████ oklch(1 0 0)
Gray:           ████ oklch(0.556 0 0)
Light Gray:     ████ oklch(0.97 0 0)
```

### Component Sizes

```
Button Small:    h-9  (36px)
Button Default:  h-10 (40px)
Button Large:    h-12 (48px)
Input:           h-10 (40px)
Card Padding:    p-6  (24px)
Icon Size:       h-4 w-4 (16px) or h-5 w-5 (20px)
```

---

This design system ensures a consistent, premium, and accessible user experience across all pages and components.
