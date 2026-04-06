import React from 'react';
import { TextInputProps } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import type { StyledTextProps } from '../text';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'underline' | 'ghost';
export type InputAddon = {
    /** Text label (e.g. "https://", ".com"). */
    text?: string;
    /** Any ReactNode — icon, button, spinner, etc. */
    node?: React.ReactNode;
    /** Background colour for the addon strip. Defaults to gray[100]. */
    bg?: string;
    /** Text / icon colour inside the addon. */
    color?: string;
    /** Called when the addon strip is tapped. */
    onPress?: () => void;
};
type CardComponentProps = TextInputProps & TextStyle;
export interface StyledTextInputProps extends CardComponentProps {
    label?: string;
    labelProps?: StyledTextProps;
    /** Small required asterisk after the label. */
    required?: boolean;
    /** Assistive text rendered below the input. Hidden when error shows. */
    helperText?: string;
    helperProps?: StyledTextProps;
    /** Error message — turns border red + replaces helper text. */
    errorMessage?: string;
    errorProps?: StyledTextProps;
    /** Explicit error flag (shows red border even without errorMessage). */
    error?: boolean;
    /**
     * Show a live character counter (e.g. `12 / 100`).
     * Pair with `maxLength` for the upper bound.
     */
    showCounter?: boolean;
    /** Node rendered inside the input on the left (e.g. search icon). */
    leftIcon?: React.ReactNode;
    /** Node rendered inside the input on the right (e.g. calendar icon). */
    rightIcon?: React.ReactNode;
    /**
     * Addon strip attached to the left edge of the input (outside the border).
     * Good for currency symbols, URL prefixes, country codes.
     */
    leftAddon?: InputAddon;
    /**
     * Addon strip attached to the right edge (outside the border).
     * Good for domain suffixes, units, action buttons.
     */
    rightAddon?: InputAddon;
    /** Show a × clear button when the field has content. @default false */
    clearable?: boolean;
    /** Replace the right icon with a spinner and block input. @default false */
    loading?: boolean;
    /**
     * Visual style variant.
     * - `outline`   — border on all sides (default)
     * - `filled`    — light background, no border
     * - `underline` — bottom border only (like Material Design)
     * - `ghost`     — no border, no background; bare input
     */
    variant?: InputVariant;
    /** Padding / height scale. @default 'md' */
    size?: InputSize;
    /** Explicit border colour. Overrides error/focus colours when set. */
    borderColor?: string;
    /** Focus-highlight colour. @default theme.colors.indigo[500] */
    focusColor?: string;
    /**
     * When true, the `label` animates up and shrinks when the input is
     * focused or has content (Material-style float). Requires `label`.
     */
    floatLabel?: boolean;
    containerStyle?: ViewStyle;
    inputWrapStyle?: ViewStyle;
    inputStyle?: TextStyle;
    fontSize?: number;
    fontWeight?: TextStyle['fontWeight'];
}
export interface StyledTextInputHandle extends StyledTextInputProps {
    focus: () => void;
    blur: () => void;
    clear: () => void;
    isFocused: () => boolean;
}
export declare const StyledTextInput: React.ForwardRefExoticComponent<StyledTextInputProps & React.RefAttributes<any>>;
export { StyledTextInput as StyledInput };
//# sourceMappingURL=index.d.ts.map