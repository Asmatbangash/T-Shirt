import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProductCardSkeleton from '@/components/Shop/ProductCardSkeleton'
import { productAPI } from '@/services/api'
import { categories } from '@/data/products'

export default function CollectionsPage() {
  const [collectionsData, setCollectionsData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      setLoading(true)
      
      // Fetch products for each category
      const collectionsPromises = categories.map(async (category) => {
        const response = await productAPI.getProductsByCategory(category.name.toLowerCase(), 3)
        return {
          ...category,
          products: response.success ? response.products : [],
          slug: category.name.toLowerCase()
        }
      })

      const collections = await Promise.all(collectionsPromises)
      setCollectionsData(collections)
    } catch (error) {
      console.error('Failed to fetch collections:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-linear-to-br from-primary/5 to-purple-500/5">
          <div className="container mx-auto text-center max-w-3xl">
            <Badge className="mb-4">Curated Collections</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Explore Our Collections
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover carefully curated collections designed for every style and occasion
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto space-y-24">
            {loading ? (
              <div className="space-y-24">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="space-y-8">
                    <div className="h-12 w-64 bg-muted animate-pulse rounded" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(3)].map((_, i) => (
                        <ProductCardSkeleton key={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              collectionsData.map((collection, index) => (
                <div key={collection.id} className="space-y-8">
                  {/* Collection Header */}
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        {collection.name}
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        {collection.description}
                      </p>
                    </div>
                    <Link to={`/shop?category=${collection.slug}`}>
                      <Button variant="outline" className="gap-2">
                        View All
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Products Grid */}
                  {collection.products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {collection.products.map((product) => (
                        <Link key={product._id} to={`/product/${product._id}`}>
                          <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-4/5 overflow-hidden bg-muted">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {product.tag && (
                                <Badge className="absolute top-4 left-4">
                                  {product.tag}
                                </Badge>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                              <div className="flex items-center justify-between">
                                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <span>★</span>
                                  <span>{product.rating}</span>
                                  <span>({product.reviews})</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No products available in this collection yet
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create your own custom design and bring your vision to life
            </p>
            <Link to="/custom">
              <Button size="lg" className="gap-2">
                Start Designing
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
