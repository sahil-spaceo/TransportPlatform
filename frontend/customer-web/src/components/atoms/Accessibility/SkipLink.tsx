'use client';

import React from 'react';
import styled from 'styled-components';

// Styled Skip Link Component
const StyledSkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 8px;
  z-index: ${({ theme }) => theme.zIndex.skipLink};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary.gradient};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all ${({ theme }) => theme.animations.duration.fast} ${({ theme }) => theme.animations.easing.standard};
  opacity: 0;
  pointer-events: none;

  /* Show on focus */
  &:focus {
    top: 8px;
    opacity: 1;
    pointer-events: auto;
    outline: 2px solid ${({ theme }) => theme.colors.neutral.white};
    outline-offset: 2px;
  }

  /* Hover effect when visible */
  &:focus:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.heavy};
  }

  /* High contrast mode */
  .high-contrast & {
    background: #000000;
    color: #ffffff;
    border: 2px solid #ffffff;
  }

  /* Large text mode */
  .large-text & {
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  }
`;

// Skip Link Props Interface
export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Skip Link Component
export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent default anchor behavior
    event.preventDefault();
    
    // Custom click handler
    if (onClick) {
      onClick(event);
      return;
    }

    // Default behavior - focus on target element
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Make element focusable if it's not already
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
      }
      
      // Focus the target element
      targetElement.focus();
      
      // Scroll into view
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Remove tabindex after focus (for semantic elements)
      if (targetElement.getAttribute('tabindex') === '-1') {
        setTimeout(() => {
          targetElement.removeAttribute('tabindex');
        }, 100);
      }
    }
  };

  return (
    <StyledSkipLink
      href={href}
      className={className}
      onClick={handleClick}
      role="link"
      aria-label={`Skip to ${children}`}
    >
      {children}
    </StyledSkipLink>
  );
};

// Skip Links Container
const SkipLinksContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.skipLink};
  width: 100%;
  pointer-events: none;

  /* Allow pointer events for focused links */
  & > * {
    pointer-events: auto;
  }
`;

// Skip Links Group Component
export interface SkipLinksProps {
  links: Array<{
    href: string;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  }>;
  className?: string;
}

export const SkipLinks: React.FC<SkipLinksProps> = ({
  links,
  className,
}) => {
  return (
    <SkipLinksContainer className={className}>
      {links.map((link, index) => (
        <SkipLink
          key={`skip-link-${index}`}
          href={link.href}
          onClick={link.onClick}
        >
          {link.label}
        </SkipLink>
      ))}
    </SkipLinksContainer>
  );
};

export default SkipLink;