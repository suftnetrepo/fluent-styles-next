import React from 'react';
import {
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { styled } from '../utiles/styled';
import { theme } from '../utiles/theme';

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

type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';

type CycleVariants = {
  size?: SizeVariant;
};

type CycleComponentProps = CycleVariants & ViewProps & ViewStyle;

/**
 * Size definitions for cycle component
 * Maps size variants to width/height values
 */
const sizes = {
  sm: {
    width: 32,
    height: 32,
  } as ViewStyle,
  md: {
    width: 48,
    height: 48,
  } as ViewStyle,
  lg: {
    width: 64,
    height: 64,
  } as ViewStyle,
  xl: {
    width: 80,
    height: 80,
  } as ViewStyle,
};

/**
 * Base Cycle component with size variants
 * Circular container with centered content
 * Default size: md (48px)
 */
const CycleBase = styled<CycleComponentProps>(View, {
  base: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    backgroundColor: theme.colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  } as ViewStyle,
  variants: {
    size: {
      sm: sizes.sm,
      md: sizes.md,
      lg: sizes.lg,
      xl: sizes.xl,
    } as any,
  },
});

interface StyledCycleProps extends CycleComponentProps {
  children?: React.ReactNode;
}

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
const StyledCycle = (
  {
    children,
    ref,
    ...rest
  }: StyledCycleProps & { ref?: React.Ref<View> }
) => (
  <CycleBase ref={ref} {...rest}>
    {children}
  </CycleBase>
);

StyledCycle.displayName = 'StyledCycle';

export { StyledCycle, CycleBase };
export type { CycleVariants, CycleComponentProps, StyledCycleProps, SizeVariant };
