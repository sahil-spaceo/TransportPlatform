import React from 'react'
import { screen } from '@testing-library/react'
import { render, mockUsers, createMockAuthState } from '@/utils/test-utils'
import DashboardPage from '@/app/dashboard/page'
import ProfilePage from '@/app/profile/page'
import { Header } from '@/components/layout/Header'

/**
 * Defensive Programming Tests
 * 
 * These tests verify that the application handles edge cases and undefined
 * values gracefully, as implemented in the previous fixes for runtime errors
 * like "undefined is not an object (evaluating 'user.firstName[0]')"
 */

describe('Defensive Programming Patterns', () => {
  describe('Undefined User Property Handling', () => {
    it('handles undefined firstName in Header component', () => {
      const userWithoutFirstName = { 
        ...mockUsers.basic, 
        firstName: undefined 
      }
      
      render(<Header />, {
        initialAuthState: createMockAuthState(userWithoutFirstName, true)
      })
      
      // Should display 'U' as fallback for undefined firstName[0]
      expect(screen.getByText('UU')).toBeInTheDocument() // U + User initials
      expect(screen.getByText('User User')).toBeInTheDocument() // Default name display
    })

    it('handles undefined lastName in Header component', () => {
      const userWithoutLastName = { 
        ...mockUsers.basic, 
        lastName: undefined 
      }
      
      render(<Header />, {
        initialAuthState: createMockAuthState(userWithoutLastName, true)
      })
      
      // Should display 'BU' as fallback (Basic + undefined becomes U)
      expect(screen.getByText('BU')).toBeInTheDocument()
      expect(screen.getByText('Basic')).toBeInTheDocument() // Should handle missing lastName gracefully
    })

    it('handles completely undefined user names in Header', () => {
      const userWithoutNames = { 
        ...mockUsers.basic, 
        firstName: undefined,
        lastName: undefined 
      }
      
      render(<Header />, {
        initialAuthState: createMockAuthState(userWithoutNames, true)
      })
      
      // Should display 'UU' as fallback for both undefined names
      expect(screen.getByText('UU')).toBeInTheDocument()
      expect(screen.getByText('User')).toBeInTheDocument() // Default display name
    })

    it('handles undefined subscriptionTier in Header', () => {
      const userWithoutTier = { 
        ...mockUsers.basic, 
        subscriptionTier: undefined 
      }
      
      render(<Header />, {
        initialAuthState: createMockAuthState(userWithoutTier, true)
      })
      
      // Should default to 'basic' tier
      expect(screen.getByText('basic')).toBeInTheDocument()
    })
  })

  describe('Dashboard Defensive Patterns', () => {
    it('handles undefined firstName in Dashboard welcome message', () => {
      const userWithoutFirstName = { 
        ...mockUsers.basic, 
        firstName: undefined 
      }
      
      render(<DashboardPage />, {
        initialAuthState: createMockAuthState(userWithoutFirstName, true)
      })
      
      // Should display 'User' as fallback
      expect(screen.getByText('Welcome back, User!')).toBeInTheDocument()
    })

    it('handles undefined subscriptionTier in Dashboard', () => {
      const userWithoutTier = { 
        ...mockUsers.basic, 
        subscriptionTier: undefined 
      }
      
      render(<DashboardPage />, {
        initialAuthState: createMockAuthState(userWithoutTier, true)
      })
      
      // Should show default subscription banner
      expect(screen.getByText('🌟 Welcome to FlexFlow')).toBeInTheDocument()
      expect(screen.getByText('Choose a subscription plan to unlock premium features')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Choose Plan' })).toBeInTheDocument()
    })

    it('handles invalid subscriptionTier values in Dashboard', () => {
      const userWithInvalidTier = { 
        ...mockUsers.basic, 
        subscriptionTier: 'premium' as any // Invalid tier
      }
      
      render(<DashboardPage />, {
        initialAuthState: createMockAuthState(userWithInvalidTier, true)
      })
      
      // Should fallback to default case for invalid tier
      expect(screen.getByText('🌟 Welcome to FlexFlow')).toBeInTheDocument()
      expect(screen.getByText('Choose a subscription plan to unlock premium features')).toBeInTheDocument()
    })

    it('handles null user object in Dashboard', () => {
      render(<DashboardPage />, {
        initialAuthState: createMockAuthState(null, true)
      })
      
      // Component should return null and not crash
      expect(screen.queryByText(/Welcome back/)).not.toBeInTheDocument()
    })
  })

  describe('Profile Page Defensive Patterns', () => {
    it('handles undefined user names in Profile avatar', () => {
      const userWithoutNames = { 
        ...mockUsers.basic, 
        firstName: undefined,
        lastName: undefined 
      }
      
      render(<ProfilePage />, {
        initialAuthState: createMockAuthState(userWithoutNames, true)
      })
      
      // Should display 'UU' as fallback initials
      expect(screen.getByText('UU')).toBeInTheDocument()
      expect(screen.getByText('User')).toBeInTheDocument() // Default name
    })

    it('handles undefined email in Profile', () => {
      const userWithoutEmail = { 
        ...mockUsers.basic, 
        email: undefined 
      }
      
      render(<ProfilePage />, {
        initialAuthState: createMockAuthState(userWithoutEmail, true)
      })
      
      // Should display default email
      expect(screen.getByText('user@example.com')).toBeInTheDocument()
    })

    it('handles undefined subscriptionTier in Profile badge', () => {
      const userWithoutTier = { 
        ...mockUsers.basic, 
        subscriptionTier: undefined 
      }
      
      render(<ProfilePage />, {
        initialAuthState: createMockAuthState(userWithoutTier, true)
      })
      
      // Should default to 'basic' tier
      expect(screen.getByText('basic')).toBeInTheDocument()
    })

    it('handles null user object in Profile', () => {
      render(<ProfilePage />, {
        initialAuthState: createMockAuthState(null, true)
      })
      
      // Component should return null and not crash
      expect(screen.queryByText(/User/)).not.toBeInTheDocument()
    })
  })

  describe('Form Input Defensive Patterns', () => {
    it('handles undefined form values in Profile form', () => {
      const userWithUndefinedFields = { 
        ...mockUsers.basic,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
      }
      
      render(<ProfilePage />, {
        initialAuthState: createMockAuthState(userWithUndefinedFields, true)
      })
      
      // Form inputs should have fallback empty strings
      const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement
      const lastNameInput = screen.getByLabelText(/last name/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
      const phoneInput = screen.getByLabelText(/phone number/i) as HTMLInputElement
      
      expect(firstNameInput.value).toBe('')
      expect(lastNameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(phoneInput.value).toBe('')
    })
  })

  describe('Subscription Tier Type Safety', () => {
    it('handles invalid subscription tier in styled components', () => {
      const userWithInvalidTier = { 
        ...mockUsers.basic, 
        subscriptionTier: 'platinum' as any // Invalid tier
      }
      
      // Should not crash even with invalid tier
      expect(() => {
        render(<DashboardPage />, {
          initialAuthState: createMockAuthState(userWithInvalidTier, true)
        })
      }).not.toThrow()
    })

    it('handles undefined subscription tier in theme context', () => {
      const userWithUndefinedTier = { 
        ...mockUsers.basic, 
        subscriptionTier: undefined 
      }
      
      // Should not crash with undefined tier
      expect(() => {
        render(<Header />, {
          initialAuthState: createMockAuthState(userWithUndefinedTier, true)
        })
      }).not.toThrow()
      
      // Should display default tier
      expect(screen.getByText('basic')).toBeInTheDocument()
    })
  })

  describe('Array Access Safety', () => {
    it('safely accesses string characters for initials', () => {
      const userWithEmptyStrings = { 
        ...mockUsers.basic,
        firstName: '',
        lastName: '',
      }
      
      render(<Header />, {
        initialAuthState: createMockAuthState(userWithEmptyStrings, true)
      })
      
      // Should handle empty strings safely - ('' || 'U')[0] = 'U'
      expect(screen.getByText('UU')).toBeInTheDocument()
    })

    it('handles null strings for initials', () => {
      const userWithNullStrings = { 
        ...mockUsers.basic,
        firstName: null as any,
        lastName: null as any,
      }
      
      render(<Header />, {
        initialAuthState: createMockAuthState(userWithNullStrings, true)
      })
      
      // Should handle null values safely
      expect(screen.getByText('UU')).toBeInTheDocument()
    })
  })

  describe('Theme System Safety', () => {
    it('handles theme access for invalid tiers', () => {
      const userWithInvalidTier = { 
        ...mockUsers.basic, 
        subscriptionTier: 'invalid' as any
      }
      
      // Should not crash when accessing theme.colors.subscription[invalidTier]
      expect(() => {
        render(<DashboardPage />, {
          initialAuthState: createMockAuthState(userWithInvalidTier, true)
        })
      }).not.toThrow()
    })
  })

  describe('Navigation Safety', () => {
    it('handles navigation with undefined user context', () => {
      // Should handle undefined user in navigation items generation
      expect(() => {
        render(<Header />, {
          initialAuthState: createMockAuthState(undefined as any, false)
        })
      }).not.toThrow()
      
      // Should show guest navigation
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Services')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
    })
  })

  describe('Date Handling Safety', () => {
    it('handles invalid date strings', () => {
      const userWithInvalidDate = { 
        ...mockUsers.basic,
        createdAt: 'invalid-date',
      }
      
      // Should not crash with invalid date
      expect(() => {
        render(<ProfilePage />, {
          initialAuthState: createMockAuthState(userWithInvalidDate, true)
        })
      }).not.toThrow()
    })

    it('handles undefined createdAt date', () => {
      const userWithoutDate = { 
        ...mockUsers.basic,
        createdAt: undefined as any,
      }
      
      // Should not crash with undefined date
      expect(() => {
        render(<ProfilePage />, {
          initialAuthState: createMockAuthState(userWithoutDate, true)
        })
      }).not.toThrow()
    })
  })

  describe('Component Mount Safety', () => {
    it('handles rapid component mounting and unmounting', () => {
      // Test that components can be mounted/unmounted safely
      const { unmount } = render(<DashboardPage />, {
        initialAuthState: createMockAuthState(mockUsers.basic, true)
      })
      
      expect(() => {
        unmount()
      }).not.toThrow()
    })

    it('handles component re-rendering with changing props', () => {
      const { rerender } = render(<Header />, {
        initialAuthState: createMockAuthState(mockUsers.basic, true)
      })
      
      // Change user data
      expect(() => {
        rerender(<Header />)
      }).not.toThrow()
    })
  })
})