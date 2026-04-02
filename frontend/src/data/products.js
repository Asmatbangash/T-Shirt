import MidnightBlackTee from '@/assets/images/MidnightBlackTee.webp'
import OceanBlueClassic from '@/assets/images/OceanBlueClassic.webp'
import PureWhiteEssential from '@/assets/images/PureWhiteEssential.webp'
import SunsetOrange from '@/assets/images/SunsetOrange.webp'
import ForestGreen from '@/assets/images/ForestGreen.webp'
import CharcoalGray from '@/assets/images/CharcoalGray.webp'
import NavyBluePremium from '@/assets/images/NavyBluePremium.webp'
import CrimsonRed from '@/assets/images/CrimsonRed.webp'
import Oversized from '@/assets/images/Oversized.webp'
import Minimal from '@/assets/images/Minimal.webp'
import Custom from '@/assets/images/Custom.webp'
import SarahJohnson from '@/assets/images/SarahJohnson.webp'
import MikeChen from '@/assets/images/MikeChen.webp'
import EmmaDavis from '@/assets/images/EmmaDavis.webp'

// Product data with image paths
export const products = [
  {
    id: 1,
    name: 'Midnight Black Premium Tee',
    price: 29.99,
    image: MidnightBlackTee,
    images: [MidnightBlackTee, MidnightBlackTee, MidnightBlackTee, MidnightBlackTee],
    tag: 'Bestseller',
    colors: ['#000000', '#FFFFFF', '#9CA3AF'],
    description: 'Our signature premium cotton tee in midnight black. Crafted from 100% organic cotton with a modern fit that drapes perfectly. Pre-shrunk and designed to last.',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Pure White Essential',
    price: 24.99,
    image: PureWhiteEssential,
    images: [PureWhiteEssential, PureWhiteEssential],
    tag: 'New',
    colors: ['#FFFFFF', '#000000'],
    description: 'Classic white tee that goes with everything. Premium cotton blend for ultimate comfort.',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Ocean Blue Classic',
    price: 27.99,
    image: OceanBlueClassic,
    images: [OceanBlueClassic],
    colors: ['#3B82F6', '#000000'],
    description: 'Vibrant ocean blue for those who stand out. Fade-resistant dye and soft fabric.',
    rating: 4.7,
    reviews: 56
  },
  {
    id: 4,
    name: 'Sunset Orange',
    price: 29.99,
    image: SunsetOrange,
    images: [SunsetOrange],
    tag: 'Limited',
    colors: ['#F97316'],
    description: 'Bold sunset orange for the adventurous. Limited edition color.',
    rating: 4.6,
    reviews: 34
  },
  {
    id: 5,
    name: 'Forest Green',
    price: 26.99,
    image: ForestGreen,
    images: [ForestGreen, MidnightBlackTee, OceanBlueClassic, PureWhiteEssential],
    colors: ['#10B981'],
    description: 'Deep forest green with earthy vibes. Eco-friendly organic cotton.',
    rating: 4.8,
    reviews: 67
  },
  {
    id: 6,
    name: 'Charcoal Gray',
    price: 25.99,
    image: CharcoalGray,
    images: [CharcoalGray, MidnightBlackTee, OceanBlueClassic, PureWhiteEssential],
    colors: ['#6B7280'],
    description: 'Versatile charcoal gray for everyday wear. Soft and comfortable.',
    rating: 4.7,
    reviews: 92
  },
  {
    id: 7,
    name: 'Navy Blue Premium',
    price: 31.99,
    image: NavyBluePremium,
    images: [NavyBluePremium, MidnightBlackTee, SunsetOrange, PureWhiteEssential],
    colors: ['#1E3A8A'],
    description: 'Classic navy blue with premium finish. Perfect for any occasion.',
    rating: 4.9,
    reviews: 145
  },
  {
    id: 8,
    name: 'Crimson Red',
    price: 28.99,
    image: CrimsonRed,
    images: [CrimsonRed, SunsetOrange, MidnightBlackTee, PureWhiteEssential],
    tag: 'Hot',
    colors: ['#DC2626'],
    description: 'Bold crimson red that makes a statement. High-quality print retention.',
    rating: 4.5,
    reviews: 78
  }
]

export const categories = [
  {
    id: 1,
    name: 'Oversized',
    description: 'Relaxed fit for ultimate comfort',
    image: Oversized,
    color: 'from-blue-500/10 to-purple-500/10'
  },
  {
    id: 2,
    name: 'Minimal',
    description: 'Clean designs, maximum impact',
    image: Minimal,
    color: 'from-gray-500/10 to-slate-500/10'
  },
  {
    id: 3,
    name: 'Custom',
    description: 'Your design, your rules',
    image: Custom,
    color: 'from-purple-500/10 to-pink-500/10'
  }
]

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Designer',
    content: 'The quality is unmatched. My custom design came out exactly as I envisioned. Will definitely order again!',
    rating: 5,
    avatar: SarahJohnson
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Entrepreneur',
    content: 'Perfect for my startup merch. Fast delivery, great print quality, and the fabric feels premium.',
    rating: 5,
    avatar: MikeChen
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Artist',
    content: 'Love the customization options! The interface is so easy to use and the final product exceeded expectations.',
    rating: 5,
    avatar: EmmaDavis
  }
]

export const cartItems = [
  {
    id: 1,
    name: 'Midnight Black Tee',
    size: 'M',
    color: 'Black',
    price: 29.99,
    quantity: 2,
    image: MidnightBlackTee
  },
  {
    id: 2,
    name: 'Pure White Essential',
    size: 'L',
    color: 'White',
    price: 24.99,
    quantity: 1,
    image: PureWhiteEssential
  },
  {
    id: 3,
    name: 'Ocean Blue Classic',
    size: 'M',
    color: 'Blue',
    price: 27.99,
    quantity: 1,
    image: OceanBlueClassic
  }
]

