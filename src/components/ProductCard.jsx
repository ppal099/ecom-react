import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { truncateDescription, formatPrice } from '../utils/filterUtils';

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 240px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ContentContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.3;
  color: #333;
`;

const Description = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.4;
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #27ae60;
`;

const Category = styled.span`
  font-size: 11px;
  background: #ecf0f1;
  color: #555;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: capitalize;
`;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.title} loading="lazy" />
      </ImageContainer>
      <ContentContainer>
        <Title title={product.title}>{product.title}</Title>
        <Description>{truncateDescription(product.description, 80)}</Description>
        <PriceContainer>
          <Price>{formatPrice(product.price)}</Price>
          <Category>{product.category}</Category>
        </PriceContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProductCard;
