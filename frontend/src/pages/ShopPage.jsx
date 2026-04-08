import { useState, useEffect } from 'react'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import ProductCard from '@/components/Shop/ProductCard'
import ProductCardSkeleton from '@/components/Shop/ProductCardSkeleton'
import Filters from '@/components/Shop/Filters'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal, AlertCircle } from 'lucide-react'
import { productAPI } from '@/services/api'

export default function ShopPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: '-createdAt'
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  })

  useEffect(() => {
    fetchProducts()
  }, [filters, pagination.page])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')
      
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      }

      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null) {
          delete params[key]
        }
      })

      const response = await productAPI.getAllProducts(params)
      
      if (response.success) {
        setProducts(response.products)
        setPagination(response.pagination)
      }
    } catch (err) {
      setError(err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
    setPagination({ ...pagination, page: 1 }) // Reset to first page
  }

  const handleSortChange = (e) => {
    setFilters({ ...filters, sort: e.target.value })
    setPagination({ ...pagination, page: 1 })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Products</h1>
              <p className="text-muted-foreground">
                {loading ? 'Loading...' : `${pagination.total} products`}
              </p>
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
              
              <select 
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
                value={filters.sort}
                onChange={handleSortChange}
              >
                <option value="-createdAt">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-start gap-2 mb-6">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <Filters onFilterChange={handleFilterChange} currentFilters={filters} />
            </aside>

            {/* Mobile Filters Overlay */}
            {showFilters && (
              <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden">
                <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-background p-6 shadow-xl overflow-y-auto">
                  <Filters 
                    onClose={() => setShowFilters(false)} 
                    onFilterChange={handleFilterChange}
                    currentFilters={filters}
                  />
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No products found</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        disabled={pagination.page === 1}
                        onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                      >
                        Previous
                      </Button>
                      
                      <span className="text-sm text-muted-foreground">
                        Page {pagination.page} of {pagination.pages}
                      </span>
                      
                      <Button
                        variant="outline"
                        disabled={pagination.page === pagination.pages}
                        onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
