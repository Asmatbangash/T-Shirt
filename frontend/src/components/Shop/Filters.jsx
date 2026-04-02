import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Gray', value: '#9CA3AF' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Green', value: '#10B981' },
]

export default function Filters({ onClose }) {
  return (
    <div className="space-y-6">
      {/* Mobile Close Button */}
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Size Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <Button 
                key={size} 
                variant="outline" 
                className="h-10 hover:bg-primary hover:text-primary-foreground"
              >
                {size}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                className="group relative h-10 w-10 rounded-full border-2 border-muted hover:border-primary transition-colors"
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input 
              type="range" 
              min="0" 
              max="100" 
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$0</span>
              <span>$100</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="gap-1">
          Size: M
          <X className="h-3 w-3 cursor-pointer" />
        </Badge>
        <Badge variant="secondary" className="gap-1">
          Black
          <X className="h-3 w-3 cursor-pointer" />
        </Badge>
      </div>

      <Button variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  )
}
