import Navbar from '@/components/Layout/Navbar'
import Hero from '@/components/Home/Hero'
import PromoBanner from '@/components/Home/PromoBanner'
import FeaturedProducts from '@/components/Home/FeaturedProducts'
import Categories from '@/components/Home/Categories'
import Testimonials from '@/components/Home/Testimonials'
import Footer from '@/components/Layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <PromoBanner />
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <Footer />
    </div>
  )
}
