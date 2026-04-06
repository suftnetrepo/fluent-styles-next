import React from 'react';
import { ActivityIndicatorProps } from 'react-native';
/**
 * Props for Spinner component
 */
interface SpinnerProps extends Omit<ActivityIndicatorProps, 'ref' | 'size'> {
    size?: 'small' | 'medium' | 'large' | number;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    color?: string;
    overlay?: boolean;
    overlayColor?: string;
    label?: string;
    labelColor?: string;
    labelSize?: number;
    accessibilityLabel?: string;
}
/**
 * Size configuration for Spinner
 */
declare const sizeConfig: Record<'small' | 'medium' | 'large', number>;
/**
 * Variant configuration for Spinner
 */
declare const variantConfig: Record<'default' | 'primary' | 'success' | 'warning' | 'danger', {
    color: string;
    label: string;
}>;
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
declare const StyledSpinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<any>>;
/**
 * Props for SpinnerContainer - Full-screen loading overlay with backdrop
 */
interface SpinnerContainerProps extends Omit<SpinnerProps, 'ref' | 'overlay'> {
    isVisible?: boolean;
    backdropColor?: string;
    message?: string;
    onBackdropPress?: () => void;
}
/**
 * SpinnerContainer: Full-screen loading container with backdrop
 *
 * Use for: Page loading, data fetching, async operations
 */
declare const SpinnerContainer: React.ForwardRefExoticComponent<SpinnerContainerProps & React.RefAttributes<any>>;
/**
 * Props for InlineSpinner - Spinner with text in a row
 */
interface InlineSpinnerProps extends Omit<SpinnerProps, 'overlay'> {
    text?: string;
    direction?: 'row' | 'column';
    gap?: number;
}
/**
 * InlineSpinner: Spinner with text in flexible direction
 *
 * Use for: Button loading states, inline operations, compact loading indicators
 */
declare const InlineSpinner: React.ForwardRefExoticComponent<InlineSpinnerProps & React.RefAttributes<any>>;
/**
 * Exports
 */
export { StyledSpinner, SpinnerContainer, InlineSpinner, type SpinnerProps, type SpinnerContainerProps, type InlineSpinnerProps, sizeConfig, variantConfig, };
export default StyledSpinner;
//# sourceMappingURL=index.d.ts.map