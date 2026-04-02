import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import ErrorDisplay from '../components/ErrorDisplay';
import { SkeletonWrapper, SkeletonProductCard } from '../styles/SkeletonStyles.jsx';
import { fetchProducts, fetchCategories } from '../redux/productSlice';
import { filterProducts } from '../utils/filterUtils';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const NoResultsContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  grid-column: 1 / -1;
`;

const NoResultsIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const NoResultsText = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const ProductListPage = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    categories,
    loading,
    error,
  } = useSelector((state) => state.products);
  const { searchTerm, selectedCategory, selectedSize } = useSelector(
    (state) => state.filters
  );

  // Fetch products and categories on mount
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, products.length, categories.length]);

  // Filter products based on search and filters
  const filteredProducts = filterProducts(
    products,
    searchTerm,
    selectedCategory,
    selectedSize
  );

  // Show loading skeleton
  if (loading && products.length === 0) {
    return (
      <PageContainer>
        <Header categories={categories} />
        <ContentWrapper>
          <LoadingContainer>
            {[...Array(12)].map((_, index) => (
              <div key={index}>
                <SkeletonProductCard />
              </div>
            ))}
          </LoadingContainer>
        </ContentWrapper>
      </PageContainer>
    );
  }

  // Show error if any
  if (error && products.length === 0) {
    return (
      <PageContainer>
        <Header categories={categories} />
        <ContentWrapper>
          <ErrorDisplay
            title="Failed to Load Products"
            message={error || 'Unable to fetch products. Please try again later.'}
          />
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header categories={categories} />
      <ContentWrapper>
        {filteredProducts.length > 0 ? (
          <>
            <div>
              Showing {filteredProducts.length} of {products.length} products
            </div>
            <ProductGrid>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </>
        ) : (
          <ProductGrid>
            <NoResultsContainer>
              <NoResultsIcon>🔍</NoResultsIcon>
              <NoResultsText>
                No products found matching your criteria. Try adjusting your
                filters.
              </NoResultsText>
            </NoResultsContainer>
          </ProductGrid>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ProductListPage;
