import { authService } from '@/modules/authentication/services/authService'
import { LoginCredentials } from '@/modules/authentication/types/auth.types'

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
  isAxiosError: jest.fn(),
}))

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    // Set window.location to localhost to ensure mock behavior
    Object.defineProperty(window, 'location', {
      value: { hostname: 'localhost' },
      writable: true,
    })
  })

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'admin@flexflow.com',
        password: 'admin123',
        rememberMe: false,
      }

      const result = await authService.login(credentials)

      expect(result).toEqual({
        user: expect.objectContaining({
          id: '1',
          email: 'admin@flexflow.com',
          firstName: 'Admin',
          lastName: 'User',
          role: expect.objectContaining({
            name: 'super_admin',
          }),
        }),
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
        permissions: expect.arrayContaining([
          expect.objectContaining({
            resource: '*',
            actions: ['*'],
          }),
        ]),
      })
    })

    it('should throw error for invalid credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'wrong@email.com',
        password: 'wrongpassword',
        rememberMe: false,
      }

      await expect(authService.login(credentials)).rejects.toThrow('Invalid credentials')
    })

    it('should throw error for missing password', async () => {
      const credentials: LoginCredentials = {
        email: 'admin@flexflow.com',
        password: '',
        rememberMe: false,
      }

      await expect(authService.login(credentials)).rejects.toThrow('Invalid credentials')
    })
  })

  describe('verifyToken', () => {
    it('should successfully verify valid token', async () => {
      const result = await authService.verifyToken('mock-access-token')

      expect(result).toEqual({
        user: expect.objectContaining({
          email: 'admin@flexflow.com',
          firstName: 'Admin',
          lastName: 'User',
        }),
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
        permissions: expect.any(Array),
      })
    })

    it('should throw error for invalid token', async () => {
      await expect(authService.verifyToken('invalid-token')).rejects.toThrow('Invalid token')
    })
  })

  describe('refreshToken', () => {
    it('should successfully refresh valid token', async () => {
      const result = await authService.refreshToken('mock-refresh-token')

      expect(result).toEqual({
        user: expect.objectContaining({
          email: 'admin@flexflow.com',
        }),
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
        permissions: expect.any(Array),
      })
    })

    it('should throw error for invalid refresh token', async () => {
      await expect(authService.refreshToken('invalid-refresh-token')).rejects.toThrow('Invalid refresh token')
    })
  })

  describe('environment detection', () => {
    it('should use mock login on localhost', async () => {
      // Already set in beforeEach
      const credentials: LoginCredentials = {
        email: 'admin@flexflow.com',
        password: 'admin123',
        rememberMe: false,
      }

      const result = await authService.login(credentials)
      expect(result.accessToken).toBe('mock-access-token')
    })

    it('should use mock login on 127.0.0.1', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: '127.0.0.1' },
        writable: true,
      })

      const credentials: LoginCredentials = {
        email: 'admin@flexflow.com',
        password: 'admin123',
        rememberMe: false,
      }

      const result = await authService.login(credentials)
      expect(result.accessToken).toBe('mock-access-token')
    })
  })
})