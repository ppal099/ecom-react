import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  setSearchTerm,
  setSelectedCategory,
  setSelectedSize,
  clearFilters,
} from '../redux/filterSlice';
import { SIZES } from '../utils/filterUtils';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0 0 20px 0;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  min-width: 200px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterSelect = styled.select`
  padding: 12px 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  color: #333;
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ClearButton = styled.button`
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = ({ categories = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchTerm, selectedCategory, selectedSize } = useSelector(
    (state) => state.filters
  );

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleSizeChange = (e) => {
    dispatch(setSelectedSize(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={handleLogoClick}>🛍️ E-Commerce Store</Logo>
        <FilterContainer>
          <SearchInput
            type="text"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <FilterSelect
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect value={selectedSize} onChange={handleSizeChange}>
            <option value="">All Sizes</option>
            {SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </FilterSelect>

          <ClearButton onClick={handleClearFilters}>Clear Filters</ClearButton>
        </FilterContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
