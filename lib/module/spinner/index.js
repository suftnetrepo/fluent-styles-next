"use strict";

import React, { forwardRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { theme } from "../utiles/theme.js";
import { styled } from "../utiles/styled.js";
import { YStack, XStack } from "../stack/index.js";
import { StyledText } from "../text/index.js";
import { StyledButton } from "../button/index.js";

/**
 * Props for Spinner component
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Size configuration for Spinner
 */
const sizeConfig = {
  small: 30,
  medium: 50,
  large: 80
};

/**
 * Variant configuration for Spinner
 */
const variantConfig = {
  default: {
    color: theme.colors.gray[400],
    label: 'default'
  },
  primary: {
    color: theme.colors.blue[500],
    label: 'primary'
  },
  success: {
    color: theme.colors.green[500],
    label: 'success'
  },
  warning: {
    color: theme.colors.amber[500],
    label: 'warning'
  },
  danger: {
    color: theme.colors.red[500],
    label: 'danger'
  }
};

/**
 * Base styled ActivityIndicator
 */
const StyledActivityIndicator = styled(ActivityIndicator, {
  base: {
    color: theme.colors.gray[400]
  }
});

/**
 * Spinner: Professional loading indicator component
 *
 * Features:
 * - Multiple size options (small, medium, large, custom)
 * - 5 color variants (default, primary, success, warning, danger)
 * - Custom color support
 * - Overlay mode for full-screen loading
 * - Optional label text
 * - Theme integration
 * - Accessibility support
 */
const StyledSpinner = /*#__PURE__*/forwardRef(({
  size = 'medium',
  variant = 'primary',
  color,
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  label,
  labelColor,
  labelSize = 14,
  accessibilityLabel = 'Loading',
  ...rest
}, ref) => {
  // Determine size
  const finalSize = typeof size === 'number' ? size : sizeConfig[size];

  // Determine color
  const variantConfig_value = variantConfig[variant];
  const finalColor = color || variantConfig_value.color;
  const spinnerElement = /*#__PURE__*/_jsx(StyledActivityIndicator, {
    ref: ref,
    size: finalSize,
    color: finalColor,
    accessibilityLabel: accessibilityLabel,
    accessible: true,
    ...rest
  });

  // If no overlay, return basic spinner
  if (!overlay) {
    if (!label) {
      return spinnerElement;
    }

    // Spinner with label
    return /*#__PURE__*/_jsxs(YStack, {
      alignItems: "center",
      gap: 12,
      children: [spinnerElement, label && /*#__PURE__*/_jsx(StyledText, {
        fontSize: labelSize,
        color: labelColor || theme.colors.gray[600],
        numberOfLines: 1,
        children: label
      })]
    });
  }

  // Overlay mode
  return /*#__PURE__*/_jsx(YStack, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    children: /*#__PURE__*/_jsxs(YStack, {
      alignItems: "center",
      gap: 12,
      children: [spinnerElement, label && /*#__PURE__*/_jsx(StyledText, {
        fontSize: labelSize,
        color: labelColor || theme.colors.white[500],
        numberOfLines: 1,
        children: label
      })]
    })
  });
});
StyledSpinner.displayName = 'StyledSpinner';

/**
 * Props for SpinnerContainer - Full-screen loading overlay with backdrop
 */

/**
 * SpinnerContainer: Full-screen loading container with backdrop
 *
 * Use for: Page loading, data fetching, async operations
 */
const SpinnerContainer = /*#__PURE__*/forwardRef(({
  isVisible = true,
  size = 'large',
  variant = 'primary',
  color,
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  message,
  labelColor,
  labelSize = 14,
  onBackdropPress,
  ...rest
}, ref) => {
  if (!isVisible) return null;

  // Determine size
  const finalSize = typeof size === 'number' ? size : sizeConfig[size];

  // Determine color
  const variantConfig_value = variantConfig[variant];
  const finalColor = color || variantConfig_value.color;
  const spinnerContent = /*#__PURE__*/_jsxs(YStack, {
    alignItems: "center",
    gap: 20,
    children: [/*#__PURE__*/_jsx(StyledActivityIndicator, {
      ref: ref,
      size: finalSize,
      color: finalColor,
      accessible: true,
      accessibilityLabel: "Loading",
      ...rest
    }), message && /*#__PURE__*/_jsx(StyledText, {
      fontSize: labelSize,
      color: labelColor || theme.colors.white[500],
      numberOfLines: 2,
      textAlign: "center",
      children: message
    })]
  });
  if (!onBackdropPress) {
    return /*#__PURE__*/_jsx(YStack, {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: backdropColor,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      children: spinnerContent
    });
  }
  return /*#__PURE__*/_jsx(StyledButton, {
    link: true,
    onPress: onBackdropPress,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: backdropColor,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    borderRadius: 0,
    borderWidth: 0,
    children: spinnerContent
  });
});
SpinnerContainer.displayName = 'SpinnerContainer';

/**
 * Props for InlineSpinner - Spinner with text in a row
 */

/**
 * InlineSpinner: Spinner with text in flexible direction
 *
 * Use for: Button loading states, inline operations, compact loading indicators
 */
const InlineSpinner = /*#__PURE__*/forwardRef(({
  size = 'small',
  variant = 'primary',
  color,
  text,
  labelColor,
  labelSize = 12,
  direction = 'row',
  gap = 8,
  accessibilityLabel = 'Loading',
  ...rest
}, ref) => {
  // Determine size
  const finalSize = typeof size === 'number' ? size : sizeConfig[size];

  // Determine color
  const variantConfig_value = variantConfig[variant];
  const finalColor = color || variantConfig_value.color;
  const StackComponent = direction === 'row' ? XStack : YStack;
  return /*#__PURE__*/_jsxs(StackComponent, {
    gap: gap,
    alignItems: "center",
    children: [/*#__PURE__*/_jsx(StyledActivityIndicator, {
      ref: ref,
      size: finalSize,
      color: finalColor,
      accessible: true,
      accessibilityLabel: accessibilityLabel,
      ...rest
    }), text && /*#__PURE__*/_jsx(StyledText, {
      fontSize: labelSize,
      color: labelColor || theme.colors.gray[600],
      numberOfLines: 1,
      children: text
    })]
  });
});
InlineSpinner.displayName = 'InlineSpinner';

/**
 * Exports
 */
export { StyledSpinner, SpinnerContainer, InlineSpinner, sizeConfig, variantConfig };
export default StyledSpinner;
//# sourceMappingURL=index.js.map