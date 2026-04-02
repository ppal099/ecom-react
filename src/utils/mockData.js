// Mock data for fallback when API is unavailable
export const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Cotton Casual Shirt',
    price: 29.99,
    description: 'High-quality cotton casual shirt perfect for everyday wear. Features breathable fabric and comfortable fit.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'Premium Denim Jeans',
    price: 59.99,
    description: 'Classic denim jeans with perfect fit and durability. Suitable for casual and semi-formal occasions.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
  },
  {
    id: 3,
    title: 'Wool Winter Jacket',
    price: 119.99,
    description: 'Warm and comfortable wool jacket ideal for winter season. Premium quality material with stylish design.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
  },
  {
    id: 4,
    title: 'Athletic Running Shoes',
    price: 89.99,
    description: 'Professional athletic shoes designed for running and sports. Excellent cushioning and support.',
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
  },
  {
    id: 5,
    title: 'Summer T-Shirt',
    price: 19.99,
    description: 'Lightweight cotton T-shirt perfect for summer. Available in multiple colors with comfortable fit.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
  },
  {
    id: 6,
    title: 'Casual Polo Shirt',
    price: 39.99,
    description: 'Elegant polo shirt suitable for casual and semi-formal settings. Premium fabric with good breathability.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop',
  },
  {
    id: 7,
    title: 'Formal Blazer',
    price: 149.99,
    description: 'Professional formal blazer perfect for business occasions. High-quality material with perfect tailoring.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
  },
  {
    id: 8,
    title: 'Khaki Chinos',
    price: 49.99,
    description: 'Versatile khaki chinos suitable for both casual and business wear. Comfortable and durable cotton blend.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1473966143822-2dbb045cb222?w=500&h=500&fit=crop',
  },
  {
    id: 9,
    title: 'Sports Leggings',
    price: 44.99,
    description: 'High-performance leggings designed for fitness and sports. Moisture-wicking and breathable fabric.',
    category: 'activewear',
    image: 'https://images.unsplash.com/photo-1506629082632-41e63e1c4213?w=500&h=500&fit=crop',
  },
  {
    id: 10,
    title: 'Casual Hoodie',
    price: 54.99,
    description: 'Cozy and comfortable hoodie perfect for casual wear. Soft material with spacious pockets.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1556821840-28e63b1a0b79?w=500&h=500&fit=crop',
  },
  {
    id: 11,
    title: 'Linen Summer Dress',
    price: 69.99,
    description: 'Light and breezy linen dress perfect for summer occasions. Elegant design with comfortable fit.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1595472057009-24f1e3b4b9d1?w=500&h=500&fit=crop',
  },
  {
    id: 12,
    title: 'Denim Jacket',
    price: 79.99,
    description: 'Classic denim jacket that pairs well with any outfit. Durable and timeless style.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
  },
  {
    id: 13,
    title: 'Cargo Shorts',
    price: 44.99,
    description: 'Practical cargo shorts with multiple pockets. Perfect for outdoor activities and casual wear.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1473966143822-2dbb045cb222?w=500&h=500&fit=crop',
  },
  {
    id: 14,
    title: 'Tank Top',
    price: 14.99,
    description: 'Simple and versatile tank top suitable for layering or wearing alone. Available in multiple colors.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
  },
  {
    id: 15,
    title: 'Wool Sweater',
    price: 69.99,
    description: 'Warm and soft wool sweater perfect for cooler weather. Premium quality with comfortable fit.',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1556821840-28e63b1a0b79?w=500&h=500&fit=crop',
  },
];

// Get unique categories from mock data
export const MOCK_CATEGORIES = ['clothing', 'footwear', 'activewear'];

const API_UNAVAILABLE_KEY = 'apiUnavailable';

export const setApiUnavailable = () => {
  localStorage.setItem(API_UNAVAILABLE_KEY, 'true');
};

export const clearApiUnavailable = () => {
  localStorage.removeItem(API_UNAVAILABLE_KEY);
};

export const isApiUnavailable = () => {
  return localStorage.getItem(API_UNAVAILABLE_KEY) === 'true';
};

// Utility function to retry API calls with exponential backoff
export const retryFetch = async (url, maxRetries = 3) => {
  if (isApiUnavailable()) {
    throw new Error('API unavailable (cached)');
  }

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        if ((response.status === 523 || response.status === 403 || response.status === 404) && i < maxRetries - 1) {
          // Service unavailable or potentially blocked, retry with backoff
          const delay = Math.pow(2, i) * 1000; // Exponential backoff: 1s, 2s, 4s
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        if (response.status === 0) {
          setApiUnavailable();
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      clearApiUnavailable();
      return data;
    } catch (error) {
      const message = (error && error.message) ? error.message : '';
      if (message.includes('CORS') || message.includes('Access-Control-Allow-Origin') || error.name === 'TypeError') {
        // Browser CORS or network failure
        setApiUnavailable();
        throw new Error('API unavailable due to CORS or network issue');
      }

      if (i === maxRetries - 1) {
        setApiUnavailable();
        throw error;
      }

      const delay = Math.pow(2, i) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
