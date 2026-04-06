import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
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
 * Base Cycle component with size variants
 * Circular container with centered content
 * Default size: md (48px)
 */
declare const CycleBase: React.ForwardRefExoticComponent<CycleVariants & ViewProps & ViewStyle & React.RefAttributes<any>>;
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
declare const StyledCycle: React.ForwardRefExoticComponent<StyledCycleProps & React.RefAttributes<View>>;
export { StyledCycle, CycleBase };
export type { CycleVariants, CycleComponentProps, StyledCycleProps, SizeVariant };
//# sourceMappingURL=cycle.d.ts.map