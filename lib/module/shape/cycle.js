"use strict";

import React from 'react';
import { View } from 'react-native';
import { styled } from "../utiles/styled.js";
import { theme } from "../utiles/theme.js";

/**
 * Cycle component - Circular container with size variants
 * 
 * A specialized layout component that creates circular containers
 * with predefined size variants. Uses borderRadius: 50% to create perfect circles.
 * 
 * Size variants (width & height):
 * - sm: 32px (small circles, icons)
 * - md: 48px (medium circles, avatars)
 * - lg: 64px (large circles, featured items)
 * - xl: 80px (extra large circles, hero sections)
 */
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Size definitions for cycle component
 * Maps size variants to width/height values
 */
const sizes = {
  sm: {
    width: 32,
    height: 32
  },
  md: {
    width: 48,
    height: 48
  },
  lg: {
    width: 64,
    height: 64
  },
  xl: {
    width: 80,
    height: 80
  }
};

/**
 * Base Cycle component with size variants
 * Circular container with centered content
 * Default size: md (48px)
 */
const CycleBase = styled(View, {
  base: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    backgroundColor: theme.colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48
  },
  variants: {
    size: {
      sm: sizes.sm,
      md: sizes.md,
      lg: sizes.lg,
      xl: sizes.xl
    }
  }
});
/**
 * Wrapper component for Cycle with size variants
 * 
 * @example
 * // Small cycle with icon
 * <StyledCycle size="sm">
 *   <Icon name="star" />
 * </StyledCycle>
 * 
 * @example
 * // Medium cycle (default) with avatar
 * <StyledCycle>
 *   <Avatar uri={image} />
 * </StyledCycle>
 * 
 * @example
 * // Large cycle with custom styling
 * <StyledCycle 
 *   size="lg" 
 *   backgroundColor={theme.colors.primary[500]}
 *   borderColor={theme.colors.primary[600]}
 * >
 *   <Text fontSize={20} fontWeight="bold">C</Text>
 * </StyledCycle>
 * 
 * @example
 * // Extra large cycle with gradient background
 * <StyledCycle size="xl">
 *   <LinearGradient colors={['#FF6B6B', '#FFD93D']}>
 *     <Text color="white">Logo</Text>
 *   </LinearGradient>
 * </StyledCycle>
 */
const StyledCycle = /*#__PURE__*/React.forwardRef(({
  children,
  ...rest
}, ref) => /*#__PURE__*/_jsx(CycleBase, {
  ref: ref,
  ...rest,
  children: children
}));
StyledCycle.displayName = 'StyledCycle';
export { StyledCycle, CycleBase };
//# sourceMappingURL=cycle.js.map