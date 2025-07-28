import React from 'react';
import styled from 'styled-components';
import type { BreadcrumbItem } from '@/types/theme.types';

interface MainContentProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
  autoRefresh?: boolean;
  lastUpdated?: Date;
}

const MainContent: React.FC<MainContentProps> = ({
  title,
  breadcrumbs,
  actions,
  children,
  isLoading = false,
  autoRefresh = false,
  lastUpdated,
}) => {
  return (
    <ContentContainer>
      <ContentHeader>
        <HeaderTop>
          <HeaderLeft>
            <Breadcrumbs>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={index}>
                  {crumb.icon && <BreadcrumbIcon $icon={crumb.icon} />}
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbText>{crumb.label}</BreadcrumbText>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
            <PageTitle className="gradient-text">{title}</PageTitle>
          </HeaderLeft>
          
          <HeaderRight>
            {lastUpdated && (
              <LastUpdated>
                <UpdateIcon $autoRefresh={autoRefresh} />
                <UpdateText>
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </UpdateText>
              </LastUpdated>
            )}
            {actions && <ActionsContainer>{actions}</ActionsContainer>}
          </HeaderRight>
        </HeaderTop>
        
        {isLoading && <LoadingBar />}
      </ContentHeader>

      <ContentBody $isLoading={isLoading}>
        {children}
      </ContentBody>
    </ContentContainer>
  );
};

const ContentContainer = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.default};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
`;

const ContentHeader = styled.div`
  position: sticky;
  top: 72px;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: ${({ theme }) => theme.colors.background.paper};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const BreadcrumbIcon = styled.div<{ $icon: string }>`
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.colors.text.tertiary};
  mask: ${({ $icon }) => `url("/icons/${$icon}.svg") no-repeat center`};
  mask-size: contain;
`;

const BreadcrumbLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: underline;
  }
`;

const BreadcrumbText = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const BreadcrumbSeparator = styled.div`
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.colors.text.tertiary};
  mask: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m9 18 6-6-6-6' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e") no-repeat center;
  mask-size: contain;
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const LastUpdated = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.solid.neutral[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const UpdateIcon = styled.div<{ $autoRefresh: boolean }>`
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.colors.text.secondary};
  mask: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1 4v6h6M23 20v-6h-6' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='m20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e") no-repeat center;
  mask-size: contain;
  animation: ${({ $autoRefresh }) => $autoRefresh ? 'spin 2s linear infinite' : 'none'};

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const UpdateText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-wrap: wrap;
  }
`;

const LoadingBar = styled.div`
  height: 3px;
  background: ${({ theme }) => theme.colors.gradients.primary};
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const ContentBody = styled.div<{ $isLoading: boolean }>`
  padding: ${({ theme }) => theme.spacing.xl};
  opacity: ${({ $isLoading }) => $isLoading ? 0.7 : 1};
  transition: opacity ${({ theme }) => theme.animations.duration.normal};
  min-height: calc(100vh - 200px);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export default MainContent;