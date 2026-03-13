/**
 * Validates if a value is a valid CSS/React Native color
 * Supports hex formats: #RGB, #RRGGBB, #RRGGBBAA
 */
export const isValidColor = (value: string): boolean => {
  return /^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(value);
};

/**
 * Validates if a value is a valid number (finite and not NaN)
 */
export const isValidNumber = (value: unknown): value is number => {
  return typeof value === "number" && isFinite(value);
};

/**
 * Validates if a value is a non-empty string
 */
export const isValidString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};
