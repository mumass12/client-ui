import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    productCount: 156
  },
  {
    id: '2',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=500',
    productCount: 89
  },
  {
    id: '3',
    name: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=500',
    productCount: 234
  },
  {
    id: '4',
    name: 'Sports',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=500',
    productCount: 67
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.8,
    reviews: 324,
    description: 'Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.',
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Warranty': '2 years'
    },
    inStock: true,
    colors: ['Black', 'White', 'Silver']
  },
  {
    id: '2',
    name: 'Elegant Summer Dress',
    price: 89,
    originalPrice: 129,
    discount: 31,
    image: 'https://images.pexels.com/photos/794063/pexels-photo-794063.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/794063/pexels-photo-794063.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    brand: 'StyleCo',
    rating: 4.6,
    reviews: 158,
    description: 'A beautiful summer dress perfect for any occasion. Made from breathable fabric with an elegant silhouette.',
    specifications: {
      'Material': '100% Cotton',
      'Care': 'Machine wash cold',
      'Fit': 'Regular',
      'Origin': 'Made in Italy'
    },
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Pink', 'White']
  },
  {
    id: '3',
    name: 'Modern Coffee Table',
    price: 459,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home & Garden',
    brand: 'FurniCraft',
    rating: 4.9,
    reviews: 89,
    description: 'Sleek and modern coffee table that complements any living space. Features solid wood construction with minimalist design.',
    specifications: {
      'Material': 'Solid Oak Wood',
      'Dimensions': '120cm x 60cm x 40cm',
      'Weight': '25kg',
      'Assembly': 'Required'
    },
    inStock: true,
    colors: ['Natural', 'Walnut', 'White']
  },
  {
    id: '4',
    name: 'Professional Running Shoes',
    price: 149,
    originalPrice: 199,
    discount: 25,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Sports',
    brand: 'RunPro',
    rating: 4.7,
    reviews: 412,
    description: 'High-performance running shoes designed for comfort and durability. Perfect for both casual joggers and serious athletes.',
    specifications: {
      'Upper Material': 'Mesh & Synthetic',
      'Sole': 'Rubber with Air Cushioning',
      'Drop': '10mm',
      'Weight': '280g (Size 9)'
    },
    inStock: true,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Blue', 'Red', 'Gray']
  },
  {
    id: '5',
    name: 'Luxury Watch Collection',
    price: 899,
    originalPrice: 1199,
    discount: 25,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    brand: 'TimeMaster',
    rating: 4.9,
    reviews: 156,
    description: 'Exquisite timepiece combining traditional craftsmanship with modern precision. Swiss movement with premium materials.',
    specifications: {
      'Movement': 'Swiss Automatic',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '100m',
      'Warranty': '5 years'
    },
    inStock: true,
    colors: ['Silver', 'Gold', 'Black']
  },
  {
    id: '6',
    name: 'Minimalist Desk Lamp',
    price: 129,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home & Garden',
    brand: 'LightCraft',
    rating: 4.5,
    reviews: 73,
    description: 'Modern desk lamp with adjustable brightness and sleek design. Perfect for home office or study spaces.',
    specifications: {
      'Light Type': 'LED',
      'Power': '12W',
      'Dimming': 'Touch Control',
      'Height': '45cm'
    },
    inStock: true,
    colors: ['Black', 'White', 'Gold']
  }
];

export const featuredProducts = products.slice(0, 4);
export const trendingProducts = products.slice(2, 6);