import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'T-Shirts',
    brand: 'Premium',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    rating: 4.5,
    reviewCount: 128,
    description: 'Ultra-soft premium cotton t-shirt with perfect fit and lasting comfort.',
    isOnSale: true
  },
  {
    id: '2',
    name: 'Classic Denim Jacket',
    price: 89.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Jackets',
    brand: 'Denim Co.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black', 'Light Blue'],
    rating: 4.8,
    reviewCount: 89,
    description: 'Timeless denim jacket crafted from premium denim with vintage wash.',
    isNew: true
  },
  {
    id: '3',
    name: 'Elegant Summer Dress',
    price: 79.99,
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dresses',
    brand: 'Elegance',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral', 'Navy', 'Pink', 'Black'],
    rating: 4.6,
    reviewCount: 156,
    description: 'Flowing summer dress perfect for any occasion with breathable fabric.'
  },
  {
    id: '4',
    name: 'Slim Fit Chinos',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pants',
    brand: 'Tailored',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Black', 'Olive'],
    rating: 4.4,
    reviewCount: 92,
    description: 'Contemporary slim-fit chinos with stretch comfort for everyday wear.',
    isOnSale: true
  },
  {
    id: '5',
    name: 'Cozy Knit Sweater',
    price: 69.99,
    image: 'https://images.pexels.com/photos/4210789/pexels-photo-4210789.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Sweaters',
    brand: 'Comfort',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Gray', 'Navy', 'Burgundy'],
    rating: 4.7,
    reviewCount: 203,
    description: 'Luxuriously soft knit sweater perfect for layering in cooler weather.'
  },
  {
    id: '6',
    name: 'Athletic Joggers',
    price: 45.99,
    image: 'https://images.pexels.com/photos/7945918/pexels-photo-7945918.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Activewear',
    brand: 'Sport',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Charcoal'],
    rating: 4.3,
    reviewCount: 167,
    description: 'High-performance joggers with moisture-wicking technology and comfortable fit.'
  },
  {
    id: '7',
    name: 'Button-Down Shirt',
    price: 54.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Shirts',
    brand: 'Classic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Pink', 'Gray'],
    rating: 4.5,
    reviewCount: 134,
    description: 'Crisp button-down shirt perfect for business casual and formal occasions.',
    isNew: true
  },
  {
    id: '8',
    name: 'Midi Skirt',
    price: 39.99,
    originalPrice: 54.99,
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Skirts',
    brand: 'Modern',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Burgundy', 'Olive'],
    rating: 4.2,
    reviewCount: 78,
    description: 'Versatile midi skirt that transitions seamlessly from day to night.',
    isOnSale: true
  }
];

export const categories = ['All', 'T-Shirts', 'Jackets', 'Dresses', 'Pants', 'Sweaters', 'Activewear', 'Shirts', 'Skirts'];
export const brands = ['Premium', 'Denim Co.', 'Elegance', 'Tailored', 'Comfort', 'Sport', 'Classic', 'Modern'];
export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36'];
export const colors = ['Black', 'White', 'Navy', 'Gray', 'Blue', 'Light Blue', 'Pink', 'Floral', 'Khaki', 'Olive', 'Cream', 'Burgundy', 'Charcoal'];