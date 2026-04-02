// Generate mock sizes for products (since FakeStore API doesn't have sizes)
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Get size based on product ID (mock data)
export const getProductSize = (productId) => {
  return SIZES[productId % SIZES.length];
};

// Filter products based on search term and filters
export const filterProducts = (products, searchTerm, selectedCategory, selectedSize) => {
  let filtered = [...products];

  // Filter by search term (title)
  if (searchTerm.trim()) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by category
  if (selectedCategory) {
    filtered = filtered.filter((product) =>
      product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // Filter by size (mock - based on product ID)
  if (selectedSize) {
    filtered = filtered.filter((product) => {
      const productSize = getProductSize(product.id);
      return productSize === selectedSize;
    });
  }

  return filtered;
};

// Truncate description to a certain length
export const truncateDescription = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Format price
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
