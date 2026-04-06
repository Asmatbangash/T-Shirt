import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Package, ShoppingBag, Users, LogOut, Home
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { id: 'products', label: 'Products', icon: Package, path: '/admin/products' },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
  { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
]

export default function AdminDashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/admin') return 'Dashboard'
    if (path === '/admin/products') return 'Products'
    if (path === '/admin/orders') return 'Orders'
    if (path === '/admin/customers') return 'Customers'
    return 'Dashboard'
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background min-h-screen p-6 flex flex-col">
          <h1 className="text-2xl font-bold mb-8">Threadify Admin</h1>
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Bottom Actions */}
          <div className="pt-4 border-t space-y-2">
            <Link
              to="/"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-muted"
            >
              <Home className="h-4 w-4" />
              View Store
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-1">{getPageTitle()}</h2>
              <p className="text-muted-foreground">Welcome back, Admin</p>
            </div>
          </div>

          {/* Nested Routes Content */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
