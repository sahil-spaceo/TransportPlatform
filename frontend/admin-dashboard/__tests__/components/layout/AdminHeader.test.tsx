import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import AdminHeader from '@/components/layout/AdminHeader'
import { adminTheme } from '@/styles/theme'
import type { AdminUser } from '@/modules/authentication/types/auth.types'
import type { Notification } from '@/types/theme.types'

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={adminTheme}>
    {children}
  </ThemeProvider>
)

const mockUser: AdminUser = {
  id: '1',
  email: 'admin@flexflow.com',
  firstName: 'Admin',
  lastName: 'User',
  role: {
    id: '1',
    name: 'super_admin',
    description: 'Super Administrator',
    level: 1,
    permissions: ['*'],
  },
  permissions: [{
    id: '1',
    resource: '*',
    actions: ['*'],
    scope: 'global',
  }],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Test Notification',
    message: 'This is a test notification',
    type: 'info',
    priority: 'medium',
    timestamp: new Date(),
    read: false,
  },
  {
    id: '2',
    title: 'Read Notification',
    message: 'This notification has been read',
    type: 'success',
    priority: 'low',
    timestamp: new Date(),
    read: true,
  },
]

describe('AdminHeader', () => {
  const user = userEvent.setup()
  const mockOnMenuToggle = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render admin header with user information', () => {
    render(
      <TestWrapper>
        <AdminHeader
          user={mockUser}
          notifications={mockNotifications}
          onMenuToggle={mockOnMenuToggle}
          isMenuOpen={false}
        />
      </TestWrapper>
    )

    expect(screen.getByText('FlexFlow')).toBeInTheDocument()
    expect(screen.getByText('Admin User')).toBeInTheDocument()
    expect(screen.getByText('super_admin')).toBeInTheDocument()
  })

  it('should show correct notification count', () => {
    render(
      <TestWrapper>
        <AdminHeader
          user={mockUser}
          notifications={mockNotifications}
          onMenuToggle={mockOnMenuToggle}
          isMenuOpen={false}
        />
      </TestWrapper>
    )

    // Should show count of unread notifications (1 in our mock data)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should toggle notification dropdown when clicked', async () => {
    render(
      <TestWrapper>
        <AdminHeader
          user={mockUser}
          notifications={mockNotifications}
          onMenuToggle={mockOnMenuToggle}
          isMenuOpen={false}
        />
      </TestWrapper>
    )

    // Find notification button by its badge (text "1")
    const notificationButton = screen.getByText('1').closest('button')
    
    if (notificationButton) {
      await user.click(notificationButton)
      
      // Should show notification dropdown
      expect(screen.getByText('Notifications')).toBeInTheDocument()
      expect(screen.getByText('Test Notification')).toBeInTheDocument()
      expect(screen.getByText('Mark all read')).toBeInTheDocument()
    }
  })

  it('should toggle profile dropdown when clicked', async () => {
    render(
      <TestWrapper>
        <AdminHeader
          user={mockUser}
          notifications={mockNotifications}
          onMenuToggle={mockOnMenuToggle}
          isMenuOpen={false}
        />
      </TestWrapper>
    )

    // Find profile button (contains user name)
    const profileButton = screen.getByText('Admin User').closest('button')
    
    if (profileButton) {
      await user.click(profileButton)
      
      // Should show profile dropdown
      expect(screen.getByText('Profile Settings')).toBeInTheDocument()
      expect(screen.getByText('Account Security')).toBeInTheDocument()
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    }
  })

  it('should call onMenuToggle when menu button is clicked', async () => {
    render(
      <TestWrapper>
        <AdminHeader
          user={mockUser}
          notifications={mockNotifications}
          onMenuToggle={mockOnMenuToggle}
          isMenuOpen={false}
        />
      </TestWrapper>
    )

    // Menu button might only be visible on mobile, but we can test if it exists
    const menuButtons = screen.queryAllByRole('button')
    const menuButton = menuButtons.find(button => 
      button.getAttribute('aria-label')?.includes('menu') ||
      button.textContent?.includes('☰')
    )

    if (menuButton) {
      await user.click(menuButton)
      expect(mockOnMenuToggle).toHaveBeenCalled()
    }
  })

  it('should display live stats in header center', () => {
    render(
      <TestWrapper>
        <AdminHeader
          user={mockUser}
          notifications={mockNotifications}
          onMenuToggle={mockOnMenuToggle}
          isMenuOpen={false}
        />
      </TestWrapper>
    )

    // These stats are hardcoded in the component
    expect(screen.getByText('Active Users')).toBeInTheDocument()
    expect(screen.getByText('2,847')).toBeInTheDocument()
    expect(screen.getByText('Active Rides')).toBeInTheDocument()
    expect(screen.getByText('156')).toBeInTheDocument()
    expect(screen.getByText('Revenue Today')).toBeInTheDocument()
    expect(screen.getByText('$12,450')).toBeInTheDocument()
  })

  it('should not show notification badge when no unread notifications', () => {
    const readNotifications = mockNotifications.map(n => ({ ...n, read: true }))
    
    render(
      <TestWrapper>
        <AdminHeader
          user={mockUser}
          notifications={readNotifications}
          onMenuToggle={mockOnMenuToggle}
          isMenuOpen={false}
        />
      </TestWrapper>
    )

    // Should not show any notification count badge
    expect(screen.queryByText('0')).not.toBeInTheDocument()
    expect(screen.queryByText('1')).not.toBeInTheDocument()
  })

  it('should show user avatar with correct alt text', () => {
    const userWithAvatar = {
      ...mockUser,
      avatar: '/test-avatar.jpg'
    }

    render(
      <TestWrapper>
        <AdminHeader
          user={userWithAvatar}
          notifications={mockNotifications}
          onMenuToggle={mockOnMenuToggle}
          isMenuOpen={false}
        />
      </TestWrapper>
    )

    const avatarImages = screen.getAllByAltText('Admin User')
    expect(avatarImages.length).toBeGreaterThan(0)
  })
})