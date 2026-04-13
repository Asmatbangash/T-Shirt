import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { orderAPI } from '@/services/api'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CreditCard, Lock } from 'lucide-react'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.FullName || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  })

  const subtotal = cart?.totalPrice || 0
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + tax + shipping

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Format ZIP code as user types
    if (name === 'zipCode') {
      // Remove non-digits
      let formatted = value.replace(/\D/g, '')
      
      // Limit to 5 digits for Stripe compatibility
      formatted = formatted.slice(0, 5)
      
      setShippingInfo({
        ...shippingInfo,
        [name]: formatted
      })
    } else if (name === 'state') {
      // Convert to uppercase and limit to 2 characters
      const formatted = value.toUpperCase().slice(0, 2)
      setShippingInfo({
        ...shippingInfo,
        [name]: formatted
      })
    } else if (name === 'phone') {
      // Format phone number
      let formatted = value.replace(/\D/g, '')
      formatted = formatted.slice(0, 10)
      
      if (formatted.length > 6) {
        formatted = `(${formatted.slice(0, 3)}) ${formatted.slice(3, 6)}-${formatted.slice(6)}`
      } else if (formatted.length > 3) {
        formatted = `(${formatted.slice(0, 3)}) ${formatted.slice(3)}`
      } else if (formatted.length > 0) {
        formatted = `(${formatted}`
      }
      
      setShippingInfo({
        ...shippingInfo,
        [name]: formatted
      })
    } else {
      setShippingInfo({
        ...shippingInfo,
        [name]: value
      })
    }
    
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    // Validate shipping info
    const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'phone']
    for (const field of requiredFields) {
      if (!shippingInfo[field]) {
        setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
        return
      }
    }
    
    // Validate ZIP code format (5 digits or 5+4 format)
    const zipCodeDigits = shippingInfo.zipCode.replace(/\D/g, '')
    if (zipCodeDigits.length !== 5) {
      setError('Please enter a valid 5-digit ZIP code')
      return
    }
    
    // Validate state code (2 letters)
    if (shippingInfo.state.length !== 2) {
      setError('Please enter a valid 2-letter state code (e.g., CA, NY)')
      return
    }
    
    // Validate phone number (10 digits)
    const phoneDigits = shippingInfo.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Create payment intent
      const { clientSecret, paymentIntentId } = await orderAPI.createPaymentIntent(total)

      // Clean and validate postal code - must be exactly 5 digits for Stripe
      const cleanZipCode = shippingInfo.zipCode.replace(/\D/g, '').slice(0, 5)
      const cleanPhone = shippingInfo.phone.replace(/\D/g, '')

      console.log('Submitting payment with ZIP:', cleanZipCode, 'length:', cleanZipCode.length)

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shippingInfo.fullName,
            phone: cleanPhone,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: cleanZipCode,
              country: 'US'
            }
          }
        }
      })

      if (stripeError) {
        setError(stripeError.message)
        setLoading(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        // Create order
        const orderResponse = await orderAPI.createOrder(
          {
            ...shippingInfo,
            country: 'USA'
          },
          paymentIntentId
        )

        if (orderResponse.success) {
          await clearCart()
          navigate(`/order-confirmation/${orderResponse.order._id}`)
        }
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Information */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State (2-letter code)</Label>
              <Input
                id="state"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                placeholder="CA"
                maxLength={2}
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">ZIP Code (5 digits)</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleInputChange}
                placeholder="12345"
                maxLength={5}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
                maxLength={14}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg">
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Your payment information is secure and encrypted
          </p>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={!stripe || loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </Button>
    </form>
  )
}

export default function CheckoutPage() {
  const { cart, loading } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && (!cart || cart.items.length === 0)) {
      navigate('/cart')
    }
  }, [cart, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="max-w-2xl mx-auto">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
