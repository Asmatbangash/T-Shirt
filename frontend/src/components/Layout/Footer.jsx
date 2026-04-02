import { Link } from 'react-router-dom'
import { Share2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Threadify</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium custom T-shirts designed by you, crafted by us.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Oversized</Link></li>
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Minimal</Link></li>
              <li><Link to="/custom" className="hover:text-foreground transition-colors">Custom Design</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Shipping Info</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Returns</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get the latest drops and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="h-9" />
              <Button size="icon" className="h-9 w-9 shrink-0">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Threadify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
