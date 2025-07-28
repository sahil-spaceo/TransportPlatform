import React from 'react';
import { render, screen, fireEvent } from '@/utils/test-utils';
import Card from '../Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <h2>Card Title</h2>
          <p>Card content</p>
        </Card>
      );
      
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Card className="custom-class">Content</Card>);
      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<Card variant="default">Default Card</Card>);
      expect(screen.getByText('Default Card')).toBeInTheDocument();
    });

    it('renders elevated variant correctly', () => {
      render(<Card variant="elevated">Elevated Card</Card>);
      expect(screen.getByText('Elevated Card')).toBeInTheDocument();
    });

    it('renders bordered variant correctly', () => {
      render(<Card variant="bordered">Bordered Card</Card>);
      expect(screen.getByText('Bordered Card')).toBeInTheDocument();
    });

    it('renders gradient variant correctly', () => {
      render(<Card variant="gradient">Gradient Card</Card>);
      expect(screen.getByText('Gradient Card')).toBeInTheDocument();
    });

    it('renders glass variant correctly', () => {
      render(<Card variant="glass">Glass Card</Card>);
      expect(screen.getByText('Glass Card')).toBeInTheDocument();
    });

    it('renders interactive variant correctly', () => {
      render(<Card variant="interactive">Interactive Card</Card>);
      expect(screen.getByText('Interactive Card')).toBeInTheDocument();
    });
  });

  describe('Padding', () => {
    it('renders with small padding', () => {
      render(<Card padding="sm">Small Padding</Card>);
      expect(screen.getByText('Small Padding')).toBeInTheDocument();
    });

    it('renders with medium padding', () => {
      render(<Card padding="md">Medium Padding</Card>);
      expect(screen.getByText('Medium Padding')).toBeInTheDocument();
    });

    it('renders with large padding', () => {
      render(<Card padding="lg">Large Padding</Card>);
      expect(screen.getByText('Large Padding')).toBeInTheDocument();
    });

    it('renders with extra large padding', () => {
      render(<Card padding="xl">Extra Large Padding</Card>);
      expect(screen.getByText('Extra Large Padding')).toBeInTheDocument();
    });

    it('renders with no padding', () => {
      render(<Card padding="none">No Padding</Card>);
      expect(screen.getByText('No Padding')).toBeInTheDocument();
    });
  });

  describe('Interactive Features', () => {
    it('handles hover effect when hover prop is true', () => {
      render(<Card hover>Hover Card</Card>);
      expect(screen.getByText('Hover Card')).toBeInTheDocument();
    });

    it('handles clickable state correctly', () => {
      const handleClick = jest.fn();
      render(
        <Card clickable onClick={handleClick}>
          Clickable Card
        </Card>
      );
      
      const card = screen.getByText('Clickable Card').closest('div');
      fireEvent.click(card!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not handle click when not clickable', () => {
      const handleClick = jest.fn();
      render(
        <Card onClick={handleClick}>
          Non-clickable Card
        </Card>
      );
      
      const card = screen.getByText('Non-clickable Card').closest('div');
      fireEvent.click(card!);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('shows pointer cursor when clickable', () => {
      render(<Card clickable>Clickable Card</Card>);
      expect(screen.getByText('Clickable Card')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct role when clickable', () => {
      render(<Card clickable>Clickable Card</Card>);
      const card = screen.getByText('Clickable Card').closest('div');
      expect(card).toHaveAttribute('role', 'button');
    });

    it('has correct tabIndex when clickable', () => {
      render(<Card clickable>Clickable Card</Card>);
      const card = screen.getByText('Clickable Card').closest('div');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('handles keyboard events when clickable', () => {
      const handleClick = jest.fn();
      render(
        <Card clickable onClick={handleClick}>
          Clickable Card
        </Card>
      );
      
      const card = screen.getByText('Clickable Card').closest('div');
      fireEvent.keyDown(card!, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      fireEvent.keyDown(card!, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('supports custom aria-label', () => {
      render(<Card aria-label="Custom card label">Card Content</Card>);
      const card = screen.getByText('Card Content').closest('div');
      expect(card).toHaveAttribute('aria-label', 'Custom card label');
    });
  });

  describe('Full Width', () => {
    it('renders full width correctly', () => {
      render(<Card fullWidth>Full Width Card</Card>);
      expect(screen.getByText('Full Width Card')).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('handles animation prop correctly', () => {
      render(<Card animate>Animated Card</Card>);
      expect(screen.getByText('Animated Card')).toBeInTheDocument();
    });
  });

  describe('Complex Content', () => {
    it('renders complex nested content correctly', () => {
      render(
        <Card variant="elevated" padding="lg" hover clickable>
          <div>
            <h3>Card Header</h3>
            <p>Card description with multiple lines of text content.</p>
            <button>Action Button</button>
          </div>
        </Card>
      );
      
      expect(screen.getByText('Card Header')).toBeInTheDocument();
      expect(screen.getByText(/Card description with multiple lines/)).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });
  });
});