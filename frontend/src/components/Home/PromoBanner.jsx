import { Sparkles } from 'lucide-react'

export default function PromoBanner() {
  return (
    <section className="bg-primary text-primary-foreground py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>Free shipping on orders over $50 | Use code: THREAD50</span>
        </div>
      </div>
    </section>
  )
}
