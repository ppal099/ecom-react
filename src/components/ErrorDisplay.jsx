import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background: #fee;
  border: 2px solid #f5a5a5;
  color: #c33;
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ErrorIcon = styled.span`
  font-size: 28px;
`;

const ErrorContent = styled.div`
  flex: 1;
`;

const ErrorTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 14px;
`;

const ErrorDisplay = ({ message, title = 'Error' }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorContent>
        <ErrorTitle>{title}</ErrorTitle>
        <ErrorMessage>
          {message || 'Something went wrong. Please try again later.'}
        </ErrorMessage>
      </ErrorContent>
    </ErrorContainer>
  );
};

export default ErrorDisplay;
