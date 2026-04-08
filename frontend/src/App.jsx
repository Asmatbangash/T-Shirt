import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { AdminRoute } from '@/components/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import ShopPage from '@/pages/ShopPage'
import CollectionsPage from '@/pages/CollectionsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import CustomDesignerPage from '@/pages/CustomDesignerPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import OrderConfirmationPage from '@/pages/OrderConfirmationPage'
import OrderHistoryPage from '@/pages/OrderHistoryPage'
import AuthPage from '@/pages/AuthPage'
import AdminDashboard from '@/pages/AdminDashboard'
import DashboardView from '@/pages/admin/DashboardView'
import ProductsView from '@/pages/admin/ProductsView'
import OrdersView from '@/pages/admin/OrdersView'
import CustomersView from '@/pages/admin/CustomersView'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/custom" element={<CustomDesignerPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            >
              <Route index element={<DashboardView />} />
              <Route path="products" element={<ProductsView />} />
              <Route path="orders" element={<OrdersView />} />
              <Route path="customers" element={<CustomersView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
