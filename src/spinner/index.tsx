import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';
import { theme } from '../utiles/theme';
import { styled } from '../utiles/styled';
import { YStack, XStack } from '../stack';
import { StyledText } from '../text';
import { StyledButton } from '../button';

/**
 * Props for Spinner component
 */
interface SpinnerProps extends Omit<ActivityIndicatorProps, 'ref' | 'size'> {
  // Sizing
  size?: 'small' | 'medium' | 'large' | number;

  // Color variants
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';

  // Custom color
  color?: string;

  // Overlay mode
  overlay?: boolean;
  overlayColor?: string;

  // Label support
  label?: string;
  labelColor?: string;
  labelSize?: number;

  // Accessibility
  accessibilityLabel?: string;
}

/**
 * Size configuration for Spinner
 */
const sizeConfig: Record<'small' | 'medium' | 'large', number> = {
  small: 30,
  medium: 50,
  large: 80,
};

/**
 * Variant configuration for Spinner
 */
const variantConfig: Record<
  'default' | 'primary' | 'success' | 'warning' | 'danger',
  { color: string; label: string }
> = {
  default: {
    color: theme.colors.gray[400],
    label: 'default',
  },
  primary: {
    color: theme.colors.blue[500],
    label: 'primary',
  },
  success: {
    color: theme.colors.green[500],
    label: 'success',
  },
  warning: {
    color: theme.colors.amber[500],
    label: 'warning',
  },
  danger: {
    color: theme.colors.red[500],
    label: 'danger',
  },
};

/**
 * Base styled ActivityIndicator
 */
const StyledActivityIndicator = styled<any>(ActivityIndicator, {
  base: {
    color: theme.colors.gray[400],
  } as any,
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
const StyledSpinner = (
  {
    size = 'medium',
    variant = 'primary',
    color,
    overlay = false,
    overlayColor = 'rgba(0, 0, 0, 0.3)',
    label,
    labelColor,
    labelSize = 14,
    accessibilityLabel = 'Loading',
    ref,
    ...rest
  }: SpinnerProps & { ref?: React.Ref<any> }
) => {
    // Determine size
    const finalSize = typeof size === 'number' ? size : sizeConfig[size];

    // Determine color
    const variantConfig_value = variantConfig[variant];
    const finalColor = color || variantConfig_value.color;

    const spinnerElement = (
      <StyledActivityIndicator
        ref={ref}
        size={finalSize}
        color={finalColor}
        accessibilityLabel={accessibilityLabel}
        accessible={true}
        {...rest}
      />
    );

    // If no overlay, return basic spinner
    if (!overlay) {
      if (!label) {
        return spinnerElement;
      }

      // Spinner with label
      return (
        <YStack alignItems="center" gap={12}>
          {spinnerElement}
          {label && (
            <StyledText
              fontSize={labelSize}
              color={labelColor || theme.colors.gray[600]}
              numberOfLines={1}
            >
              {label}
            </StyledText>
          )}
        </YStack>
      );
    }

    // Overlay mode
    return (
      <YStack
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor={overlayColor}
        justifyContent="center"
        alignItems="center"
        zIndex={9999}
      >
        <YStack alignItems="center" gap={12}>
          {spinnerElement}
          {label && (
            <StyledText
              fontSize={labelSize}
              color={labelColor || theme.colors.white[500]}
              numberOfLines={1}
            >
              {label}
            </StyledText>
          )}
        </YStack>
      </YStack>
    );
};

StyledSpinner.displayName = 'StyledSpinner';

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
const SpinnerContainer = (
  {
    isVisible = true,
    size = 'large',
    variant = 'primary',
    color,
    backdropColor = 'rgba(0, 0, 0, 0.5)',
    message,
    labelColor,
    labelSize = 14,
    onBackdropPress,
    ref,
    ...rest
  }: SpinnerContainerProps & { ref?: React.Ref<any> }
) => {
    if (!isVisible) return null;

    // Determine size
    const finalSize = typeof size === 'number' ? size : sizeConfig[size];

    // Determine color
    const variantConfig_value = variantConfig[variant];
    const finalColor = color || variantConfig_value.color;

    const spinnerContent = (
      <YStack alignItems="center" gap={20}>
        <StyledActivityIndicator
          ref={ref}
          size={finalSize}
          color={finalColor}
          accessible={true}
          accessibilityLabel="Loading"
          {...rest}
        />
        {message && (
          <StyledText
            fontSize={labelSize}
            color={labelColor || theme.colors.white[500]}
            numberOfLines={2}
            textAlign="center"
          >
            {message}
          </StyledText>
        )}
      </YStack>
    );

    if (!onBackdropPress) {
      return (
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor={backdropColor}
          justifyContent="center"
          alignItems="center"
          zIndex={9999}
        >
          {spinnerContent}
        </YStack>
      );
    }

    return (
      <StyledButton
        link={true}
        onPress={onBackdropPress}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor={backdropColor}
        justifyContent="center"
        alignItems="center"
        zIndex={9999}
        borderRadius={0}
        borderWidth={0}
      >
        {spinnerContent}
      </StyledButton>
    );
};

SpinnerContainer.displayName = 'SpinnerContainer';

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
const InlineSpinner = (
  {
    size = 'small',
    variant = 'primary',
    color,
    text,
    labelColor,
    labelSize = 12,
    direction = 'row',
    gap = 8,
    accessibilityLabel = 'Loading',
    ref,
    ...rest
  }: InlineSpinnerProps & { ref?: React.Ref<any> }
) => {
    // Determine size
    const finalSize = typeof size === 'number' ? size : sizeConfig[size];

    // Determine color
    const variantConfig_value = variantConfig[variant];
    const finalColor = color || variantConfig_value.color;

    const StackComponent = direction === 'row' ? XStack : YStack;

    return (
      <StackComponent gap={gap} alignItems="center">
        <StyledActivityIndicator
          ref={ref}
          size={finalSize}
          color={finalColor}
          accessible={true}
          accessibilityLabel={accessibilityLabel}
          {...rest}
        />
        {text && (
          <StyledText
            fontSize={labelSize}
            color={labelColor || theme.colors.gray[600]}
            numberOfLines={1}
          >
            {text}
          </StyledText>
        )}
      </StackComponent>
    );
};

InlineSpinner.displayName = 'InlineSpinner';

/**
 * Exports
 */
export {
  StyledSpinner ,
  SpinnerContainer,
  InlineSpinner,
  type SpinnerProps,
  type SpinnerContainerProps,
  type InlineSpinnerProps,
  sizeConfig,
  variantConfig,
};
export default StyledSpinner;
