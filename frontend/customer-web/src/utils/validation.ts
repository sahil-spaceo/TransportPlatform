// Validation rules interface
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[a-zA-Z\s'-]{2,}$/,
  username: /^[a-zA-Z0-9_-]{3,}$/,
} as const;

// Common validation rules
export const COMMON_RULES = {
  required: (message = 'This field is required'): ValidationRule => ({
    required: true,
    message,
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    pattern: VALIDATION_PATTERNS.email,
    message,
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    minLength: length,
    message: message || `Must be at least ${length} characters`,
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    maxLength: length,
    message: message || `Must be ${length} characters or less`,
  }),

  password: (message = 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character'): ValidationRule => ({
    pattern: VALIDATION_PATTERNS.strongPassword,
    message,
  }),

  confirmPassword: (originalPassword: string, message = 'Passwords do not match'): ValidationRule => ({
    custom: (value: string) => value === originalPassword,
    message,
  }),

  phone: (message = 'Please enter a valid phone number'): ValidationRule => ({
    pattern: VALIDATION_PATTERNS.phone,
    message,
  }),

  name: (message = 'Please enter a valid name'): ValidationRule => ({
    pattern: VALIDATION_PATTERNS.name,
    message,
  }),
} as const;

// Validation functions
export function validateField(value: string, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    // Required validation
    if (rule.required && (!value || value.trim() === '')) {
      return rule.message;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      continue;
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message;
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      return rule.message;
    }
  }

  return null;
}

export function validateForm(values: { [key: string]: string }, rules: ValidationRules): ValidationResult {
  const errors: { [key: string]: string } = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = values[field] || '';
    const error = validateField(value, fieldRules);
    
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Real-time validation hook
export function useFormValidation(initialValues: { [key: string]: string }, rules: ValidationRules) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [touched, setTouched] = React.useState<{ [key: string]: boolean }>({});

  const validateSingleField = React.useCallback((field: string, value: string) => {
    const fieldRules = rules[field];
    if (!fieldRules) return null;

    return validateField(value, fieldRules);
  }, [rules]);

  const setValue = React.useCallback((field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));

    // Validate on change if field has been touched
    if (touched[field]) {
      const error = validateSingleField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error || '',
      }));
    }
  }, [touched, validateSingleField]);

  const setFieldTouched = React.useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate on blur
    const error = validateSingleField(field, values[field] || '');
    setErrors(prev => ({
      ...prev,
      [field]: error || '',
    }));
  }, [values, validateSingleField]);

  const validateAll = React.useCallback(() => {
    const result = validateForm(values, rules);
    setErrors(result.errors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(rules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    return result;
  }, [values, rules]);

  const reset = React.useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = React.useMemo(() => {
    const touchedFields = Object.keys(touched).filter(field => touched[field]);
    return touchedFields.length > 0 && touchedFields.every(field => !errors[field]);
  }, [errors, touched]);

  return {
    values,
    errors,
    touched,
    isValid,
    setValue,
    setFieldTouched,
    validateAll,
    reset,
  };
}

// Export React import for the hook
import React from 'react';

export default {
  validateField,
  validateForm,
  useFormValidation,
  VALIDATION_PATTERNS,
  COMMON_RULES,
};