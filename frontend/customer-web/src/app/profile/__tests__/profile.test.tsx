import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockUsers, createMockAuthState } from '@/utils/test-utils'
import ProfilePage from '../page'

// Mock the AuthContext functions
const mockUpdateUser = jest.fn()
const mockChangePassword = jest.fn()

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUsers.basic,
    updateUser: mockUpdateUser,
    changePassword: mockChangePassword,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  }),
}))

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects to login when user is not authenticated', () => {
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(null, false)
    })
    
    // Should not render profile content
    expect(screen.queryByText(/Basic User/)).not.toBeInTheDocument()
  })

  it('renders user profile information', () => {
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('Basic User')).toBeInTheDocument()
    expect(screen.getByText('basic@test.com')).toBeInTheDocument()
    expect(screen.getByText(/Member since/)).toBeInTheDocument()
  })

  it('displays user avatar with initials', () => {
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Should display initials BU (Basic User)
    expect(screen.getByText('BU')).toBeInTheDocument()
  })

  it('handles user with undefined names gracefully', () => {
    const userWithoutNames = { 
      ...mockUsers.basic, 
      firstName: undefined, 
      lastName: undefined 
    }
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(userWithoutNames, true)
    })
    
    expect(screen.getByText('User')).toBeInTheDocument() // Default name
    expect(screen.getByText('UU')).toBeInTheDocument() // Default initials
  })

  it('displays subscription tier badge', () => {
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.silver, true)
    })
    
    expect(screen.getByText('silver')).toBeInTheDocument()
  })

  it('renders profile tabs', () => {
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Account' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Preferences' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Security' })).toBeInTheDocument()
  })

  it('defaults to profile tab', () => {
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Profile tab should be active (you might need to check for active styling)
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('switches to security tab', async () => {
    const user = userEvent.setup()
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const securityTab = screen.getByRole('button', { name: 'Security' })
    await user.click(securityTab)
    
    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm new password/i)).toBeInTheDocument()
  })

  it('displays coming soon for unimplemented tabs', async () => {
    const user = userEvent.setup()
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const accountTab = screen.getByRole('button', { name: 'Account' })
    await user.click(accountTab)
    
    expect(screen.getByText('Coming Soon')).toBeInTheDocument()
    expect(screen.getByText('This section is currently under development.')).toBeInTheDocument()
  })

  it('populates profile form with user data', () => {
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement
    const lastNameInput = screen.getByLabelText(/last name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
    const phoneInput = screen.getByLabelText(/phone number/i) as HTMLInputElement
    
    expect(firstNameInput.value).toBe('Basic')
    expect(lastNameInput.value).toBe('User')
    expect(emailInput.value).toBe('basic@test.com')
    expect(phoneInput.value).toBe('+1234567890')
  })

  it('validates profile form fields', async () => {
    const user = userEvent.setup()
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    const saveButton = screen.getByRole('button', { name: 'Save Changes' })
    
    // Clear required field
    await user.clear(firstNameInput)
    await user.click(saveButton)
    
    // Should show validation error (this depends on your validation implementation)
    expect(mockUpdateUser).not.toHaveBeenCalled()
  })

  it('updates user profile successfully', async () => {
    const user = userEvent.setup()
    mockUpdateUser.mockResolvedValueOnce(undefined)
    
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    const saveButton = screen.getByRole('button', { name: 'Save Changes' })
    
    await user.clear(firstNameInput)
    await user.type(firstNameInput, 'Updated')
    await user.click(saveButton)
    
    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        firstName: 'Updated',
        lastName: 'User',
        email: 'basic@test.com',
        phone: '+1234567890',
      })
    })
    
    await waitFor(() => {
      expect(screen.getByText('Profile updated successfully!')).toBeInTheDocument()
    })
  })

  it('handles profile update failure', async () => {
    const user = userEvent.setup()
    mockUpdateUser.mockRejectedValueOnce(new Error('Update failed'))
    
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const saveButton = screen.getByRole('button', { name: 'Save Changes' })
    await user.click(saveButton)
    
    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled()
    })
    
    // Should handle error gracefully (error is logged, not displayed)
    expect(screen.queryByText('Profile updated successfully!')).not.toBeInTheDocument()
  })

  it('resets profile form', async () => {
    const user = userEvent.setup()
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement
    const resetButton = screen.getByRole('button', { name: 'Reset' })
    
    // Change value
    await user.clear(firstNameInput)
    await user.type(firstNameInput, 'Changed')
    expect(firstNameInput.value).toBe('Changed')
    
    // Reset
    await user.click(resetButton)
    expect(firstNameInput.value).toBe('Basic') // Should reset to original value
  })

  it('changes password successfully', async () => {
    const user = userEvent.setup()
    mockChangePassword.mockResolvedValueOnce(undefined)
    
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Switch to security tab
    const securityTab = screen.getByRole('button', { name: 'Security' })
    await user.click(securityTab)
    
    const currentPasswordInput = screen.getByLabelText(/current password/i)
    const newPasswordInput = screen.getByLabelText(/new password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm new password/i)
    const changePasswordButton = screen.getByRole('button', { name: 'Change Password' })
    
    await user.type(currentPasswordInput, 'currentpass')
    await user.type(newPasswordInput, 'newpassword123')
    await user.type(confirmPasswordInput, 'newpassword123')
    await user.click(changePasswordButton)
    
    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledWith({
        currentPassword: 'currentpass',
        newPassword: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })
    
    await waitFor(() => {
      expect(screen.getByText('Password changed successfully!')).toBeInTheDocument()
    })
  })

  it('handles password change failure', async () => {
    const user = userEvent.setup()
    mockChangePassword.mockRejectedValueOnce(new Error('Password change failed'))
    
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Switch to security tab
    const securityTab = screen.getByRole('button', { name: 'Security' })
    await user.click(securityTab)
    
    const currentPasswordInput = screen.getByLabelText(/current password/i)
    const newPasswordInput = screen.getByLabelText(/new password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm new password/i)
    const changePasswordButton = screen.getByRole('button', { name: 'Change Password' })
    
    await user.type(currentPasswordInput, 'wrongpass')
    await user.type(newPasswordInput, 'newpass123')
    await user.type(confirmPasswordInput, 'newpass123')
    await user.click(changePasswordButton)
    
    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalled()
    })
    
    // Should handle error gracefully
    expect(screen.queryByText('Password changed successfully!')).not.toBeInTheDocument()
  })

  it('clears password form after successful change', async () => {
    const user = userEvent.setup()
    mockChangePassword.mockResolvedValueOnce(undefined)
    
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Switch to security tab
    const securityTab = screen.getByRole('button', { name: 'Security' })
    await user.click(securityTab)
    
    const currentPasswordInput = screen.getByLabelText(/current password/i) as HTMLInputElement
    const newPasswordInput = screen.getByLabelText(/new password/i) as HTMLInputElement
    const confirmPasswordInput = screen.getByLabelText(/confirm new password/i) as HTMLInputElement
    const changePasswordButton = screen.getByRole('button', { name: 'Change Password' })
    
    await user.type(currentPasswordInput, 'currentpass')
    await user.type(newPasswordInput, 'newpass123')
    await user.type(confirmPasswordInput, 'newpass123')
    await user.click(changePasswordButton)
    
    await waitFor(() => {
      expect(screen.getByText('Password changed successfully!')).toBeInTheDocument()
    })
    
    // Form should be cleared
    expect(currentPasswordInput.value).toBe('')
    expect(newPasswordInput.value).toBe('')
    expect(confirmPasswordInput.value).toBe('')
  })

  it('cancels password change', async () => {
    const user = userEvent.setup()
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Switch to security tab
    const securityTab = screen.getByRole('button', { name: 'Security' })
    await user.click(securityTab)
    
    const currentPasswordInput = screen.getByLabelText(/current password/i) as HTMLInputElement
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    
    await user.type(currentPasswordInput, 'sometext')
    expect(currentPasswordInput.value).toBe('sometext')
    
    await user.click(cancelButton)
    expect(currentPasswordInput.value).toBe('') // Should be cleared
  })

  it('formats join date correctly', () => {
    render(<ProfilePage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Should format the date from mockUsers.basic.createdAt
    expect(screen.getByText(/Member since January 1, 2024/)).toBeInTheDocument()
  })

  it('returns null when no user is provided', () => {
    const { container } = render(<ProfilePage />, {
      initialAuthState: createMockAuthState(null, true)
    })
    
    // Should render empty (protected route will handle redirect)
    expect(container.firstChild).toBeNull()
  })
})