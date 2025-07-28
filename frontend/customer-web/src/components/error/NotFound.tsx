'use client';

import React from 'react';
import styled from 'styled-components';
import { Layout } from '@/components/layout/Layout';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { GradientCard } from '@/components/atoms/Card/GradientCard';

// Styled Components
const NotFoundContainer = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const NotFoundContent = styled.div`
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const NotFoundIcon = styled.div`
  font-size: 6rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.functional.warning.main};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 4rem;
  }
`;

const NotFoundMessage = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodyLarge};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const NotFoundSubtext = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.md} 0 ${({ theme }) => theme.spacing.xl};
  opacity: 0.8;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
`;

const SuggestionCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const SuggestionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SuggestionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h6};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const SuggestionDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

// Suggestions data
const suggestions = [
  {
    icon: '🏠',
    title: 'Go Home',
    description: 'Return to our homepage and explore our services',
    href: '/',
  },
  {
    icon: '🚕',
    title: 'Book a Ride',
    description: 'Quick access to our ride booking service',
    href: '/services/rides',
  },
  {
    icon: '🍕',
    title: 'Order Food',
    description: 'Browse restaurants and order your favorites',
    href: '/services/food',
  },
  {
    icon: '📞',
    title: 'Contact Support',
    description: 'Get help from our customer service team',
    href: '/contact',
  },
];

// NotFound Component Props
interface NotFoundProps {
  title?: string;
  message?: string;
  showSuggestions?: boolean;
  showBackButton?: boolean;
}

// Main NotFound Component
export const NotFound: React.FC<NotFoundProps> = ({
  title = "404 - Page Not Found",
  message = "Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.",
  showSuggestions = true,
  showBackButton = true,
}) => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleSuggestionClick = (href: string) => {
    window.location.href = href;
  };

  return (
    <Layout>
      <NotFoundContainer>
        <NotFoundContent>
          <GradientCard variant="elevated">
            <NotFoundIcon>🔍</NotFoundIcon>
            
            <GradientHeading 
              level="h1" 
              gradient="primary" 
              align="center"
              style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
            >
              {title}
            </GradientHeading>
            
            <NotFoundMessage>
              {message}
            </NotFoundMessage>

            <NotFoundSubtext>
              Don't worry, it happens to the best of us. Let's get you back on track!
            </NotFoundSubtext>

            <ButtonGroup>
              <GradientButton
                variant="primary"
                size="large"
                onClick={handleGoHome}
              >
                🏠 Go to Homepage
              </GradientButton>
              
              {showBackButton && (
                <GradientButton
                  variant="outline"
                  size="large"
                  onClick={handleGoBack}
                >
                  ← Go Back
                </GradientButton>
              )}
              
              <GradientButton
                variant="ghost"
                size="large"
                onClick={() => handleSuggestionClick('/contact')}
              >
                📞 Contact Support
              </GradientButton>
            </ButtonGroup>
          </GradientCard>

          {showSuggestions && (
            <SuggestionsGrid>
              {suggestions.map((suggestion, index) => (
                <SuggestionCard
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.href)}
                >
                  <SuggestionIcon>{suggestion.icon}</SuggestionIcon>
                  <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                  <SuggestionDescription>{suggestion.description}</SuggestionDescription>
                </SuggestionCard>
              ))}
            </SuggestionsGrid>
          )}
        </NotFoundContent>
      </NotFoundContainer>
    </Layout>
  );
};

export default NotFound;