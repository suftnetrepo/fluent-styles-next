import { PressableProps, ViewProps, ViewStyle } from 'react-native';
import React from 'react';
import { StackProps } from '../stack';
import { StyledImageBackgroundProps } from '../image';
declare const shadow: {
    light: ViewStyle;
    lightMedium: ViewStyle;
    medium: ViewStyle;
    mediumDark: ViewStyle;
    dark: ViewStyle;
    veryDark: ViewStyle;
};
type ShadowLevel = keyof typeof shadow;
type CardVariants = {
    shadow?: ShadowLevel;
};
type CardComponentProps = CardVariants & ViewProps & ViewStyle;
interface StyledCardProps extends CardComponentProps {
    children?: React.ReactNode;
    pressable?: boolean;
    pressableProps?: Omit<PressableProps, 'children'>;
}
/**
 * Base Card component with shadow support
 * Flexible layout container with optional shadow variants
 */
declare const CardBase: React.ForwardRefExoticComponent<CardVariants & ViewProps & ViewStyle & React.RefAttributes<any>>;
interface HeaderProps extends StackProps {
    children: React.ReactNode;
}
declare const StyledHeader: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<any>>;
interface ImageProps extends StyledImageBackgroundProps {
    children?: React.ReactNode;
}
declare const StyledImage: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<any>>;
interface ContentProps extends StackProps {
    children: React.ReactNode;
}
declare const StyledContent: React.ForwardRefExoticComponent<ContentProps & React.RefAttributes<any>>;
interface FooterProps extends StackProps {
    children: React.ReactNode;
}
declare const StyledFooter: React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<any>>;
interface Card extends React.ForwardRefExoticComponent<StyledCardProps & React.RefAttributes<React.ComponentRef<typeof CardBase>>> {
    Header: typeof StyledHeader;
    Footer: typeof StyledFooter;
    Image: typeof StyledImage;
    Content: typeof StyledContent;
}
declare const StyledCard: Card;
export { StyledCard, StyledHeader, StyledContent, StyledFooter, shadow };
export type { CardVariants, CardComponentProps, StyledCardProps, ShadowLevel };
//# sourceMappingURL=index.d.ts.map