import { useState } from 'react'
import { products } from '@/data/products'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import ProductCard from '@/components/Shop/ProductCard'
import Filters from '@/components/Shop/Filters'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'

export default function ShopPage() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Products</h1>
              <p className="text-muted-foreground">{products.length} products</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <Filters />
            </aside>

            {/* Mobile Filters Overlay */}
            {showFilters && (
              <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden">
                <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-background p-6 shadow-xl overflow-y-auto">
                  <Filters onClose={() => setShowFilters(false)} />
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
