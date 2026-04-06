"use strict";

/**
 * Validates if a value is a valid CSS/React Native color
 * Supports hex formats: #RGB, #RRGGBB, #RRGGBBAA
 */
export const isValidColor = value => {
  return /^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(value);
};

/**
 * Validates if a value is a valid number (finite and not NaN)
 */
export const isValidNumber = value => {
  return typeof value === "number" && isFinite(value);
};

/**
 * Validates if a value is a non-empty string
 */
export const isValidString = value => {
  return typeof value === "string" && value.trim().length > 0;
};

// Define the structure for a single rule

// Define the structure for the rules object used in validation

// Define the structure for the values object used in validation

// Define the structure for the errors object in the validation response

/**
 * Validates a value against provided rules.
 * @param value - The value to validate.
 * @param rules - The array of validation rules.
 * @returns The error message if the value is invalid, otherwise undefined.
 */
const validateField = (value, rules, fields = {}) => {
  for (const rule of rules) {
    // Explicit null or undefined check
    if (value === null || value === undefined) {
      return rule.message; // Null/undefined fails required validation
    }

    // Array validation
    if (rule.array && Array.isArray(value) && value.length === 0) {
      return rule.message;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }

    // Custom validation logic
    if (rule.validate) {
      const customMessage = rule.validate(value, fields);
      if (customMessage) {
        return customMessage;
      }
    }
  }
  return undefined; // No errors found
};

/**
 * Validates a set of values against a set of field rules.
 * @param values - The object of field values.
 * @param rules - The object of field rules.
 * @returns An object containing a boolean indicating if there are errors, and an object of errors.
 */
const validate = (values, rules) => {
  const errors = {};
  let hasError = false;
  for (const field in rules) {
    const fieldRules = rules[field];
    const value = values[field] ?? null; // Safely access values[field]
    const error = validateField(value, fieldRules, values); // Pass `values` for cross-field validation

    if (error) {
      hasError = true;
      errors[field] = {
        message: error
      };
    }
  }
  return {
    hasError,
    errors
  };
};
export { validate };
//# sourceMappingURL=validators.js.map