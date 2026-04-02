import { Link } from 'react-router-dom'
import { categories } from '@/data/products'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export default function Categories() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Shop by Style</h2>
          <p className="text-muted-foreground">Find your perfect fit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={category.id === 3 ? '/custom' : '/shop'}>
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative aspect-3/2 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="relative p-6">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
