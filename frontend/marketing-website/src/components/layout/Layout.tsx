import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  headerTransparent?: boolean;
  headerFixed?: boolean;
  headerCTAVariant?: 'primary' | 'secondary';
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  headerTransparent = false,
  headerFixed = true,
  headerCTAVariant = 'primary',
  showFooter = true,
}) => {
  return (
    <LayoutContainer>
      <Header
        transparent={headerTransparent}
        fixed={headerFixed}
        ctaVariant={headerCTAVariant}
      />
      <MainContent $headerFixed={headerFixed}>
        {children}
      </MainContent>
      {showFooter && <Footer />}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main<{ $headerFixed: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${({ $headerFixed }) => $headerFixed && `
    padding-top: 80px;
  `}
`;

export default Layout;