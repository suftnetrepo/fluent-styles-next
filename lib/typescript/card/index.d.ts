import { PressableProps, ViewProps, ViewStyle } from 'react-native';
import React from 'react';
import { Stack, StackProps } from '../stack';
import { StyledImageBackground, StyledImageBackgroundProps } from '../image';
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
declare const CardBase: {
    (props: CardVariants & ViewProps & ViewStyle & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
interface HeaderProps extends StackProps {
    children: React.ReactNode;
}
declare const StyledHeader: {
    ({ children, ref, ...rest }: HeaderProps & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
interface ImageProps extends StyledImageBackgroundProps {
    children?: React.ReactNode;
}
declare const StyledImage: {
    ({ children, ref, ...rest }: ImageProps & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
interface ContentProps extends StackProps {
    children: React.ReactNode;
}
declare const StyledContent: {
    ({ children, ref, ...rest }: ContentProps & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
interface FooterProps extends StackProps {
    children: React.ReactNode;
}
declare const StyledFooter: {
    ({ children, ref, ...rest }: FooterProps & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
interface Card {
    (props: StyledCardProps & {
        ref?: React.Ref<React.ComponentRef<typeof CardBase>>;
    }): React.ReactNode;
    Header: typeof StyledHeader;
    Footer: typeof StyledFooter;
    Image: typeof StyledImage;
    Content: typeof StyledContent;
    displayName?: string;
}
declare const StyledCard: Card;
export { StyledCard, StyledHeader, StyledContent, StyledFooter, shadow };
export type { CardVariants, CardComponentProps, StyledCardProps, ShadowLevel };
//# sourceMappingURL=index.d.ts.map