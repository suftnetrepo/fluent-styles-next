import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ViewStyle } from '../utiles/viewStyleProps';
import { viewStyleStringVariants } from '../utiles/viewStyleVariants';
import { StyledText } from '../text';
type ButtonVariants = {
    /** Solid filled — cyan background. */
    primary?: boolean;
    /** Solid filled — indigo background. */
    secondary?: boolean;
    /** White background, dark border. */
    outline?: boolean;
    /** Transparent, no border, label only. */
    ghost?: boolean;
    /** Transparent, no padding, inline text link. */
    link?: boolean;
    /** Danger / destructive action — red fill. */
    danger?: boolean;
    /** Success action — green fill. */
    success?: boolean;
    /** Warning — amber fill. */
    warning?: boolean;
    /** White card surface, top + side borders, no bottom (for dropdowns). */
    dropdown?: boolean;
    /** Greyed-out, non-interactive. */
    disabled?: boolean;
    /** Fully circular pill (default). */
    pill?: boolean;
    /** Slightly rounded rectangle. */
    rounded?: boolean;
    /** No border radius — sharp corners. */
    square?: boolean;
    xs?: boolean;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    /** Button shrinks to fit its content instead of flex: 1. */
    compact?: boolean;
    /** Full-width block button. */
    block?: boolean;
    /** Icon-only circular button. */
    icon?: boolean;
} & typeof viewStyleStringVariants;
type ButtonProps = {
    variant?: ButtonVariants;
} & TouchableOpacityProps & ViewStyle;
export interface StyledButtonProps extends ButtonProps {
    children?: React.ReactNode;
    primary?: boolean;
    secondary?: boolean;
    outline?: boolean;
    ghost?: boolean;
    link?: boolean;
    danger?: boolean;
    success?: boolean;
    warning?: boolean;
    dropdown?: boolean;
    disabled?: boolean;
    pill?: boolean;
    rounded?: boolean;
    square?: boolean;
    xs?: boolean;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    compact?: boolean;
    block?: boolean;
    icon?: boolean;
    /** Show an activity-indicator spinner and block presses. */
    loading?: boolean;
    /** Icon element rendered before the label. */
    leftIcon?: React.ReactNode;
    /** Icon element rendered after the label. */
    rightIcon?: React.ReactNode;
}
interface RefExoticComponent extends React.ForwardRefExoticComponent<StyledButtonProps & React.RefAttributes<React.ComponentRef<typeof ButtonBase>>> {
    Text: typeof StyledText;
}
declare const ButtonBase: React.ForwardRefExoticComponent<{
    variant?: ButtonVariants | undefined;
} & TouchableOpacityProps & ViewStyle & React.RefAttributes<any>>;
declare const StyledButton: RefExoticComponent;
export { StyledButton };
//# sourceMappingURL=index.d.ts.map