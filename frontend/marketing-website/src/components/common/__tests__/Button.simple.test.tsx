import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { marketingTheme } from '@/styles/theme';

// Simple test component
const SimpleButton = ({ children, ...props }: { children: React.ReactNode }) => (
  <button {...props}>{children}</button>
);

describe('Simple Button Component', () => {
  it('renders with text', () => {
    render(
      <ThemeProvider theme={marketingTheme}>
        <SimpleButton>Click me</SimpleButton>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with role button', () => {
    render(
      <ThemeProvider theme={marketingTheme}>
        <SimpleButton>Test Button</SimpleButton>
      </ThemeProvider>
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});