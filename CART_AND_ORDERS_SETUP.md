# Shopping Cart & Orders Setup Guide

This guide will help you set up the complete shopping cart and order management system with Stripe payment integration.

## Prerequisites

- MongoDB running locally or connection string
- Stripe account (get test keys from https://dashboard.stripe.com/test/apikeys)
- Node.js and npm installed

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install stripe
```

### 2. Configure Environment Variables

Update `backend/.env` with your Stripe secret key:

```env
PORT = 8080
MONGO_URI="mongodb://localhost:27017/T-Shirt"
JWT_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
JWT_EXPIRE="7d"

# Stripe Keys
STRIPE_SECRET_KEY="sk_test_your_actual_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_actual_stripe_publishable_key"
```

### 3. Start Backend Server

```bash
npm start
```

The server will run on http://localhost:8080

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install @stripe/react-stripe-js @stripe/stripe-js
```

### 2. Configure Environment Variables

Update `frontend/.env` with your Stripe publishable key:

```env
VITE_API_URL=http://localhost:8080/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key
```

### 3. Start Frontend Server

```bash
npm run dev
```

The app will run on http://localhost:5173

## Getting Stripe Test Keys

1. Go to https://dashboard.stripe.com/register
2. Create a free account
3. Navigate to Developers → API keys
4. Copy your test keys:
   - **Publishable key** (starts with `pk_test_`) → Add to frontend `.env`
   - **Secret key** (starts with `sk_test_`) → Add to backend `.env`

## Testing Payments

Use these Stripe test card numbers:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

- Use any future expiry date (e.g., 12/34)
- Use any 3-digit CVC
- Use any ZIP code

## Features Implemented

### Shopping Cart

- ✅ Add items to cart with size and color selection
- ✅ Update item quantities
- ✅ Remove items from cart
- ✅ Cart persists in database (requires login)
- ✅ Real-time cart total calculation
- ✅ Free shipping over $50

### Checkout Process

- ✅ Shipping address form
- ✅ Stripe payment integration
- ✅ Secure card payment processing
- ✅ Order creation after successful payment
- ✅ Automatic stock reduction
- ✅ Cart clearing after order

### Order Management

- ✅ Order confirmation page
- ✅ Order history for users
- ✅ Order tracking with status updates
- ✅ Admin order management
- ✅ Order status updates (pending, processing, shipped, delivered)
- ✅ Tracking number assignment

## API Endpoints

### Cart Endpoints

- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Order Endpoints

- `POST /api/orders/payment-intent` - Create Stripe payment intent
- `POST /api/orders` - Create order after payment
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get specific order
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## Database Models

### Cart Model

```javascript
{
  user: ObjectId,
  items: [{
    product: ObjectId,
    quantity: Number,
    size: String,
    color: String,
    price: Number
  }],
  totalItems: Number,
  totalPrice: Number
}
```

### Order Model

```javascript
{
  orderNumber: String,
  user: ObjectId,
  items: [{
    product: ObjectId,
    name: String,
    image: String,
    quantity: Number,
    size: String,
    color: String,
    price: Number
  }],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  paymentIntentId: String,
  paymentStatus: String,
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  status: String,
  trackingNumber: String,
  statusHistory: Array
}
```

## User Flow

1. **Browse Products** → User views products on shop page
2. **Add to Cart** → User adds items with size/color selection
3. **View Cart** → User reviews cart, updates quantities
4. **Checkout** → User enters shipping info and payment details
5. **Payment** → Stripe processes payment securely
6. **Confirmation** → User sees order confirmation with order number
7. **Track Order** → User can view order history and track shipments

## Admin Features

Admins can:

- View all orders
- Update order status
- Add tracking numbers
- View order details
- Filter orders by status

## Troubleshooting

### Cart not loading

- Ensure user is logged in
- Check backend server is running
- Verify MongoDB connection

### Payment failing

- Verify Stripe keys are correct
- Check test card numbers
- Ensure amount is greater than $0.50

### Orders not creating

- Check payment was successful
- Verify cart has items
- Check backend logs for errors

## Security Notes

- All cart and order endpoints require authentication
- Payment processing uses Stripe's secure infrastructure
- Card details never touch your server
- JWT tokens used for session management
- Admin routes protected with role-based middleware

## Next Steps

1. Set up email notifications for order confirmations
2. Add order cancellation feature
3. Implement refund processing
4. Add order invoice generation
5. Set up webhook for Stripe events
6. Add shipping carrier integration

## Support

For issues or questions:

- Check backend logs: `backend/src/index.js`
- Check browser console for frontend errors
- Verify all environment variables are set
- Ensure MongoDB is running
