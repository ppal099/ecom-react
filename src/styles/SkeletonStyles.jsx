import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1200px 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

export const SkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
`;

export const SkeletonCard = styled.div`
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 1200px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

export const SkeletonImage = styled(SkeletonCard)`
  width: 100%;
  height: 240px;
  margin-bottom: 10px;
`;

export const SkeletonTitle = styled(SkeletonCard)`
  width: 90%;
  height: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export const SkeletonText = styled(SkeletonCard)`
  width: 100%;
  height: 16px;
  margin-bottom: 5px;
  border-radius: 4px;
`;

export const SkeletonPrice = styled(SkeletonCard)`
  width: 60%;
  height: 24px;
  border-radius: 4px;
`;

// Loading skeleton for product list
export const SkeletonProductCard = () => (
  <div style={{ marginBottom: '20px' }}>
    <SkeletonImage />
    <SkeletonTitle />
    <SkeletonText style={{ width: '100%' }} />
    <SkeletonText style={{ width: '85%' }} />
    <SkeletonPrice />
  </div>
);

// Loading skeleton for product details
export const SkeletonDetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const SkeletonDetailImage = styled(SkeletonCard)`
  width: 100%;
  height: 500px;
  border-radius: 8px;
`;

export const SkeletonDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SkeletonDetailTitle = styled(SkeletonCard)`
  width: 80%;
  height: 32px;
  border-radius: 4px;
`;

export const SkeletonDetailText = styled(SkeletonCard)`
  width: 100%;
  height: 18px;
  border-radius: 4px;
`;

export const SkeletonDetailDescription = styled(SkeletonCard)`
  width: 100%;
  height: 120px;
  border-radius: 4px;
`;

export const SkeletonProductDetail = () => (
  <SkeletonDetailWrapper>
    <SkeletonDetailImage />
    <SkeletonDetailContent>
      <SkeletonDetailTitle />
      <SkeletonDetailText style={{ width: '50%' }} />
      <SkeletonDetailText style={{ width: '40%' }} />
      <SkeletonDetailDescription />
      <SkeletonDetailText style={{ width: '30%', height: '28px' }} />
    </SkeletonDetailContent>
  </SkeletonDetailWrapper>
);
