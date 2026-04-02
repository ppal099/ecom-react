import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ErrorDisplay from '../components/ErrorDisplay';
import { SkeletonProductDetail } from '../styles/SkeletonStyles.jsx';
import { fetchProductById, fetchCategories } from '../redux/productSlice';
import { formatPrice, getProductSize, SIZES } from '../utils/filterUtils';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(-5px);
  }
`;

const DetailContainer = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 8px;
  min-height: 500px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Category = styled.span`
  display: inline-block;
  background: #e8f4f8;
  color: #0077b6;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 15px;
  width: fit-content;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin: 15px 0;
  line-height: 1.3;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
`;

const Stars = styled.span`
  color: #ffc107;
  font-size: 14px;
`;

const PriceTag = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #27ae60;
  margin: 20px 0;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin: 20px 0;
`;

const SpecsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 30px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const Spec = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecLabel = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  color: #666;
  font-weight: 600;
  margin-bottom: 5px;
`;

const SpecValue = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 15px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct, categories, loadingDetail, errorDetail } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id && (!selectedProduct || selectedProduct.id !== parseInt(id))) {
      dispatch(fetchProductById(id));
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, id, selectedProduct, categories.length]);

  if (loadingDetail) {
    return (
      <PageContainer>
        <Header categories={categories} />
        <ContentWrapper>
          <BackButton onClick={() => navigate('/')}>← Back to Products</BackButton>
          <SkeletonProductDetail />
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (errorDetail) {
    return (
      <PageContainer>
        <Header categories={categories} />
        <ContentWrapper>
          <BackButton onClick={() => navigate('/')}>← Back to Products</BackButton>
          <ErrorDisplay
            title="Failed to Load Product"
            message={errorDetail || 'Unable to fetch product details. Please try again.'}
          />
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (!selectedProduct) {
    return (
      <PageContainer>
        <Header categories={categories} />
        <ContentWrapper>
          <BackButton onClick={() => navigate('/')}>← Back to Products</BackButton>
          <ErrorDisplay
            title="Product Not Found"
            message="The product you are looking for does not exist."
          />
        </ContentWrapper>
      </PageContainer>
    );
  }

  const size = getProductSize(selectedProduct.id);
  const availableSizes = SIZES;

  return (
    <PageContainer>
      <Header categories={categories} />
      <ContentWrapper>
        <BackButton onClick={() => navigate('/')}>← Back to Products</BackButton>
        <DetailContainer>
          <ImageContainer>
            <ProductImage
              src={selectedProduct.image}
              alt={selectedProduct.title}
            />
          </ImageContainer>
          <DetailsSection>
            <Category>{selectedProduct.category}</Category>
            <Title>{selectedProduct.title}</Title>
            <RatingContainer>
              <Stars>★★★★☆</Stars>
              <span>(4.5/5 - 128 reviews)</span>
            </RatingContainer>
            <PriceTag>{formatPrice(selectedProduct.price)}</PriceTag>
            <Description>{selectedProduct.description}</Description>

            <SpecsContainer>
              <Spec>
                <SpecLabel>Available Size</SpecLabel>
                <SpecValue>{size}</SpecValue>
              </Spec>
              <Spec>
                <SpecLabel>Available Sizes</SpecLabel>
                <SpecValue>{availableSizes.join(', ')}</SpecValue>
              </Spec>
              <Spec>
                <SpecLabel>Stock Status</SpecLabel>
                <SpecValue style={{ color: '#27ae60' }}>In Stock</SpecValue>
              </Spec>
              <Spec>
                <SpecLabel>Shipping</SpecLabel>
                <SpecValue>Free Worldwide Shipping</SpecValue>
              </Spec>
            </SpecsContainer>

            <ActionContainer>
              <AddToCartButton>
                🛒 Add to Cart
              </AddToCartButton>
            </ActionContainer>
          </DetailsSection>
        </DetailContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ProductDetailsPage;
