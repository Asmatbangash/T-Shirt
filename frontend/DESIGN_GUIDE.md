# Threadify Design System Guide

## 🎨 Visual Identity

### Brand Personality

- **Premium**: High-quality, sophisticated, attention to detail
- **Modern**: Clean lines, contemporary aesthetics
- **Accessible**: Easy to use, intuitive navigation
- **Bold**: Strong typography, confident design choices

### Color System

#### Primary Palette

```css
--primary: oklch(0.488 0.243 264.376) /* Electric Blue */
  --background: oklch(1 0 0) /* Pure White */ --foreground: oklch(0.145 0 0)
  /* Near Black */;
```

#### Usage Guidelines

- **Primary Blue**: CTAs, links, active states, brand accents
- **Black/White**: Main content, backgrounds
- **Gray Scale**: Secondary text, borders, subtle backgrounds

### Typography Scale

```
Hero: 4rem - 5rem (64px - 80px)
H1: 2.5rem - 3rem (40px - 48px)
H2: 2rem - 2.5rem (32px - 40px)
H3: 1.5rem - 2rem (24px - 32px)
Body: 1rem (16px)
Small: 0.875rem (14px)
```

### Spacing System

Based on 4px grid: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

### Border Radius

- **Small**: 0.5rem (8px) - Buttons, inputs
- **Medium**: 0.75rem (12px) - Cards
- **Large**: 1rem (16px) - Large cards
- **XL**: 1.5rem (24px) - Hero sections
- **Full**: 9999px - Pills, badges

## 🧩 Component Patterns

### Cards

- Shadow: `shadow-lg` for elevation
- Hover: `hover:shadow-2xl` for interaction
- Border: `border-0` for cleaner look
- Padding: `p-6` standard, `p-4` compact

### Buttons

- **Primary**: Solid background, high contrast
- **Secondary**: Outline style
- **Ghost**: Transparent, subtle hover
- **Sizes**: sm (h-9), default (h-10), lg (h-12)
- **Rounded**: Use `rounded-full` for pill-shaped CTAs

### Images

- **Aspect Ratios**:
  - Product cards: 4:5 (portrait)
  - Category cards: 3:2 (landscape)
  - Thumbnails: 1:1 (square)
- **Hover Effect**: Scale 110% with smooth transition
- **Loading**: Use skeleton loaders

### Interactive States

- **Hover**: Scale, shadow, color transitions
- **Focus**: Ring with offset for accessibility
- **Active**: Darker shade or filled state
- **Disabled**: 50% opacity, no pointer events

## 📱 Responsive Design

### Breakpoints

```
sm: 640px   (Mobile landscape, small tablets)
md: 768px   (Tablets)
lg: 1024px  (Desktop)
xl: 1280px  (Large desktop)
```

### Grid Patterns

- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns
- **Large**: 4+ columns

### Navigation

- **Desktop**: Full horizontal menu
- **Mobile**: Hamburger menu, bottom sheet

## ✨ Animation Guidelines

### Transitions

- **Duration**: 300ms standard, 500ms for images
- **Easing**: Default ease-in-out
- **Properties**: transform, opacity, shadow

### Hover Effects

```css
/* Product Cards */
- Image: scale(1.1)
- Shadow: shadow-lg → shadow-2xl
- Buttons: opacity 0 → 1

/* Buttons */
- Background: subtle darkening
- Icons: translateX(4px) for arrows
```

## 🎯 UX Principles

### Hierarchy

1. **Primary Action**: Large, prominent, primary color
2. **Secondary Action**: Outline or ghost style
3. **Tertiary**: Text links or subtle buttons

### Feedback

- **Loading**: Skeleton screens, spinners
- **Success**: Green badges, checkmarks
- **Error**: Red text, destructive variant
- **Info**: Blue badges, info icons

### Accessibility

- **Contrast**: WCAG AA minimum (4.5:1)
- **Focus**: Visible ring on all interactive elements
- **Labels**: All inputs have labels
- **Alt Text**: All images have descriptive alt text
- **Keyboard**: Full keyboard navigation support

## 🛍️ E-Commerce Specific

### Product Cards

- Clear product image
- Product name (truncated if needed)
- Price (prominent, bold)
- Quick actions on hover
- Color swatches if available
- Badge for tags (New, Sale, Limited)

### Filters

- Sticky on desktop
- Slide-in drawer on mobile
- Visual feedback for active filters
- Clear all option
- Count of active filters

### Cart

- Item thumbnail
- Size and color info
- Quantity stepper
- Remove option
- Sticky order summary
- Clear pricing breakdown

### Checkout

- Multi-step or single page
- Progress indicator
- Form validation
- Secure payment indicators
- Order summary always visible

## 🎨 Design Inspiration

- **Nike**: Bold typography, minimal design, strong CTAs
- **Apple**: Clean spacing, premium feel, product focus
- **Shopify Stores**: Modern e-commerce patterns
- **Vercel**: Smooth animations, gradient accents
- **Linear**: Sharp UI, attention to detail

## 📐 Layout Patterns

### Container

```jsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
```

### Section Spacing

```jsx
<section className="py-20">  // Large sections
<section className="py-12">  // Medium sections
<section className="py-8">   // Small sections
```

### Grid Layouts

```jsx
// Product Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// Two Column
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

---

This design system ensures consistency, scalability, and a premium user experience across all pages.
