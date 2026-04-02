# E-Commerce Clothing Application

A modern, performant e-commerce application built with React, Redux, and Styled Components that showcases best practices in React development.

## Features

### Product Listing Page (/)
- **Product Display**: Browse 100+ products with images, titles, prices, and descriptions
- **Search Functionality**: Filter products by title in real-time
- **Category Filter**: Filter products by category
- **Size Filter**: Filter products by available sizes
- **Skeleton Loading**: Beautiful loading states while fetching data
- **Error Handling**: Graceful error messages when data fails to load
- **Responsive Grid**: Adaptive product grid that works on all devices
- **Performance Optimized**: Lazy loading images and efficient filtering

### Product Details Page (/product/:id)
- **Detailed Product View**: Full product information including:
  - Large product image
  - Complete product description
  - Category information
  - Full price details
  - Size specifications
  - Stock status
  - Shipping information
- **Back Navigation**: Easy navigation back to the product list
- **Skeleton Loading**: Beautiful loading state for detail page
- **Error Handling**: Proper error messages if product not found

### Advanced Features
- **Persistent Filters**: Search and filter selections are saved to localStorage and persist across page refreshes and navigation
- **Redux State Management**: Centralized state management for products and filters
- **Styled Components**: Modern CSS-in-JS styling with component-scoped styles
- **React Context Ready**: Architecture allows for easy Context API integration
- **React Router**: Seamless navigation between pages
- **Modern Hooks**: Functional components using React Hooks (useState, useEffect, useSelector, useDispatch)

## Tech Stack

- **Frontend Framework**: ReactJS
- **Routing**: React Router v6
- **State Management**: Redux with Redux Toolkit
- **Styling**: Styled Components + CSS
- **HTTP Client**: Axios
- **API**: FakeStore API
- **Build Tool**: Vite
- **Node Version**: 16+

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx      # Search and filter bar
│   ├── ProductCard.jsx # Individual product card
│   └── ErrorDisplay.jsx# Error message component
├── pages/              # Page components
│   ├── ProductListPage.jsx    # Home page with product listing
│   └── ProductDetailsPage.jsx # Product detail page
├── redux/              # Redux store configuration
│   ├── store.js        # Redux store
│   ├── productSlice.js # Products state slice
│   └── filterSlice.js  # Filters state slice
├── styles/             # Styled components and styling
│   └── SkeletonStyles.jsx  # Skeleton loading components
├── utils/              # Utility functions
│   └── filterUtils.js  # Filter and formatting functions
├── App.jsx             # Main app component with routing
├── App.css             # Global styles
├── main.jsx            # React entry point
└── index.css           # Base styles
```

## Installation

1. Navigate to the project directory:
   ```bash
   cd d:\pankaj\Prevaj\ecom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Key Implementation Details

### Async Data Fetching
- Products are fetched from FakeStore API asynchronously
- Loading states are managed through Redux
- Error states are properly handled and displayed to users

### State Management with Redux
- **Products Slice**: Manages product data, loading states, and errors
- **Filters Slice**: Manages search term, category, and size selections
- All filter selections persist to localStorage

### Styling Strategy
- Global styles in `index.css`
- Component-scoped styling with Styled Components
- Responsive design with mobile-first approach
- Consistent color scheme and typography

### Performance Optimizations
- Lazy image loading with `loading="lazy"` attribute
- Efficient filtering logic
- Memoized selectors for Redux
- Light code splitting via Vite

### Component Hierarchy
```
App
├── BrowserRouter
├── Provider (Redux)
├── Routes
│   ├── ProductListPage
│   │   ├── Header
│   │   ├── ProductGrid
│   │   │   └── ProductCard (multiple)
│   │   └── ErrorDisplay (conditional)
│   └── ProductDetailsPage
│       ├── Header
│       ├── BackButton
│       ├── DetailsContainer
│       └── ErrorDisplay (conditional)
```

## API Integration

The application uses the [FakeStore API](https://fakestoreapi.com/) for product data:

- **Products Endpoint**: `https://fakestoreapi.com/products?limit=100`
- **Product Detail**: `https://fakestoreapi.com/products/{id}`
- **Categories**: `https://fakestoreapi.com/products/categories`

## localStorage Persistence

Filter selections are persisted to localStorage with the following keys:
- `searchTerm` - Current search query
- `selectedCategory` - Selected product category
- `selectedSize` - Selected product size

These values are restored on page refresh or navigation between pages.

## Features Implemented

✅ Product listing page with 100+ products
✅ Product details page with complete information
✅ Search functionality (filter by title)
✅ Category filter dropdown
✅ Size filter dropdown
✅ Skeleton loading screens
✅ Error handling and display
✅ Responsive design
✅ Redux state management
✅ React Router for navigation
✅ Styled Components for styling
✅ Functional components with Hooks
✅ localStorage persistence for filters
✅ Performance optimization (lazy loading, efficient filtering)

## Code Quality

- Clean, readable component code
- Proper separation of concerns
- Reusable utility functions
- Consistent naming conventions
- Comprehensive error handling
- Mobile-responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Shopping cart functionality
- User authentication
- Order history
- Product reviews and ratings
- Wishlist feature
- Payment integration
- Advanced filtering options
- Product recommendations

## License

This project is open source and available under the MIT License.

## Support

For any issues or questions, please refer to the component comments and Redux slice documentation in the source code.
