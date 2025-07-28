'use client';

import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';

// Styled Components
const LayoutContainer = styled.div<{ $transparent?: boolean }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme, $transparent }) => $transparent ? 'transparent' : theme.colors.background.default};
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`;

const ContentWrapper = styled.div<{ $maxWidth?: string; $padding?: boolean }>`
  max-width: ${({ $maxWidth }) => $maxWidth === 'none' ? 'none' : ($maxWidth || '1200px')};
  margin: ${({ $maxWidth }) => $maxWidth === 'none' ? '0' : '0 auto'};
  padding: ${({ theme, $padding = true }) => $padding ? `0 ${theme.spacing.lg}` : '0'};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme, $padding = true }) => $padding ? `0 ${theme.spacing.md}` : '0'};
  }
`;

// Layout Props
interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
  noPadding?: boolean;
  noHeader?: boolean;
  noFooter?: boolean;
  transparent?: boolean;
}

// Main Layout Component
export const Layout: React.FC<LayoutProps> = ({
  children,
  maxWidth,
  noPadding = false,
  noHeader = false,
  noFooter = false,
  transparent = false,
}) => {
  return (
    <LayoutContainer $transparent={transparent}>
      {!noHeader && <Header />}
      
      <MainContent id="main-content">
        <ContentWrapper $maxWidth={maxWidth} $padding={!noPadding}>
          {children}
        </ContentWrapper>
      </MainContent>
      
      {!noFooter && <Footer />}
    </LayoutContainer>
  );
};

export default Layout;