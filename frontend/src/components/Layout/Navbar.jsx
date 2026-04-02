import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
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
             
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
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
