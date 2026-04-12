import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LazyImage } from '@/components/ui/lazy-image'
import { ShoppingCart, Heart, Eye } from 'lucide-react'

export default function ProductCard({ product }) {
  const productId = product._id || product.id
  
  return (
    <Link to={`/product/${productId}`}>
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative aspect-4/5 overflow-hidden bg-muted">
        <LazyImage
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.tag && (
          <Badge className="absolute top-3 left-3">{product.tag}</Badge>
        )}
        
        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-9 w-9">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-9 w-9">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">${product.price?.toFixed(2)}</p>
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, i) => (
                <div 
                  key={i}
                  className="h-4 w-4 rounded-full border-2 border-background shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
        {product.rating && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <span>★</span>
            <span>{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
        )}
      </div>
    </Card>
    </Link>
  )
}
