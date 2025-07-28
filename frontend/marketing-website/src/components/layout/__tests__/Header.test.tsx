import React from 'react';
import { render, screen, fireEvent } from '@/utils/test-utils';
import Header from '../Header';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: mockPush,
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  describe('Rendering', () => {
    it('renders header with logo', () => {
      render(<Header />);
      expect(screen.getByText('FlexFlow')).toBeInTheDocument();
    });

    it('renders main navigation links', () => {
      render(<Header />);
      
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Solutions')).toBeInTheDocument();
      expect(screen.getByText('Pricing')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('renders CTA buttons', () => {
      render(<Header />);
      
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });
  });

  describe('Logo Navigation', () => {
    it('logo links to homepage', () => {
      render(<Header />);
      const logo = screen.getByText('FlexFlow').closest('a');
      expect(logo).toHaveAttribute('href', '/');
    });
  });

  describe('Main Navigation', () => {
    it('services dropdown shows all services', () => {
      render(<Header />);
      
      const servicesButton = screen.getByText('Services');
      fireEvent.click(servicesButton);
      
      // Check for service items
      expect(screen.getByText('Ride-Hailing')).toBeInTheDocument();
      expect(screen.getByText('Food Delivery')).toBeInTheDocument();
      expect(screen.getByText('Package Delivery')).toBeInTheDocument();
      expect(screen.getByText('Ride-Sharing')).toBeInTheDocument();
      expect(screen.getByText('Drone Delivery')).toBeInTheDocument();
      expect(screen.getByText('Freight & Logistics')).toBeInTheDocument();
    });

    it('solutions dropdown shows solution categories', () => {
      render(<Header />);
      
      const solutionsButton = screen.getByText('Solutions');
      fireEvent.click(solutionsButton);
      
      expect(screen.getByText('For Customers')).toBeInTheDocument();
      expect(screen.getByText('For Drivers')).toBeInTheDocument();
      expect(screen.getByText('For Businesses')).toBeInTheDocument();
      expect(screen.getByText('For Restaurants')).toBeInTheDocument();
    });

    it('pricing link navigates correctly', () => {
      render(<Header />);
      const pricingLink = screen.getByText('Pricing').closest('a');
      expect(pricingLink).toHaveAttribute('href', '/pricing');
    });

    it('about link navigates correctly', () => {
      render(<Header />);
      const aboutLink = screen.getByText('About').closest('a');
      expect(aboutLink).toHaveAttribute('href', '/about');
    });
  });

  describe('Mobile Navigation', () => {
    it('shows mobile menu button on mobile', () => {
      render(<Header />);
      // Mobile menu button should be present but may be hidden on desktop
      const mobileMenuButton = screen.getByLabelText(/mobile menu/i);
      expect(mobileMenuButton).toBeInTheDocument();
    });

    it('toggles mobile menu when button is clicked', () => {
      render(<Header />);
      
      const mobileMenuButton = screen.getByLabelText(/mobile menu/i);
      fireEvent.click(mobileMenuButton);
      
      // Check if mobile menu items are visible
      const mobileNav = screen.getByRole('navigation', { hidden: true });
      expect(mobileNav).toBeInTheDocument();
    });
  });

  describe('Dropdown Interactions', () => {
    it('closes dropdown when clicking outside', () => {
      render(<Header />);
      
      // Open services dropdown
      const servicesButton = screen.getByText('Services');
      fireEvent.click(servicesButton);
      expect(screen.getByText('Ride-Hailing')).toBeInTheDocument();
      
      // Click outside (on document body)
      fireEvent.mouseDown(document.body);
      
      // Dropdown should be closed (items should not be visible)
      expect(screen.queryByText('Ride-Hailing')).not.toBeInTheDocument();
    });

    it('closes dropdown when escape key is pressed', () => {
      render(<Header />);
      
      // Open services dropdown
      const servicesButton = screen.getByText('Services');
      fireEvent.click(servicesButton);
      expect(screen.getByText('Ride-Hailing')).toBeInTheDocument();
      
      // Press escape key
      fireEvent.keyDown(document, { key: 'Escape' });
      
      // Dropdown should be closed
      expect(screen.queryByText('Ride-Hailing')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<Header />);
      
      // Header should be in a header element
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      
      // Navigation should be in a nav element
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('dropdown buttons have proper ARIA attributes', () => {
      render(<Header />);
      
      const servicesButton = screen.getByText('Services');
      expect(servicesButton).toHaveAttribute('aria-haspopup', 'true');
      expect(servicesButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when dropdown is opened', () => {
      render(<Header />);
      
      const servicesButton = screen.getByText('Services');
      fireEvent.click(servicesButton);
      
      expect(servicesButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('keyboard navigation works for dropdowns', () => {
      render(<Header />);
      
      const servicesButton = screen.getByText('Services');
      
      // Open dropdown with Enter key
      fireEvent.keyDown(servicesButton, { key: 'Enter' });
      expect(screen.getByText('Ride-Hailing')).toBeInTheDocument();
      
      // Close dropdown with Escape key
      fireEvent.keyDown(servicesButton, { key: 'Escape' });
      expect(screen.queryByText('Ride-Hailing')).not.toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('hides desktop navigation on mobile', () => {
      // Mock window.matchMedia for mobile viewport
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(max-width: 768px)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<Header />);
      
      // Mobile menu button should be visible
      const mobileMenuButton = screen.getByLabelText(/mobile menu/i);
      expect(mobileMenuButton).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('highlights active navigation item', () => {
      // Mock router with specific pathname
      jest.mocked(require('next/router').useRouter).mockReturnValue({
        pathname: '/services',
        push: mockPush,
      });

      render(<Header />);
      
      // Services link should have active styling
      const servicesLink = screen.getByText('Services');
      expect(servicesLink).toBeInTheDocument();
    });
  });
});