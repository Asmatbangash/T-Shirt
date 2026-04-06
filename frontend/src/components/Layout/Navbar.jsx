import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, Search, LogOut, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/context/AuthContext'
import { isAdmin } from '@/utils/auth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              Threadify
            </Link>
            
            {/* Desktop Navigation */}

            <div className="hidden md:flex items-center gap-6">
               <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/shop" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Shop
              </Link>
              <Link to="/collections" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Collections
              </Link>
              <Link to="/custom" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Customize
              </Link>
              
              {/* Admin Link */}
              {isAdmin(user) && (
                <Link to="/admin" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {user.FullName}
                  </span>
                  {isAdmin(user) && (
                    <Badge variant="secondary" className="text-xs">Admin</Badge>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
