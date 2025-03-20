export type AuthResponse = {
  data: {
    message: string;
    user?: any;
  } | null;
  error: {
    message: string;
    code?: string;
  } | null;
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: 'Invalid email or password',
  },
  EMAIL_IN_USE: {
    code: 'EMAIL_IN_USE',
    message: 'This email is already registered',
  },
  WEAK_PASSWORD: {
    code: 'WEAK_PASSWORD',
    message: 'Password is too weak',
  },
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    message: 'Network connection error',
  },
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    message: 'Server error occurred',
  },
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: 'User not found',
  },
} as const;
